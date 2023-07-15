//#region 初始化
require("dotenv").config()
if (process.env.EggactylCompatibleMode) {
  process.stdout.write("\x1Bc")
  const myRL = require("serverline")
  myRL.init()
  myRL.setCompletion(["stop"])
  myRL.setPrompt("​")
  console.clear()
  myRL.on("line", function (line) {
    switch (line) {
      case "stop":
        process.exit()
        break
    }
  })
}
const Discord = require("discord.js")
const builders = require("@discordjs/builders")
const moment = require("moment")
const request = require("request")
const koa = require("koa")
const api = new koa()
const os = require("os-utils")
const so = require("os")
const xml = require("xml-js")
const screenshot = require("discord-screenshot")
const chalk = require("chalk")
const { DjsTofe: tofe } = require("@hizollo/games")
const short = require("shortlib")
const mcsrv = require("mcsrv")
const cbmc = require("cbmc-js")
const lyricsFinder = require("lyrics-finder")
function get_lyrics(artist, title) {
  return new Promise(async (resolve, reject) => {
    let lyrics = (await lyricsFinder(artist, title)) || "哞！找不到歌詞！"
    resolve(lyrics)
  })
}
const helpRow = require("./help.js")
const jokelist = require("./jokes.js")
let weather_stations
require("./weather_stations.js").then((list) => {
  weather_stations = list
  console.log(
    `${chalk.magenta("哞！")} ${chalk.green("成功")}取得天氣測站列表！`
  )
})
const alphlist = [
  "🇦",
  "🇧",
  "🇨",
  "🇩",
  "🇪",
  "🇫",
  "🇬",
  "🇭",
  "🇮",
  "🇯",
  "🇰",
  "🇱",
  "🇲",
  "🇳",
  "🇴",
  "🇵",
  "🇶",
  "🇷",
  "🇸",
  "🇹",
  "🇺",
  "🇻",
  "🇼",
  "🇽",
  "🇾",
  "🇿",
]
var timerDB = []

var cpu
os.cpuUsage((v) => {
  cpu = v
})
setInterval(() => {
  os.cpuUsage((v) => {
    cpu = v
  })
}, 1000)

const client = new Discord.Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages"],
  ws: { properties: { $browser: "Discord Android" } },
  allowedMentions: { parse: [] },
})
client.login(process.env.Token)

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
const rnum = (a, b) => {
  if (a > b) {
    var c = a
    a = b
    b = c
  }
  return Math.floor(Math.random() * (b - a + 1) + a)
}

process.on("uncaughtException", (e) => {
  console.log(
    `${chalk.magenta("哞！")} ${chalk.green("指令系統")}發生了${chalk.red(
      "錯誤"
    )}！\n${e}`
  )
})
const generateToggleButtonRow = (id) => {
  const toggleButtonLeft = new builders.ButtonBuilder()
    .setCustomId(`toggleButtonLeft-${id}`)
    .setEmoji({ id: "1015401378367160384" })
    .setLabel("​")
    .setStyle(1)

  const toggleButtonRight = new builders.ButtonBuilder()
    .setCustomId(`toggleButtonRight-${id}`)
    .setEmoji({ id: "1015401048388665368" })
    .setLabel("​")
    .setStyle(1)

  return new builders.ActionRowBuilder()
    .addComponents(toggleButtonLeft)
    .addComponents(toggleButtonRight)
}
const generateCoinButtonRow = (id) => {
  const coinButtonHead = new builders.ButtonBuilder()
    .setCustomId(`coinButtonHead-${id}`)
    .setLabel("正面")
    .setStyle(3)

  const coinButtonTail = new builders.ButtonBuilder()
    .setCustomId(`coinButtonTail-${id}`)
    .setLabel("反面")
    .setStyle(4)

  return new builders.ActionRowBuilder()
    .addComponents(coinButtonHead)
    .addComponents(coinButtonTail)
}
const LyricThingys = {
  artist: new builders.ActionRowBuilder().addComponents(
    new builders.TextInputBuilder()
      .setLabel("歌手")
      .setCustomId("artist")
      .setMaxLength(30)
      .setStyle(1)
      .setMinLength(2)
      .setRequired(true)
  ),
  songname: new builders.ActionRowBuilder().addComponents(
    new builders.TextInputBuilder()
      .setLabel("歌曲名稱")
      .setCustomId("songname")
      .setMaxLength(30)
      .setStyle(1)
      .setMinLength(2)
      .setRequired(true)
  ),
}
//#endregion

client.on("ready", async () => {
  console.clear()
  console.log(`${chalk.magenta("牛牛")} v0.3.8`)
  console.log(
    chalk.magenta(`
    █   █ ▀█▀ ▀█▀ █   █▀▀   █▀▀ █▀█ █ █ █
    █▄▄ █  █   █  █▄▄ ██▄   █▄▄ █▄█ ▀▄▀▄▀

    https://github.com/LittleCow-moo/Discord
    `)
  )
  console.log(
    `${chalk.magenta("哞！")} ${chalk.green("指令系統")}已用 @${
      client.user.tag
    } 的身份登入！`
  )
  require("./music")
})

client.on("interactionCreate", async (slash) => {
  if (!slash.isCommand()) return
  const command =
    slash.options.getSubcommandGroup(false) || slash.options.getSubcommand()
  switch (command) {
    case "help":
      const help = new builders.EmbedBuilder()
        .setColor(0xff00a7)
        .setTitle("牛牛幫助")
        .setDescription("哞！我是牛牛，一隻簡單的機器牛。\n目前有下列指令：")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/858984158620286998/982933401919184926/ec51f3aed0943f79239a05124e863dd5.webp"
        )
      slash.reply({ embeds: [help], components: [helpRow] })
      break
    case "joke":
      slash.reply(jokelist[rnum(1, jokelist.length) - 1])
      break
    case "coin":
      slash.reply({
        content: "哞！你要猜正面還是反面？",
        components: [generateCoinButtonRow(slash.user.id)],
      })
      break
    case "say":
      const toSend = slash.options.getString("text")
      slash.channel.send(toSend)
      slash.reply({ content: "哞！傳送成功！", ephemeral: true })
      break
    case "suggest":
      const toSuggest = slash.options.getString("text")
      const suggestEmbed = new builders.EmbedBuilder().setColor(0xffe153)
        .setDescription(`${slash.user.username} (${slash.user.id}) 
從伺服器 ${slash.guild.name} (${slash.guild.id}) 傳來了新建議：
${toSuggest}`)
      client.channels.cache.get(process.env.SuggestChannel).send({
        content: `哞！${slash.user.username}傳來了建議!詳細資料如下：`,
        embeds: [suggestEmbed],
      })
      slash.reply({ content: "哞！傳送成功！", ephemeral: true })
      break
    case "poll":
      const toPoll = slash.options.getString("text")
      slash.channel.send(toPoll).then((pollMsg) => {
        pollMsg.react("👍")
        pollMsg.react("👎")
      })
      slash.reply({ content: "哞！傳送成功！", ephemeral: true })
      break
    case "custompoll":
      const toCustomPoll = slash.options.getString("text")
      const customPollOptions = slash.options
        .getString("option")
        .split("@")
        .join("​@")
      const pollopt = customPollOptions.split(";")
      if (pollopt.length > 20) {
        slash.reply({ content: "哞！太多選項了！", ephemeral: true })
        return
      }
      let pollemotes = []
      pollopt.forEach((item, index) => {
        pollopt[index] = `${alphlist[index]}-${item}`
        pollemotes.push(alphlist[index])
      })
      slash.channel
        .send(`${toCustomPoll}\n${pollopt.join("\n")}`)
        .then(async (custompoll) => {
          pollemotes.forEach((item) => {
            custompoll.react(item)
          })
        })
      slash.reply({ content: "哞！傳送成功！", ephemeral: true })
      break
    case "avatar":
      const toAvatar = slash.options.getUser("user")
      let tag = toAvatar.tag
      if (toAvatar.discriminator === "0") {
        tag = tag.slice(0, -2) // 移除 #0
      }
      slash.reply({
        content: `哞！這是 \`${tag}\` 的頭貼：`,
        files: [toAvatar.displayAvatarURL({ size: 4096, format: "png" })],
      })
      break

    case "time":
      slash.reply(`哞！現在的時間是： <t:${Math.floor(+new Date() / 1000)}:F>`)
      break
    case "screenshot":
      const toScreenshot = slash.options.getString("url")
      if (
        !(
          toScreenshot.startsWith("http://") ||
          toScreenshot.startsWith("https://")
        )
      ) {
        return slash.reply({ content: "哞！這不是網址！", ephemeral: true })
      }
      slash.deferReply().then(async () => {
        const result = await screenshot.screenshot(toScreenshot)
        slash.editReply({
          content: `哞！這是 \`${toScreenshot}\` 的截圖：`,
          files: [result],
        })
      })
      break
    case "shortlink":
      const toShort = slash.options.getString("url")
      const shortType = slash.options.getString("type") || "tnyim"
      if (!(toShort.startsWith("http://") || toShort.startsWith("https://")))
        return slash.reply({ content: "哞！這不是網址！", ephemeral: true })

      slash.deferReply({ ephemeral: true }).then(() => {
        short[shortType](toShort).then((target) => {
          slash.editReply({
            content: `哞！你的短網址： \`${target}\``,
            ephemeral: false,
          })
        })
      })
      break
    case "botinfo":
      const rendermsg = ["牛牛 v0.3.8"]
      rendermsg.push(`伺服器數量： \`${client.guilds.cache.size}\``)
      rendermsg.push(`CPU型號： \`${so.cpus()[0].model}\``)
      rendermsg.push(`CPU使用量： \`${cpu.toString().slice(0, 4)}%\``)
      let tempTime = moment.duration(client.uptime)
      let y = `${tempTime.hours()}小時${tempTime.minutes()}分鐘${tempTime.seconds()}秒`
      rendermsg.push(`已上線\`${y}\``)
      rendermsg.push(`於<t:${Math.floor(client.readyTimestamp / 1000)}:F>上線`)
      slash.reply(rendermsg.join("\n"))
      break
    case "ping":
      slash
        .reply({ content: "哞！載入中...", fetchReply: true })
        .then(async (repli) => {
          slash.editReply(
            `哞！機器人延遲是： ${
              repli.createdTimestamp - slash.createdTimestamp
            }ms | API延遲是： ${client.ws.ping}ms`
          )
        })
      break
    case "minecraft":
      const minecraftType = slash.options.getSubcommand()
      const minecraftIp = slash.options.getString("server")
      slash.deferReply().then(() => {
        switch (minecraftType) {
          case "bedrock":
            mcsrv("../bedrock/2/" + minecraftIp).then((body) => {
              if (!body.online)
                return slash.editReply({ content: "哞！伺服器沒開！" })
              const dataembed = new builders.EmbedBuilder()
                .addFields({
                  name: "名稱",
                  value: body.motd.clean.join("\n") || "查無資料",
                  inline: true,
                })
                .addFields({
                  name: "玩家數",
                  value: [
                    String(body.players.online) || "查無資料",
                    "/",
                    String(body.players.max) || "查無資料",
                  ].join(""),
                  inline: true,
                })
                .addFields({
                  name: "版本",
                  value: body.version || "查無資料",
                  inline: true,
                })
                .addFields({
                  name: "模式",
                  value: body.gamemode || "查無資料",
                  inline: true,
                })
                .addFields({
                  name: "軟體",
                  value: body.software || "查無資料",
                  inline: true,
                })
                .addFields({
                  name: "端口",
                  value: String(body.port) || "查無資料",
                  inline: true,
                })
              slash.editReply({
                content: `哞！這是 \`${minecraftIp}\` 的資訊：`,
                embeds: [dataembed],
              })
            })
            break
          case "java":
            mcsrv(minecraftIp).then((body) => {
              if (!body.online)
                return slash.editReply({ content: "哞！伺服器沒開！" })
              const dataembed = new builders.EmbedBuilder()
                .addFields({
                  name: "MOTD",
                  value: body.motd.clean.join("\n") || "查無資料",
                  inline: true,
                })
                .addFields({
                  name: "玩家數",
                  value: [
                    String(body.players.online) || "查無資料",
                    "/",
                    String(body.players.max) || "查無資料",
                  ].join(""),
                  inline: true,
                })
                .addFields({
                  name: "版本",
                  value: body.version || "查無資料",
                  inline: true,
                })
                .addFields({
                  name: "協議版本",
                  value: String(body.protocol) || "查無資料",
                  inline: true,
                })
                .addFields({
                  name: "軟體",
                  value: body.software || "查無資料",
                  inline: true,
                })
                .addFields({
                  name: "端口",
                  value: String(body.port) || "查無資料",
                  inline: true,
                })
                .setThumbnail(`https://api.mcsrvstat.us/icon/${minecraftIp}`)
              slash.editReply({
                content: `哞！這是 \`${minecraftIp}\` 的資訊：`,
                embeds: [dataembed],
              })
            })
            break
        }
      })
      break
    case "2048":
      const tofeGame = new tofe({
        source: slash,
        players: [slash.user],
        strings: require("./translates/zh-tw/2048.json"),
      })
      await tofeGame.initialize()
      await tofeGame.start()
      await tofeGame.conclude()
      break
    case "invoice":
      slash.deferReply().then(() => {
        request(
          "https://invoice.etax.nat.gov.tw/invoice.xml",
          (error, response, body) => {
            inv = body
            const opt = { ignoreComment: true, alwaysChildren: true }
            const resu = xml.xml2js(inv, opt)
            const title =
              resu.elements[0].elements[0].elements[4].elements[0].elements[0]
                .cdata
            const content =
              resu.elements[0].elements[0].elements[4].elements[3].elements[0].cdata.split(
                "</p><p>"
              )
            content[0] = content[0].split("<p>")[1]
            content[content.length - 1] =
              content[content.length - 1].split("</p>")[0]
            const embed = new builders.EmbedBuilder()
              .setTitle(title)
              .addFields({
                name: content[0].split("：")[0],
                value: content[0].split("：")[1],
              })
              .addFields({
                name: content[1].split("：")[0],
                value: content[1].split("：")[1],
              })
              .addFields({
                name: content[2].split("：")[0],
                value: content[2].split("：")[1].replaceAll("、", "\n"),
              })
            slash.editReply({
              content: "哞！這是第1頁",
              embeds: [embed],
              components: [generateToggleButtonRow(slash.user.id)],
            })
          }
        )
      })
      break
    case "color":
      const toColor = slash.options.getString("code")
      const color = toColor.startsWith("#") ? toColor.split("#")[1] : toColor
      if (parseInt(`0x${color}`).toString() == "NaN")
        return slash.reply({ content: "哞！這不是色號！", ephemeral: true })
      let embed
      try {
        embed = new builders.EmbedBuilder()
          .setTitle(`#${color}`)
          .setColor(parseInt(`0x${color}`))
          .setImage(`https://singlecolorimage.com/get/${color}/250x250`)
      } catch (error) {
        slash.reply({ content: "哞！API發生錯誤！", ephemeral: true })
        return
      }
      slash.reply({ embeds: [embed] })
      break
    case "lyrics":
      slash.deferReply().then(() => {
        try {
          get_lyrics(
            slash.options.getString("artist"),
            slash.options.getString("song")
          ).then((lyrics) => {
            const toSend = lyrics
              ? {
                  files: [
                    new Discord.MessageAttachment(
                      Buffer.from(lyrics),
                      "lyrics.txt"
                    ),
                  ],
                }
              : "哞！找不到歌詞！"
            slash.editReply(toSend)
          })
        } catch (err) {
          slash.editReply("哞！尋找歌詞時出問題了！請再試一次！")
        }
      })
      break
    case "earthquake":
      const eqIndex = slash.options.getInteger("index") || 1
      slash.deferReply().then(() => {
        //反正這不是我的API Key 不放.env沒差啦.w.
        request(
          `https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=rdec-key-123-45678-011121314&limit=1&format=JSON&offset=${
            eqIndex - 1
          }`,
          (error, response, body) => {
            body = JSON.parse(body)
            const locmap = `https://www.google.com/maps/search/?api=1&query=${body.records.Earthquake[0].EarthquakeInfo.Epicenter.EpicenterLatitude},${body.records.Earthquake[0].EarthquakeInfo.Epicenter.EpicenterLongitude}`
            let biggestinte = []
            body.records.Earthquake[0].Intensity.ShakingArea.forEach((area) => {
              if (!area.AreaDesc.startsWith("最大震度")) return
              biggestinte.push(`${area.CountyName}最大${area.AreaIntensity}`)
            })
            biggestinte = biggestinte.join("\n")
            const eqTime = moment(
              body.records.Earthquake[0].EarthquakeInfo.OriginTime
            ).unix()
            const eqEmbed = new builders.EmbedBuilder()
              .addFields({
                name: "編號",
                value:
                  body.records.Earthquake[0].EarthquakeNo !=
                  (new Date().getFullYear() - 1911) * 1000
                    ? String(body.records.Earthquake[0].EarthquakeNo)
                    : "我用的明明是顯著有感地震的API 怎麼會沒有編號.w.",
                inline: true,
              })
              .addFields({
                name: "時間",
                value: `<t:${eqTime}:D><t:${eqTime}:T>`,
                inline: true,
              })
              .addFields({
                name: "深度",
                value: `${body.records.Earthquake[0].EarthquakeInfo.FocalDepth}km`,
                inline: true,
              })
              .addFields({
                name: "芮氏規模",
                value: String(
                  body.records.Earthquake[0].EarthquakeInfo.EarthquakeMagnitude
                    .MagnitudeValue
                ),
                inline: true,
              })
              .addFields({
                name: "震央",
                value: `${body.records.Earthquake[0].EarthquakeInfo.Epicenter.Location}\n[在Google地圖上查看](${locmap})`,
                inline: true,
              })
              .addFields({ name: "最大震度", value: biggestinte, inline: true })
              .setDescription(
                `${body.records.Earthquake[0].ReportContent}\n[地震報告連結](${body.records.Earthquake[0].Web})`
              )
              .setImage(body.records.Earthquake[0].ReportImageURI)
              .setColor(0xff00a7)
            slash.editReply({ embeds: [eqEmbed] })
          }
        )
      })
      break
    case "timer":
      const timerLength = slash.options.getString("time")
      const timerTime = moment().add(
        moment.duration("PT" + timerLength.toUpperCase())
      )
      timerDB.push({ user: slash.user.id, time: timerTime })
      slash.reply({
        content: `哞！你的計時器將在<t:${timerTime.unix()}:R>後響鈴！\n(注意：機器人一旦重啟，計時器就會失效了，~~所以祈禱機器人不要重啟吧~~)`,
        ephemeral: true,
      })
      break
    case "cbmc":
      const postIndex = slash.options.getString("index") || 1
      slash.deferReply().then(async () => {
        const postList = await cbmc.getPostList(postIndex)
        if (postList) {
          const post = postList.posts[String(postIndex)].post
          const postEmbed = new builders.EmbedBuilder()
            .setTitle(`${post.type}${post.id.post}`)
            .setDescription(post.content)
            .setColor(0xff00a7)
          slash.editReply({ embeds: [postEmbed] })
        }
      })
      break
    case "weather":
      slash.deferReply().then(() => {
        request(
          `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=rdec-key-123-45678-011121314&stationId=${slash.options.getString(
            "station"
          )}&elementName=WDIR,WDSD,TEMP,HUMD,PRES,Weather`,
          (error, response, body) => {
            body = JSON.parse(body)
            const weatherDesc = `溫度：${body.TEMP}°C
濕度：${String(parseFloat(body.HUMD) * 100)}%
風速：${body.WDSD}m/s
風向：${body.WDIR}°
氣壓：${body.PRES}hPa
`
            const weatherEmbed = new builders.EmbedBuilder()
              .setTitle(body.Weather)
              .setDescription(weatherDesc)
              .setColor(0xff00a7)
            slash.editReply({ embeds: [weatherEmbed] })
          }
        )
      })
      break
  }
})
client.on("interactionCreate", async (button) => {
  if (!button.isButton()) return
  switch (true) {
    case /toggleButtonLeft-[^-][0-9]*/.test(button.customId):
      if (button.user.id != button.customId.replace("toggleButtonLeft-")) return
      let nowPage = parseInt(
        button.message.content.split("哞！這是第")[1].split("頁")[0]
      )
      button.deferUpdate()
      if (nowPage == 1) return
      request(
        "https://invoice.etax.nat.gov.tw/invoice.xml",
        (error, response, body) => {
          inv = body
          const opt = { ignoreComment: true, alwaysChildren: true }
          const resu = xml.xml2js(inv, opt)
          const title =
            resu.elements[0].elements[0].elements[3 + nowPage - 1].elements[0]
              .elements[0].cdata
          const content =
            resu.elements[0].elements[0].elements[
              3 + nowPage - 1
            ].elements[3].elements[0].cdata.split("</p><p>")
          content[0] = content[0].split("<p>")[1]
          content[content.length - 1] =
            content[content.length - 1].split("</p>")[0]
          const embed = new builders.EmbedBuilder()
            .setTitle(title)
            .addFields({
              name: content[0].split("：")[0],
              value: content[0].split("：")[1],
            })
            .addFields({
              name: content[1].split("：")[0],
              value: content[1].split("：")[1],
            })
            .addFields({
              name: content[2].split("：")[0],
              value: content[2].split("：")[1].replaceAll("、", "\n"),
            })
          button.message.edit({
            content: `哞！這是第${nowPage - 1}頁`,
            embeds: [embed],
            components: [toggleButtonRow],
          })
        }
      )
      break
    case /toggleButtonRight-[^-][0-9]*/.test(button.customId):
      if (button.user.id != button.customId.replace("toggleButtonRight-"))
        return
      let nowPageR = parseInt(
        button.message.content.split("哞！這是第")[1].split("頁")[0]
      )
      button.deferUpdate()
      if (nowPageR == 6) return
      request(
        "https://invoice.etax.nat.gov.tw/invoice.xml",
        (error, response, body) => {
          inv = body
          const opt = { ignoreComment: true, alwaysChildren: true }
          const resu = xml.xml2js(inv, opt)
          const title =
            resu.elements[0].elements[0].elements[3 + nowPageR + 1].elements[0]
              .elements[0].cdata
          const content =
            resu.elements[0].elements[0].elements[
              3 + nowPageR + 1
            ].elements[3].elements[0].cdata.split("</p><p>")
          content[0] = content[0].split("<p>")[1]
          content[content.length - 1] =
            content[content.length - 1].split("</p>")[0]
          const embed = new builders.EmbedBuilder()
            .setTitle(title)

            .addFields({
              name: content[0].split("：")[0],
              value: content[0].split("：")[1],
            })
            .addFields({
              name: content[1].split("：")[0],
              value: content[1].split("：")[1],
            })
            .addFields({
              name: content[2].split("：")[0],
              value: content[2].split("：")[1].replaceAll("、", "\n"),
            })
          button.message.edit({
            content: `哞！這是第${nowPageR + 1}頁`,
            embeds: [embed],
            components: [toggleButtonRow],
          })
        }
      )
      break
    case /coinButtonHead-[^-][0-9]*/.test(button.customId):
    case /coinButtonTail-[^-][0-9]*/.test(button.customId):
      if (button.user.id != button.customId.split("-")[1]) return
      button.deferUpdate()
      const coinnum = rnum(1, 2)
      if (coinnum == 1 && button.customId.startsWith("coinButtonHead-"))
        return button.message.edit({ content: "答對了！", components: [] })
      if (coinnum == 1 && button.customId.startsWith("coinButtonTail-"))
        return button.message.edit({
          content: "錯了，是正面才對",
          components: [],
        })
      if (coinnum == 2 && button.customId.startsWith("coinButtonHead-"))
        return button.message.edit({
          content: "錯了，是反面才對",
          components: [],
        })
      if (coinnum == 2 && button.customId.startsWith("coinButtonTail-"))
        return button.message.edit({ content: "答對了！", components: [] })
      break
  }
})
client.on("interactionCreate", async (select) => {
  if (!select.isSelectMenu) return
  if (select.customId != "features") return
  const embed = new Discord.MessageEmbed()
    .setColor("#ff00a7")
    .setTitle(require("./help.json")[select.values[0]]["name"])
    .setDescription(require("./help.json")[select.values[0]]["desc"])
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/858984158620286998/982933401919184926/ec51f3aed0943f79239a05124e863dd5.webp"
    )
    .setImage(`https://cowhelpcdn.cowteam.repl.co/${select.values[0]}.png`)
  select.reply({ embeds: [embed], ephemeral: true })
})
client.on("interactionCreate", async (context) => {
  if (!context.isContextMenu) return
  switch (context.commandName) {
    case "頭貼":
      if (typeof client.users.cache.get(context.targetId) != "undefined") {
        let tag = client.users.cache.get(context.targetId).tag
        if (client.users.cache.get(context.targetId).discriminator === "0") {
          tag = tag.slice(0, -2) // 移除 #0
        }
        context.reply({
          content: `哞！這是 \`${tag}\` 的頭貼：`,
          files: [
            `${client.users.cache
              .get(context.targetId)
              .avatarURL({ dynamic: true })}?size=4096`,
          ],
        })
      } else {
        context.reply("哞！發生錯誤！")
      }
      break
    case "投票":
      context.channel.messages.fetch(context.targetId).then((polling) => {
        context.channel.send(polling.content).then((pollmsg) => {
          pollmsg.react("👍")
          pollmsg.react("👎")
        })
      })
      context.reply({ content: "哞！投票已傳送！", ephemeral: true })
      break
    case "網頁截圖":
      context.channel.messages.fetch(context.targetId).then(async (shoting) => {
        shoting = shoting.content
        if (
          !(shoting.startsWith("http://") || shoting.startsWith("https://"))
        ) {
          return context.reply({ content: "哞！這不是網址！", ephemeral: true })
        }
        context.deferReply()
        const result = await screenshot.screenshot(shoting)
        context.editReply({
          content: `哞！這是 \`${shoting}\` 的截圖：`,
          files: [result],
        })
      })
      break
  }
})
client.on("interactionCreate", async (auto) => {
  if (!auto.isAutocomplete()) return
  const focused = auto.options.getFocused(true)
  if (focused.name !== "station") return
  const searching = auto.options.getFocused()
  const filtered = weather_stations.filter((item) => {
    return `${item.StationName} ${item.Location}`.includes(searching)
  })
  const mapped = filtered.map((choice) => ({
    name: `${choice.StationName} ${choice.Location}`,
    value: choice.StationID,
  }))
  await auto.respond(mapped.slice(0, 25))
})
client.on("messageCreate", (message) => {
  switch (message.content) {
    case `${client.user.tag} :four_leaf_clover:`:
    case `${client.user.tag}:four_leaf_clover:`:
    case `${client.user.tag} 🍀`:
    case `${client.user.tag}🍀`:
    case `<@!${client.user.id}> 🍀`:
    case `<@!${client.user.id}>🍀`:
    case `<@!${client.user.id}> :four_leaf_clover:`:
    case `<@!${client.user.id}>:four_leaf_clover:`:
    case `<@${client.user.id}> 🍀`:
    case `<@${client.user.id}>🍀`:
    case `<@${client.user.id}> :four_leaf_clover:`:
    case `<@${client.user.id}>:four_leaf_clover:`:
      message.reply("謝謝!")
      break
    case `${client.user.tag} :basketball:`:
    case `${client.user.tag}:basketball:`:
    case `${client.user.tag} 🏀`:
    case `${client.user.tag}🏀`:
    case `<@!${client.user.id}> 🏀`:
    case `<@!${client.user.id}>🏀`:
    case `<@!${client.user.id}> :basketball:`:
    case `<@!${client.user.id}>:basketball:`:
    case `<@${client.user.id}> 🏀`:
    case `<@${client.user.id}>🏀`:
    case `<@${client.user.id}> :basketball:`:
    case `<@${client.user.id}>:basketball:`:
      const ballnum = rnum(1, 3)
      const balllist = [
        {
          content: "哞！我接到球了！",
          files: [
            {
              name: "catch.png",
              attachment:
                "https://cowlinecdn.kiwichang.repl.co/ball/cow_catch.png",
            },
          ],
        },
        {
          content: "唉呦！好痛！",
          files: [
            {
              name: "ko.png",
              attachment:
                "https://cowlinecdn.kiwichang.repl.co/ball/cow_ko.png",
            },
          ],
        },
        {
          content:
            "哞！我接到球了！\n我把球丟給你\n你沒接到，你看起來很痛的樣子",
          files: [
            {
              name: "you_ko.png",
              attachment:
                "https://cowlinecdn.kiwichang.repl.co/ball/didi_ko.png",
            },
          ],
        },
      ]
      message.reply(balllist[ballnum])
      break
  }
})
setInterval(() => {
  timerDB.forEach((timer, index) => {
    if (timer.time <= moment()) {
      client.users.cache.get(timer.user).send("哞！時間到！")
      timerDB.splice(index, 1)
    }
  })
})
api.use((ctx) => {
  if (ctx.url != "/ping") return
  ctx.body = { ping: client.ws.ping }
})
api.listen(process.env.APIPort)
