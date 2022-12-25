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
    `${chalk.magenta("哞!")} ${chalk.green("音樂系統")}發生了${chalk.red(
      "錯誤"
    )}!\n${err}`
  )
})

const players = {}
const queues = {}
const connections = {}

client.on("ready", () => {
  console.log(
    `${chalk.magenta("哞!")} ${chalk.green("音樂系統")}已用 @${
      client.user.tag
    } 的身份登入!`
  )
  play.setToken({ soundcloud: { client_id: process.env.SoundCloudClientID } })
})

client.on("interactionCreate", async (slash) => {
  if (!slash.isCommand()) return
  if (slash.commandName != "moo") return
  const sub = slash.options.getSubcommand()
  if (sub == "play") {
    if (!slash.member.voice?.channel)
      return slash.reply("❌ 哞!請先加入一個語音頻道!")
    if (!queues[slash.guild.id]) queues[slash.guild.id] = []
    if (queues[slash.guild.id][0]) {
      const searched = await play.search(
        slash.options.get("query", false).value,
        { source: { soundcloud: "tracks" } }
      )
      queues[slash.guild.id][queues[slash.guild.id].length] = slash.options
        .get("query", false)
        .value.startsWith("http")
        ? {
            name: slash.options.get("query", false).value,
            url: slash.options.get("query", false).value,
          }
        : { name: searched[0].name, url: searched[0].url }
      return slash.reply(
        `✅ 哞!已將 \`${
          slash.options.get("query", false).value.startsWith("http")
            ? slash.options.get("query", false).value
            : searched[0].name
        }\` 加到待播清單!`
      )
    }
    slash.deferReply()
    const connection = joinVoiceChannel({
      channelId: slash.member.voice.channel.id,
      guildId: slash.guild.id,
      adapterCreator: slash.guild.voiceAdapterCreator,
    })
    connections[slash.guild.id] = connection

    let args = slash.options.get("query", false).value
    queues[slash.guild.id][0] = args
    const searched = await play.search(args, {
      source: { soundcloud: "tracks" },
    })
    let so_info = await play.soundcloud(
      args.startsWith("http") ? args : searched[0].url
    )
    let stream = await play.stream_from_info(so_info, { quality: 2 })

    let resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    })

    let player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    })
    player.play(resource)

    connection.subscribe(player)
    players[slash.guild.id] = player
    slash.editReply(
      `▶️ 哞!正在播放: \`${
        args.startsWith("http") ? args : searched[0].name
      }\`\n<:stage:981552077098602517> 如果你在舞台頻道內播放音樂,請管理員邀請我成為發言者!`
    )
    const EventChangeHandler = async (oldOne, newOne) => {
      if (newOne.status == "idle") {
        queues[slash.guild.id].splice(0, 1)
        if (queues[slash.guild.id][0]) {
          slash.channel.send(
            `✅ 哞!已播放完畢\n⏯️ 下一首: \`${queues[slash.guild.id][0].name}\``
          )
        } else {
          slash.channel.send(`✅ 哞!已播放完畢\n⏸️ 待播清單是空的!`)
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
    slash.reply("⏯️ 哞!已跳過!")
  }
  if (sub == "pause") {
    players[slash.guild.id].pause()
    slash.reply("⏸️ 哞!已暫停!")
  }
  if (sub == "resume") {
    players[slash.guild.id].unpause()
    slash.reply("▶️ 哞!已恢復播放!")
  }
  if (sub == "queue") {
    const renderPl = []
    queues[slash.guild.id].forEach((content, index) => {
      renderPl[index] = `${index + 1}. \`${content.replaceAll("`", "\\`")}\``
    })
    slash.reply(renderPl.join("\n") || "❌ 哞!待播清單是空的!")
  }
  if (sub == "clear") {
    queues[slash.guild.id] = []
    slash.reply("✅ 哞!已將待播清單清空!")
  }
  if (sub == "join") {
    const connection = joinVoiceChannel({
      channelId: slash.member.voice.channel.id,
      guildId: slash.guild.id,
      adapterCreator: slash.guild.voiceAdapterCreator,
    })
    connections[slash.guild.id] = connection
    slash.reply("✅ 哞!已加入語音頻道!")
  }
  if (sub == "leave") {
    connections[slash.guild.id].disconnect()
    connections[slash.guild.id] = null
    slash.reply("✅ 哞!已離開語音頻道!")
  }
})
