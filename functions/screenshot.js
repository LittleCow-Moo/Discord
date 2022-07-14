module.exports = async (client,screenshot,message)=>{
  message.channel.send('哞!你要我給你看哪個網站的截圖?請輸入網址!')
  message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then(async (collected)=>{   
          const awaited = collected.first().content
          if (!(awaited.startsWith('http://')||awaited.startsWith('https://'))){return message.channel.send('哞!這不是網址!')}
          const result = await screenshot.screenshot(awaited)
          message.channel.send({content:`哞!這是 \`${awaited}\` 的截圖:`,
            files: [result]})
        })
}