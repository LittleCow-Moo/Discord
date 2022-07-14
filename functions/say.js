module.exports = async (client,message)=>{
  message.channel.send('哞!你要我說什麼?')
  message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then((collected)=>{   
          const awaited = collected.first().content
          message.channel.send(awaited)
        })
}