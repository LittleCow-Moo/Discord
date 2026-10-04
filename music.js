require("dotenv").config()
const { spawn } = require("node:child_process")
const Discord = require("discord.js")
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  NoSubscriberBehavior,
  getVoiceConnection,
  StreamType,
  VoiceConnectionStatus,
  entersState,
} = require("@discordjs/voice")
const chalk = require("chalk")

const client = new Discord.Client({
  intents: ["Guilds", "GuildVoiceStates"],
})

const YT_DLP_BIN =
  process.env.YT_DLP_BIN ||
  process.env.YTDLP_BIN ||
  (process.platform === "linux"
    ? "/var/lib/pufferpanel/.local/bin/yt-dlp"
    : "yt-dlp")

client.login(process.env.Token)

process.on("uncaughtException", (e) => {
  if (process.env.DebugMode == "true") throw e
  console.log(
    `${chalk.magenta("哞！")} ${chalk.green("音樂系統")}發生了${chalk.red(
      "錯誤"
    )}！\n${e}`
  )
})

const players = {}
const queues = {}
const activeDownloads = {}
const activeTranscoders = {}
const debugConnections = new WeakSet()
let ytDlpReady = false

const isHttpUrl = (value) => /^https?:\/\//i.test(value.trim())

const runYtDlp = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn(YT_DLP_BIN, args, {
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    })
    let stdout = ""
    let stderr = ""

    if (child.stdout) {
      child.stdout.setEncoding("utf8")
      child.stdout.on("data", (chunk) => {
        stdout += chunk
      })
    }

    if (child.stderr) {
      child.stderr.setEncoding("utf8")
      child.stderr.on("data", (chunk) => {
        stderr += chunk
      })
    }

    child.on("error", reject)
    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout.trim())
        return
      }

      reject(new Error(stderr.trim() || `yt-dlp exited with code ${code}`))
    })
  })

const ensureYtDlp = async () => {
  if (ytDlpReady) return

  await runYtDlp(["--version"])
  ytDlpReady = true
}

const parseTrackInfo = (raw) => {
  const parsed = JSON.parse(raw)
  const entry = parsed.entries?.[0] ?? parsed

  if (!entry) {
    throw new Error("找不到歌曲")
  }

  const url =
    entry.webpage_url ||
    entry.original_url ||
    (entry.id ? `https://www.youtube.com/watch?v=${entry.id}` : null)

  if (!url) {
    throw new Error("找不到可播放的影片連結")
  }

  return {
    name: entry.title || entry.fulltitle || entry.id || "未知歌曲",
    url,
  }
}

client.on("ready", async () => {
  console.log(
    `${chalk.magenta("哞！")} ${chalk.green("音樂系統")}已用 @${
      client.user.tag
    } 的身份登入！`
  )

  try {
    await ensureYtDlp()
  } catch (error) {
    console.error(`yt-dlp 不可用： ${error}`)
  }
})

const searchSong = async (query) => {
  try {
    await ensureYtDlp()

    const target = isHttpUrl(query) ? query : `ytsearch1:${query}`
    const result = await runYtDlp([
      "--dump-single-json",
      "--flat-playlist",
      "--skip-download",
      "--no-warnings",
      target,
    ])

    return parseTrackInfo(result)
  } catch (error) {
    console.error(`搜尋歌曲時發生錯誤：${error}`)
    throw error
  }
}

const addToQueue = (guildId, song) => {
  if (!queues[guildId]) queues[guildId] = []
  queues[guildId].push(song)
}

const stopActiveDownload = (guildId) => {
  if (!activeDownloads[guildId]) return

  activeDownloads[guildId].kill("SIGKILL")
  activeDownloads[guildId] = null

  if (activeTranscoders[guildId]) {
    activeTranscoders[guildId].kill("SIGKILL")
    activeTranscoders[guildId] = null
  }
}

const playSong = async (guildId, song) => {
  const connection = getVoiceConnection(guildId)

  if (!connection) {
    throw new Error("找不到語音連線")
  }

  if (!debugConnections.has(connection)) {
    debugConnections.add(connection)
    connection.on("debug", (message) => {
      console.debug(`[voice] ${message}`)
    })
    connection.on("error", (error) => {
      console.error(`Discord voice 錯誤： ${error}`)
    })
    connection.on("transitioned", (transitionId) => {
      console.log(`DAVE transition 完成：${transitionId}`)
    })
  }

  await entersState(connection, VoiceConnectionStatus.Ready, 15_000)

  const searched = await searchSong(song)
  const download = spawn(
    YT_DLP_BIN,
    [
      "-f",
      "bestaudio/best",
      "--no-playlist",
      "--no-warnings",
      "--quiet",
      "-o",
      "-",
      searched.url,
    ],
    {
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    }
  )

  activeDownloads[guildId] = download

  const transcoder = spawn("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    "pipe:0",
    "-vn",
    "-acodec",
    "pcm_s16le",
    "-f",
    "s16le",
    "-ar",
    "48000",
    "-ac",
    "2",
    "pipe:1",
  ])

  activeTranscoders[guildId] = transcoder

  download.stdout.pipe(transcoder.stdin)

  let pcmBytes = 0
  let pcmPeak = 0
  let pcmSumSquares = 0
  let pcmSampleCount = 0
  transcoder.stdout.on("data", (chunk) => {
    pcmBytes += chunk.length

    for (let offset = 0; offset + 1 < chunk.length; offset += 2) {
      const sample = chunk.readInt16LE(offset)
      const absoluteSample = Math.abs(sample)
      pcmPeak = Math.max(pcmPeak, absoluteSample)
      pcmSumSquares += sample * sample
      pcmSampleCount++
    }
  })

  download.stderr.on("data", (chunk) => {
    const message = chunk.toString().trim()
    if (message) {
      console.error(`yt-dlp 下載時發生錯誤： ${message}`)
    }
  })

  download.on("close", (code) => {
    if (code === 0) return

    if (!transcoder.killed) transcoder.kill("SIGKILL")
  })

  transcoder.stderr.on("data", (chunk) => {
    const message = chunk.toString().trim()
    if (message) {
      console.error(`ffmpeg 轉碼時發生錯誤： ${message}`)
    }
  })

  transcoder.on("error", (error) => {
    console.error(`ffmpeg 啟動失敗： ${error}`)
  })

  transcoder.on("close", (code) => {
    const pcmRms = pcmSampleCount
      ? Math.sqrt(pcmSumSquares / pcmSampleCount).toFixed(0)
      : "0"
    console.log(
      `ffmpeg 已結束，code=${code}，PCM bytes=${pcmBytes}，peak=${pcmPeak}，rms=${pcmRms}`
    )
  })

  download.on("error", (error) => {
    console.error(`yt-dlp 啟動失敗： ${error}`)
  })

  const resource = createAudioResource(transcoder.stdout, {
    inputType: StreamType.Raw,
  })

  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Play,
    },
  })

  players[guildId] = player
  connection.subscribe(player)

  player.on("stateChange", async (_, newState) => {
    console.log(`AudioPlayer 狀態：${newState.status}`)

    if (newState.status === "playing") {
      setTimeout(() => {
        const networking = connection.state.networking
        const packetsPlayed = networking?.state.connectionData?.packetsPlayed
        const pcmRms = pcmSampleCount
          ? Math.sqrt(pcmSumSquares / pcmSampleCount).toFixed(0)
          : "0"
        console.log(`Voice packets played：${packetsPlayed ?? "unknown"}`)
        console.log(`PCM audio：bytes=${pcmBytes}，peak=${pcmPeak}，rms=${pcmRms}`)
      }, 1_000)
    }

    if (newState.status !== "idle") return

    stopActiveDownload(guildId)

    if (!queues[guildId]) queues[guildId] = []
    queues[guildId].shift()

    if (queues[guildId][0]) {
      console.log(`✅ 哞！已播放完畢\n⏯️ 下一首： \`${queues[guildId][0]}\``)

      try {
        await playSong(guildId, queues[guildId][0])
      } catch (error) {
        console.error(`播放下一首歌曲時發生錯誤： ${error}`)
      }
      return
    }

    console.log("✅ 哞！已播放完畢\n⏸️ 待播清單是空的！")
    players[guildId] = null
  })

  player.on("error", (error) => {
    console.error(`播放歌曲時發生錯誤： ${error.stack || error}`)
  })

  console.log(`VoiceConnection 狀態：${connection.state.status}`)
  console.log(`Voice ping：${JSON.stringify(connection.ping)}`)
  console.log(`Voice privacy code：${connection.voicePrivacyCode || "none"}`)
  player.play(resource)

  return searched.name
}

client.on("interactionCreate", async (slash) => {
  if (!slash.isCommand()) return
  if (slash.commandName !== "moo") return

  const sub = slash.options.getSubcommand()

  if (sub === "play") {
    if (!slash.member.voice?.channel)
      return slash.reply("❌ 哞！請先加入一個語音頻道！")

    const query = slash.options.get("query", false).value

    try {
      addToQueue(slash.guild.id, query)
    } catch (error) {
      console.error(`加入歌曲時發生錯誤： ${error}`)
      await slash.reply("❌ 哞！加入歌曲時發生錯誤！")
      return
    }

    if (players[slash.guild.id]) {
      await slash.reply(`✅ 哞！已將 \`${query}\` 加到待播清單！`)
      return
    }

    await slash.deferReply()

    await slash.editReply(`✅ 哞！已將 \`${query}\` 加到待播清單！`)

    joinVoiceChannel({
      channelId: slash.member.voice.channel.id,
      guildId: slash.guild.id,
      adapterCreator: slash.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
      daveEncryption: true,
      debug: true,
    })

    try {
      const song = queues[slash.guild.id][0]
      const songName = await playSong(slash.guild.id, song)

      await slash.editReply(
        `▶️ 哞！正在播放： \`${songName}\`\n<:stage_g:1556149073705308220> 如果你在舞台頻道內播放音樂，請管理員邀請我成為發言者！`
      )
    } catch (error) {
      console.error(`播放歌曲時發生錯誤： ${error}`)
      await slash.editReply("❌ 哞！播放歌曲時發生錯誤！")
    }

    return
  }

  if (sub == "skip") {
    if (!players[slash.guild.id]) return slash.reply("❌ 哞！目前沒有正在播放的歌曲！")

    players[slash.guild.id].stop()
    slash.reply("⏯️ 哞！已跳過！")
  }

  if (sub == "pause") {
    if (!players[slash.guild.id]) return slash.reply("❌ 哞！目前沒有正在播放的歌曲！")

    players[slash.guild.id].pause()
    slash.reply("⏸️ 哞！已暫停！")
  }

  if (sub == "resume") {
    if (!players[slash.guild.id]) return slash.reply("❌ 哞！目前沒有正在播放的歌曲！")

    players[slash.guild.id].unpause()
    slash.reply("▶️ 哞！已恢復播放！")
  }

  if (sub == "queue") {
    const renderPl = []
    const guildQueue = queues[slash.guild.id] || []

    guildQueue.forEach((content, index) => {
      renderPl[index] = `${index + 1}. \`${content.replaceAll("`", "\\`")}\``
    })

    slash.reply(renderPl.join("\n") || "❌ 哞！待播清單是空的！")
  }

  if (sub == "clear") {
    queues[slash.guild.id] = []
    slash.reply("✅ 哞！已將待播清單清空！")
  }

  if (sub == "join") {
    joinVoiceChannel({
      channelId: slash.member.voice.channel.id,
      guildId: slash.guild.id,
      adapterCreator: slash.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
      daveEncryption: true,
      debug: true,
    })
    slash.reply("✅ 哞！已加入語音頻道！")
  }

  if (sub == "leave") {
    queues[slash.guild.id] = []
    stopActiveDownload(slash.guild.id)

    if (players[slash.guild.id]) {
      players[slash.guild.id].stop()
      players[slash.guild.id] = null
    }

    const connection = getVoiceConnection(slash.guild.id)
    if (connection) {
      connection.destroy?.()
      connection.disconnect?.()
    }

    slash.reply("✅ 哞！已離開語音頻道！")
  }
})
