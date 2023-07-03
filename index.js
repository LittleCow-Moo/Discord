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
const DiscordGame = require("discord-games-beta")
const { DjsTofe: tofe } = require("@hizollo/games")
const short = require("shortlib")
const mcsrv = require("mcsrv")
const cbmc = request("cbmc-js")
const lyricsFinder = require("lyrics-finder")
function get_lyrics(artist, title) {
  return new Promise(async (resolve, reject) => {
    let lyrics = (await lyricsFinder(artist, title)) || "哞!找不到歌詞!"
    resolve(lyrics)
  })
}
const game = new DiscordGame(process.env.Token, "youtube", 2, {
  neverExpire: false,
})
const helpRow = require("./help.js")
const hahalist = [
  "冰塊最想做什麼事?||退伍 因為他當冰很久了||",
  "有一天,我去吉野家,可是||吉野不在家||",
  "我走進眼科診所跟醫生抱怨說:「最近視力變差了,我需要配一副新眼鏡。」他||嘆了一口氣回說:「你真的病得不輕，我這裡可是甜甜圈店啊!」||",
  "有一隻狼寶寶不吃肉只吃素,狼媽媽、狼爸爸看得很擔心,某天,狼寶寶終於追著一隻兔子跑,牠們感到很欣慰,狼寶寶抓到兔子後說:||快把紅蘿蔔交出來!||",
  "天上的星星有多重?||8克,因為星巴克||",
  "有一天,小明去醫院量血壓,血壓計的語音說:血壓升高中，請注意...小明問醫生:為什麼會這樣?醫生回:這表示你的血壓...||國中畢業了。||",
  "第一個進船的要說什麼?||要說online,因為仙境傳說online||",
  "小魚問大魚說:你-喜-歡-吃-怎-樣-的-魚?大魚回:我喜歡吃講話慢的魚!小魚說:||醬紫先走||",
  "小明每次開可樂,瓶蓋都寫銘謝惠顧,有一天,他在考試,突然忘記銘要怎麼寫了,於是他打開桌上的可樂,||結果寫:再來一瓶||",
  "有一天,我和牛弟弟在吃草,弟弟問我:草是什麼味道?我回:草莓味。弟弟吃了一口草,生氣的說:這草明明沒有味道!我回:我沒有說錯啊...||我剛剛說草沒有味道,草沒味啊!||",
  "你知道學校的警衛每天早上都在笑什麼嗎?||校門口||",
  "什麼情況下人會有四隻眼睛?||兩個人的時候||",
  "愚公臨死前召集兒子來到床邊虛弱的說:移山…移山……\n兒子: ||亮晶晶?||\n愚公卒。",
]
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

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
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
    `${chalk.magenta("哞!")} ${chalk.green("指令系統")}發生了${chalk.red(
      "錯誤"
    )}!\n${e}`
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
  console.log(`${chalk.magenta("牛牛")} v0.3.7`)
  console.log(
    chalk.magenta(`
    █   █ ▀█▀ ▀█▀ █   █▀▀   █▀▀ █▀█ █ █ █
    █▄▄ █  █   █  █▄▄ ██▄   █▄▄ █▄█ ▀▄▀▄▀

    https://github.com/LittleCow-moo/Discord
    `)
  )
  console.log(
    `${chalk.magenta("哞!")} ${chalk.green("指令系統")}已用 @${
      client.user.tag
    } 的身份登入!`
  )
  require("./music")
})

client.on("interactionCreate", async (slash) => {
  if (!slash.isCommand()) return
  const command =
    slash.options.getSubcommandGroup(false) || slash.options.getSubcommand()
  await delay(200)
  switch (command) {
    case "help":
      const help = new builders.EmbedBuilder()
        .setColor(0xff00a7)
        .setTitle("牛牛幫助")
        .setDescription("哞!我是牛牛,一隻很簡單的機器牛。\n目前有下列指令:")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/858984158620286998/982933401919184926/ec51f3aed0943f79239a05124e863dd5.webp"
        )
      slash.reply({ embeds: [help], components: [helpRow] })
      break
    case "haha":
      slash.reply(hahalist[rnum(1, hahalist.length) - 1])
      break
    case "coin":
      slash.reply({
        content: "哞!你要猜正面還是反面?",
        components: [generateCoinButtonRow(slash.user.id)],
      })
      break
    case "say":
      const toSend = slash.options.getString("text")
      slash.channel.send(toSend)
      slash.reply({ content: "哞!傳送成功!", ephemeral: true })
      break
    case "suggest":
      const toSuggest = slash.options.getString("text")
      const suggestEmbed = new builders.EmbedBuilder().setColor(0xffe153)
        .setDescription(`${slash.user.username} (${slash.user.id}) 
從伺服器 ${slash.guild.name} (${slash.guild.id}) 傳來了新建議:
${toSuggest}`)
      client.channels.cache.get("875529441147781130").send({
        content: `哞!${slash.user.username}傳來了建議!詳細資料如下:`,
        embeds: [suggestEmbed],
      })
      slash.reply({ content: "哞!傳送成功!", ephemeral: true })
      break
    case "poll":
      const toPoll = slash.options.getString("text")
      slash.channel.send(toPoll).then((pollMsg) => {
        pollMsg.react("👍")
        pollMsg.react("👎")
      })
      slash.reply({ content: "哞!傳送成功!", ephemeral: true })
      break
    case "custompoll":
      const toCustomPoll = slash.options.getString("text")
      const customPollOptions = slash.options
        .getString("option")
        .split("@")
        .join("​@")
      const pollopt = customPollOptions.split(";")
      if (pollopt.length > 20) {
        slash.reply({ content: "哞!太多選項了!", ephemeral: true })
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
      slash.reply({ content: "哞!傳送成功!", ephemeral: true })
      break
    case "avatar":
      const toAvatar = slash.options.getUser("user")
      let tag = toAvatar.tag
      if (toAvatar.discriminator === "0") {
        tag = tag.slice(0, -2) // 移除 #0
      }
      slash.reply({
        content: `哞!這是 \`${tag}\` 的頭貼:`,
        files: [toAvatar.displayAvatarURL({ size: 4096, format: "png" })],
      })
      break

    case "time":
      slash.reply(`哞!現在的時間是:<t:${Math.floor(+new Date() / 1000)}:F>`)
      break
    case "screenshot":
      const toScreenshot = slash.options.getString("url")
      if (
        !(
          toScreenshot.startsWith("http://") ||
          toScreenshot.startsWith("https://")
        )
      ) {
        return slash.reply({ content: "哞!這不是網址!", ephemeral: true })
      }
      slash.deferReply()
      const result = await screenshot.screenshot(toScreenshot)
      slash.editReply({
        content: `哞!這是 \`${toScreenshot}\` 的截圖:`,
        files: [result],
      })
      break
    case "shortlink":
      const toShort = slash.options.getString("url")
      const shortType = slash.options.getString("type") || "tnyim"
      if (!(toShort.startsWith("http://") || toShort.startsWith("https://")))
        return slash.reply({ content: "哞!這不是網址!", ephemeral: true })

      slash.deferReply({ ephemeral: true })
      short[shortType](toShort).then((target) => {
        slash.editReply({
          content: `哞!你的短網址: \`${target}\``,
          ephemeral: false,
        })
      })
      break
    case "botinfo":
      const rendermsg = ["牛牛 v0.3.8"]
      rendermsg.push(`伺服器數量:\`${client.guilds.cache.size}\``)
      rendermsg.push(`CPU型號:\`${so.cpus()[0].model}\``)
      rendermsg.push(`CPU使用量:\`${cpu.toString().slice(0, 4)}%\``)
      let tempTime = moment.duration(client.uptime)
      let y = `${tempTime.hours()}時${tempTime.minutes()}分${tempTime.seconds()}秒`
      rendermsg.push(`已上線\`${y}\``)
      rendermsg.push(`於<t:${Math.floor(client.readyTimestamp / 1000)}:F>上線`)
      slash.reply(rendermsg.join("\n"))
      break
    case "delay":
      slash
        .reply({ content: "哞!載入中...", fetchReply: true })
        .then(async (repli) => {
          slash.editReply(
            `哞!機器人延遲是:${
              repli.createdTimestamp - slash.createdTimestamp
            }ms | API延遲是:${client.ws.ping}ms`
          )
        })
      break
    case "minecraft":
      const minecraftType = slash.options.getSubcommand()
      const minecraftIp = slash.options.getString("server")
      slash.deferReply()
      switch (minecraftType) {
        case "bedrock":
          mcsrv("../bedrock/2/" + minecraftIp).then((body) => {
            if (!body.online)
              return slash.editReply({ content: "哞!伺服器沒開!" })
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
              content: `哞!這是 \`${minecraftIp}\` 的資訊:`,
              embeds: [dataembed],
            })
          })
          break
        case "java":
          mcsrv(minecraftIp).then((body) => {
            if (!body.online)
              return slash.editReply({ content: "哞!伺服器沒開!" })
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
              content: `哞!這是 \`${minecraftIp}\` 的資訊:`,
              embeds: [dataembed],
            })
          })
          break
      }
      break
    case "youtube":
      const toYoutube = slash.options.getChannel("channel")
      if (toYoutube.type != "GUILD_VOICE")
        return slash.reply({ content: "哞!這不是語音頻道!", ephemeral: true })
      game
        .play(toYoutube)
        .then((result) =>
          slash.reply(`哞!點擊連結開始一起看YouTube! <${result.inviteLink}>`)
        )
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
              content: "哞!這是第1頁",
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
        return slash.reply({ content: "哞!這不是色號!", ephemeral: true })
      let embed
      try {
        embed = new builders.EmbedBuilder()
          .setTitle(`#${color}`)
          .setColor(parseInt(`0x${color}`))
          .setImage(`https://singlecolorimage.com/get/${color}/250x250`)
      } catch (error) {
        slash.reply({ content: "哞!API發生錯誤!", ephemeral: true })
        return
      }
      slash.reply({ embeds: [embed] })
      break
    case "lyrics":
      const searchLyrics = new builders.ButtonBuilder()
        .setStyle(2)
        .setLabel("尋找歌詞")
        .setCustomId("searchLyrics")
        .setEmoji({ name: "lyrics", id: "1009247448738316319" })
      const slRow = new builders.ActionRowBuilder().addComponents(searchLyrics)
      slash.reply({
        content: "哞!點擊此按鈕即可打開搜尋表單!",
        components: [slRow],
      })
      break
    case "earthquake":
      const eqIndex = slash.options.getInteger("index") || 1
      slash.deferReply()
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
            biggestinte.push(`${area.CountyName}最大${area.AreaIntensity}`)
          })
          biggestinte = biggestinte.join("\n")
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
              value: String(
                body.records.Earthquake[0].EarthquakeInfo.OriginTime
              ),
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
      break
    case "timer":
      const timerLength = slash.options.getString("time")
      const timerTime = moment().add(
        moment.duration("PT" + timerLength.toUpperCase())
      )
      timerDB.push({ send: slash.user.send, time: timerTime })
      slash.reply({
        content: `哞!你的計時器將在<t:${timerTime.unix()}:R>後響鈴!\n(注意:機器人一旦重啟，計時器就會失效了，~~所以祈禱機器人不要重啟吧~~)`,
        ephemeral: true,
      })
      break
    case "cbmc":
      const postIndex = slash.options.getString("index") || 1
      slash.deferReply()
      const postList = await cbmc.getPostList(postIndex)
      if (postList) {
        const post = postList.posts[String(cbmcIndex)].post
        const postEmbed = new builders.EmbedBuilder()
          .setTitle(`${post.type}${post.id.post}`)
          .setDescription(post.content)
          .setColor(0xff00a7)
        slash.editReply({ embeds: [postEmbed] })
      }
      break
  }
})
client.on("interactionCreate", async (button) => {
  if (!button.isButton()) return
  switch (true) {
    case /toggleButtonLeft-[^-][0-9]*/.test(button.customId):
      if (button.user.id != button.customId.replace("toggleButtonLeft-")) return
      let nowPage = parseInt(
        button.message.content.split("哞!這是第")[1].split("頁")[0]
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
            content: `哞!這是第${nowPage - 1}頁`,
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
        button.message.content.split("哞!這是第")[1].split("頁")[0]
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
            content: `哞!這是第${nowPageR + 1}頁`,
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
        return button.message.edit({ content: "答對了!", components: [] })
      if (coinnum == 1 && button.customId.startsWith("coinButtonTail-"))
        return button.message.edit({
          content: "錯了,是正面才對",
          components: [],
        })
      if (coinnum == 2 && button.customId.startsWith("coinButtonHead-"))
        return button.message.edit({
          content: "錯了,是反面才對",
          components: [],
        })
      if (coinnum == 2 && button.customId.startsWith("coinButtonTail-"))
        return button.message.edit({ content: "答對了!", components: [] })
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
client.on("interactionCreate", async (click) => {
  if (!click.isButton) return
  if (click.customId != "searchLyrics") return
  try {
    click.showModal(
      new Discord.Modal({ customId: "searchLyric", title: "尋找歌詞" }, client)
        .addComponents(LyricThingys.artist.toJSON())
        .addComponents(LyricThingys.songname.toJSON())
    )
    const filter = (interaction) => interaction.customId === "searchLyric"
    click.awaitModalSubmit({ filter, time: 15_000 }).then((modal) => {
      modal.deferReply()
      get_lyrics(
        modal.fields.getTextInputValue("artist"),
        modal.fields.getTextInputValue("songname")
      ).then((lyrics) => {
        const toSend =
          lyrics != "哞!找不到歌詞!"
            ? {
                files: [
                  new Discord.MessageAttachment(
                    Buffer.from(lyrics),
                    "lyrics.txt"
                  ),
                ],
              }
            : lyrics
        modal.editReply(toSend)
      })
    })
  } catch (err) {
    click.channel.send("哞!尋找歌詞時出問題了!請將表單關掉,並且再打開一次!")
  }
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
          content: `哞!這是 \`${tag}\` 的頭貼:`,
          files: [
            `${client.users.cache
              .get(context.targetId)
              .avatarURL({ dynamic: true })}?size=4096`,
          ],
        })
      } else {
        context.reply("哞!發生錯誤!")
      }
      break
    case "投票":
      context.channel.messages.fetch(context.targetId).then((polling) => {
        context.channel.send(polling.content).then((pollmsg) => {
          pollmsg.react("👍")
          pollmsg.react("👎")
        })
      })
      context.reply({ content: "哞!投票已傳送!", ephemeral: true })
      break
    case "網頁截圖":
      context.channel.messages.fetch(context.targetId).then(async (shoting) => {
        shoting = shoting.content
        if (
          !(shoting.startsWith("http://") || shoting.startsWith("https://"))
        ) {
          return context.reply({ content: "哞!這不是網址!", ephemeral: true })
        }
        context.deferReply()
        const result = await screenshot.screenshot(shoting)
        context.editReply({
          content: `哞!這是 \`${shoting}\` 的截圖:`,
          files: [result],
        })
      })
      break
  }
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
          content: "哞!我接到球了!",
          files: {
            name: "catch.png",
            data: "https://cowlinecdn.kiwichang.repl.co/ball/cow_catch.png",
          },
        },
        {
          content: "唉呦!好痛!",
          files: {
            name: "ko.png",
            data: "https://cowlinecdn.kiwichang.repl.co/ball/cow_ko.png",
          },
        },
        {
          content: "哞!我接到球了!\n我把球丟給你\n你沒接到,你看起來很痛的樣子",
          files: {
            name: "you_ko.png",
            data: "https://cowlinecdn.kiwichang.repl.co/ball/didi_ko.png",
          },
        },
      ]
      message.reply(balllist[ballnum])
      break
  }
})
setInterval(() => {
  timerDB.forEach((timer) => {
    if (timer.time <= moment()) {
      timer.send("哞!時間到!")
    }
  })
})
api.use((ctx) => {
  if (ctx.url != "/delay") return
  ctx.body = { delay: client.ws.ping }
})
api.listen(process.env.APIPort)
