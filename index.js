const Discord = require('discord.js')
const moment = require('moment')
const request = require('request')
const koa = require('koa')
const api = new koa()
const os = require('os-utils')
const so = require('os')
const screenshot = require("discord-screenshot")
const minecraft = require('minecraft-server-status-simple')
const chalk = require('chalk')
const DiscordGame = require('discord-games-beta')
const game = new DiscordGame('Token', 'youtube', 2, {neverExpire: false})
const helpRow = require('./help')
var cpu
os.cpuUsage((v) => {cpu = v});
setInterval(()=>{os.cpuUsage((v) => {cpu = v});},1000)
process.on('uncaughtException', err => {
  console.error('偵測到錯誤', err)
})

const runFunc = (thingy)=>{
  if (thingy!='network') console.log(`${chalk.magenta("哞!")}已執行${thingy}指令!`)  
  return require(`./functions/${thingy}`)
}

const client = new Discord.Client({intents:['GUILDS','GUILD_MEMBERS','GUILD_MESSAGES'],ws:{properties:{$browser: "Discord iOS"}}})
client.login('Token')

const play = (toplay) => client.user.setPresence({ activities: [{ name: toplay}]})
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
const rnum = (a, b)=>{
    if (a > b) {
        // Swap a and b to ensure a is smaller.
        var c = a;
        a = b;
        b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

process.on('error',e=>{console.log(e)})

client.on('ready',async ()=>{
  console.clear()
  console.log(`${chalk.magenta("牛牛")} v0.3.0`)
  console.log(chalk.magenta(`
  █   █ ▀█▀ ▀█▀ █   █▀▀   █▀▀ █▀█ █ █ █
  █▄▄ █  █   █  █▄▄ ██▄   █▄▄ █▄█ ▀▄▀▄▀
  `))
  console.log(`${chalk.magenta("哞!")}已用 @${client.user.tag} 的身份登入!`)
  while (client.token){
    play('牛弟弟')
    await delay(15000)
    play('牛鄰居')
    await delay(15000)
    play('牛龜')
    await delay(15000)
    console.log(`${chalk.magenta("哞~")}狀態輪完一次了~`)
  }
})

client.on('messageCreate',async (message)=>{
  if (message.author.bot) return
    if (message.content == '🍀') return message.channel.send('謝謝!')
    if (message.content.toLowerCase() == 'never') return message.channel.send('gonna give you up')
    if (message.content == 'Hey,牛牛!' || message.content == 'hey,牛牛' || message.content == 'hey牛牛' || message.content == '<@!836204711454834688>' || message.content == '<@836204711454834688>'|| message.content == '/cow'|| message.content == '牛' || message.content == '牛牛' || message.content == ':cow:' || message.content == '🐮'){
      message.channel.send('哞!有什麼事嗎?')
        message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then((collected)=>{
            const awaited = collected.first().content.toLowerCase()
            console.log(awaited)
          
          if (awaited == '說笑話!' || awaited == '說笑話' || awaited == '笑話' || awaited == '笑話!'){
            runFunc('haha')(client,delay,rnum,message)
          }

          if (awaited == '猜硬幣' || awaited == '猜硬幣!'){
            runFunc('coin')(client,rnum,message)
          }        

          if ('說話' == awaited || '說' == awaited|| '說!' == awaited|| '說話!' == awaited || '説話' == awaited || '説' == awaited|| '説!' == awaited|| '説話!' == awaited){
            runFunc('say')(client,message)
          }

          if (awaited == '測延遲!' || awaited == '測延遲' || awaited == '延遲'|| '延遲!' == awaited){
            runFunc('delay')(client,message)
          }

      if (awaited == '邀請!' || awaited == '邀請'){
        runFunc('invite')(client,message)
      }

      if (awaited == '建議!' || awaited == '建議'){
        runFunc('suggest')(client,Discord,message)
      }

      if (awaited == '投票' || awaited == '投票!'){
        runFunc('poll')(client,message)
      }

      if (awaited == '自訂投票' || awaited == '自訂投票!'){
        runFunc('custompoll')(client,message)
      }

      if (awaited == '頭貼' || awaited == '頭貼!' || awaited == '看頭貼' || awaited == '看頭貼!'){
        runFunc('avatar')(client,message)
      }

          if (awaited == '時間' || awaited == '時間!'){
        runFunc('time')(client,message)
      }

          if (awaited == '網頁截圖' || awaited == '網頁截圖!' || awaited == '截圖!' || awaited == '截圖'){
            runFunc('screenshot')(client,screenshot,message)
          }

          if (awaited == '短網址' || awaited == '短網址!' || awaited == '短址!' || awaited == '短址'){
            runFunc('shortlink')(client,request,message)
          }

          if (awaited == '機器人資訊' || awaited == '機器人資訊!' || awaited == '資訊!' || awaited == '資訊'){
            runFunc('botinfo')(client,so,cpu,moment,message)
          }

          if (awaited == 'mc伺服/java'){
            runFunc('mcjava')(client,Discord,minecraft,message)
          }

          if (awaited == 'mc伺服/基岩'){
            runFunc('mcbedrock')(client,Discord,minecraft,message)
          }

          if (awaited == '一起看youtube!' || awaited == '一起看youtube' || awaited == '一起看yt' || awaited == 'youtube' || awaited == 'yt'){
            runFunc('youtube')(client,game,message)
          }

          if ('幫助' == awaited || '幫助!' == awaited){
            const help = new Discord.MessageEmbed()
            .setColor('#ff00a7')
            .setTitle('牛牛幫助')
            .setDescription('哞!我是牛牛,一隻很簡單的機器牛。\n目前有下列功能:')
            //#region old help
            /*.addField('笑話','為你說一句笑話!',true)
            .addField('猜硬幣','陪你玩猜硬幣小遊戲!',true)
            .addField('說話','讓我一字不差的學你說話!',true)
            .addField('建議','告訴我你想到的新功能!',true)
            .addField('投票','為你舉行一場投票!',true)
            .addField('自訂投票','為你舉行一場自訂選項的投票!',true)
            .addField('頭貼','放大看某人的頭貼!',true)
            .addField('時間','看看現在的時間!',true)
            .addField('網頁截圖','截圖某個網站!',true)
            .addField('短網址','縮短你的網址!',true)
            .addField('機器人資訊','查看關於我的資訊!',true)
            .addField('延遲','測測看我的延遲!',true)
            .addField('MC伺服/Java','查看關於某個Minecraft Java版伺服器的資訊!',true)
            .addField('MC伺服/基岩','查看關於某個Minecraft 基岩版伺服器的資訊!',true)
            .addField('一起看YouTube','和你的朋友一起看YouTube!',true)
            .setFooter('敬請期待更多功能!哞~')*/
            //#endregion
            .setThumbnail('https://cdn.discordapp.com/attachments/858984158620286998/982933401919184926/ec51f3aed0943f79239a05124e863dd5.webp')
            message.channel.send({embeds:[help],components:[helpRow]})
            //#region older help
            /*message.channel.send(['哞!我是牛牛,一隻很簡單的機器牛。', '目前有下列功能:', 
            '`笑話` :為你說一句笑話!', 
            '`猜硬幣` :陪你玩猜硬幣小遊戲!', 
            '`說話` :一字不差的學你說話!', 
            '`延遲` :測測看我的延遲!', 
            '`邀請` :把我邀請到你的伺服器!', 
            '`建議` :告訴我你想到的新功能!', 
            '`投票` :為你舉行一場投票!', 
            '`自訂投票` :為你舉行一場自訂選項的投票!', 
            '`頭貼` :好奇某人的頭貼長什麼樣子嗎?來幫你看他的頭貼!', 
            '`時間` :看看現在的時間!', 
            '`網頁截圖` :好奇某個網站什麼樣子嗎?來幫你看它的樣子!', 
            '`短網址` :縮短你的網址!', 
            '`機器人資訊` :查看關於我的資訊!', '敬請期待更多功能!哞~'].join('\n'))*/
            //#endregion
          }
    })
}
runFunc('network')(client,message)
})

client.on('interactionCreate', async context => {
  if (!context.isContextMenu) return
  switch (context.commandName){
    case "頭貼":
      if (typeof client.users.cache.get(context.targetId)!='undefined'){
      context.reply({content:`哞!這是 \`${client.users.cache.get(context.targetId).tag}\` 的頭貼:`,
      files: [`${client.users.cache.get(context.targetId).avatarURL({dynamic:true})}?size=4096`]})
      } else {
        context.reply(":flushed: 哞!我們目前還無法取得Nitro使用者的資訊!")
      }
    break;
    case "投票":
      context.channel.messages.fetch(context.targetId)
      .then(polling=>{
        context.channel.send(polling.content)
          .then(pollmsg=>{
            pollmsg.react('👍')
            pollmsg.react('👎')
          })   
      })
      context.reply({content:"哞!投票已傳送!",ephemeral:true})
    break;
    case "網頁截圖":
      context.channel.messages.fetch(context.targetId)
      .then(async shoting=>{
        shoting=shoting.content
          if (!(shoting.startsWith('http://')||shoting.startsWith('https://'))){return context.reply({content:'哞!這不是網址!',ephemeral:true})}
          context.deferReply()
          const result = await screenshot.screenshot(shoting)
          context.editReply({content:`哞!這是 \`${shoting}\` 的截圖:`,
            files: [result]})
        })
    break;
  }
})

api.use(ctx=>{
    switch(ctx.url){
        case '/delay':
            ctx.body = {delay:client.ws.ping}
            break;
    }
})
api.listen(3000) 