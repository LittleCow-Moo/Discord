require("dotenv").config()
const Discord = require("discord.js")
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  NoSubscriberBehavior,
} = require("@discordjs/voice")
const play = require("play-dl")
const chalk = require("chalk")
const client = new Discord.Client({
  intents: ["Guilds", "GuildVoiceStates"],
})
client.login(process.env.Token)
process.on("uncaughtException", (err) => {
  console.log(
    `${chalk.magenta("哞！")} ${chalk.green("音樂系統")}發生了${chalk.red(
      "錯誤"
    )}！\n${err}`
  )
})

const players = {}
const queues = {}
const connections = {}

client.on("ready", () => {
  console.log(
    `${chalk.magenta("哞！")} ${chalk.green("音樂系統")}已用 @${
      client.user.tag
    } 的身份登入！`
  )
  play.setToken({ soundcloud: { client_id: process.env.SoundCloudClientID } })
})

const searchSong = async (query) => {
  try {
    const results = await play.search(query, { limit: 1 })
    return results[0]
  } catch (error) {
    console.error(`搜尋歌曲時發生錯誤：${error}`)
    throw error
  }
}

const addToQueue = async (guildId, song) => {
  if (!queues[guildId]) queues[guildId] = []
  queues[guildId].push(song)
}

const playSong = async (guildId, song) => {
  const connection = connections[guildId]
  const searched = await searchSong(song)

  let stream
  let resource
  try {
    const info = await play.stream(searched.url)
    stream = info.stream
    resource = createAudioResource(stream, { inputType: info.type })
  } catch (error) {
    console.error(`播放歌曲時發生錯誤： ${error}`)
    throw error
  }

  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Play,
    },
  })
  player.play(resource)

  connection.subscribe(player)
  players[guildId] = player

  const eventChangeHandler = async (oldState, newState) => {
    if (newState.status === "idle") {
      queues[guildId].shift()
      if (queues[guildId][0]) {
        console.log(`✅ 哞！已播放完畢\n⏯️ 下一首： \`${queues[guildId][0]}\``)
      } else {
        console.log("✅ 哞！已播放完畢\n⏸️ 待播清單是空的！")
      }
      if (!queues[guildId][0]) return

      try {
        const nextSong = await searchSong(queues[guildId][0])
        const nextInfo = await play.stream(nextSong.url)
        const nextStream = nextInfo.stream
        const nextResource = createAudioResource(nextStream, {
          inputType: nextInfo.type,
        })

        const nextPlayer = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Play,
          },
        })
        nextPlayer.play(nextResource)
        players[guildId] = nextPlayer
        connections[guildId].subscribe(nextPlayer)
        nextPlayer.addListener("stateChange", eventChangeHandler)
      } catch (error) {
        console.error(`播放下一首歌曲時發生錯誤： ${error}`)
        throw error
      }
    }
  }

  player.addListener("stateChange", eventChangeHandler)
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
      await addToQueue(slash.guild.id, query)
      slash.reply(`✅ 哞！已將 \`${query}\` 加到待播清單！`)
    } catch (error) {
      console.error(`加入歌曲時發生錯誤： ${error}`)
      slash.reply("❌ 哞！加入歌曲時發生錯誤！")
    }

    if (!players[slash.guild.id]) {
      slash.deferReply()

      const connection = joinVoiceChannel({
        channelId: slash.member.voice.channel.id,
        guildId: slash.guild.id,
        adapterCreator: slash.guild.voiceAdapterCreator,
      })
      connections[slash.guild.id] = connection

      try {
        const song = queues[slash.guild.id][0]
        await playSong(slash.guild.id, song)

        slash.editReply(
          `▶️ 哞！正在播放： \`${song}\`\n<:stage_g:986711131475292240> 如果你在舞台頻道內播放音樂，請管理員邀請我成為發言者！`
        )
      } catch (error) {
        console.error(`播放歌曲時發生錯誤： ${error}`)
        slash.editReply("❌ 哞！播放歌曲時發生錯誤！")
      }
    }
    const EventChangeHandler = async (oldOne, newOne) => {
      if (newOne.status == "idle") {
        queues[slash.guild.id].splice(0, 1)
        if (queues[slash.guild.id][0]) {
          slash.channel.send(
            `✅ 哞！已播放完畢\n⏯️ 下一首： \`${queues[slash.guild.id][0].name}\``
          )
        } else {
          slash.channel.send(`✅ 哞！已播放完畢\n⏸️ 待播清單是空的！`)
        }
        if (!queues[slash.guild.id][0]) return
        let stream
        let so_info
        so_info = await play.soundcloud(
            queues[slash.guild.id][0].url
        )
        stream = await play.stream_from_info(so_info, { quality: 2 })

        let resource = createAudioResource(stream.stream, {
          inputType: stream.type,
        })

        let player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Play,
          },
        })
        player.play(resource)
        players[slash.guild.id] = player
        connections[slash.guild.id].subscribe(player)
        players[slash.guild.id].addListener("stateChange", EventChangeHandler)
      }
    }
    players[slash.guild.id].addListener("stateChange", EventChangeHandler)
  }
  if (sub == "skip") {
    players[slash.guild.id].stop()
    slash.reply("⏯️ 哞！已跳過！")
  }
  if (sub == "pause") {
    players[slash.guild.id].pause()
    slash.reply("⏸️ 哞！已暫停！")
  }
  if (sub == "resume") {
    players[slash.guild.id].unpause()
    slash.reply("▶️ 哞！已恢復播放！")
  }
  if (sub == "queue") {
    const renderPl = []
    queues[slash.guild.id].forEach((content, index) => {
      renderPl[index] = `${index + 1}. \`${content.replaceAll("`", "\\`")}\``
    })
    slash.reply(renderPl.join("\n") || "❌ 哞！待播清單是空的！")
  }
  if (sub == "clear") {
    queues[slash.guild.id] = []
    slash.reply("✅ 哞！已將待播清單清空！")
  }
  if (sub == "join") {
    const connection = joinVoiceChannel({
      channelId: slash.member.voice.channel.id,
      guildId: slash.guild.id,
      adapterCreator: slash.guild.voiceAdapterCreator,
    })
    connections[slash.guild.id] = connection
    slash.reply("✅ 哞！已加入語音頻道！")
  }
  if (sub == "leave") {
    connections[slash.guild.id].disconnect()
    connections[slash.guild.id] = null
    slash.reply("✅ 哞！已離開語音頻道！")
  }
})
