module.exports = (client,message)=>{
  message.channel.send('哞!投票內容是什麼?')
  message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then((collected)=>{   
          const awaited = collected.first().content
          message.channel.send(awaited)
          .then(pollmsg=>{
            pollmsg.react('👍')
            pollmsg.react('👎')
          })          
        })
}