module.exports = async (client,request,message)=>{
  message.channel.send('哞!你要我縮短哪個網址?')
  message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then((collected)=>{   
          const awaited = collected.first().content
          if (!(awaited.startsWith('http://')||awaited.startsWith('https://'))){return message.channel.send('哞!這不是網址!')}
          const datas = {
    url: 'https://mooshort.repl.co/api/create',
    form: {
        'url':awaited
    }
}    
          request.post(datas, (err, res, body) => {
    if (err) {
        return message.channel.send(`哞!發生錯誤!
錯誤內容:
\`\`\`
${err}
\`\`\``)
    }
            message.channel.send(`哞!你的短網址: \`${JSON.parse(body)['url']}\``)
        })
        })
}