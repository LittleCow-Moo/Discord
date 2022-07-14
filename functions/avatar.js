module.exports = async (client,message)=>{
  message.channel.send('哞!你要我給你看誰的頭貼?請輸入他的ID!')
  message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then(async (collected)=>{   
          const awaited = collected.first().content
          if (typeof client.users.cache.get(awaited)!='undefined'){
          message.channel.send({content:`哞!這是 \`${client.users.cache.get(awaited).tag}\` 的頭貼:`,
            files: [client.users.cache.get(awaited).displayAvatarURL({size:4096,format:"png"})]})
          } else {
            /*const tosend = `哞!這是 \`${await message.guild.members.fetch(awaited).user.username}#${await message.guild.members.fetch(awaited).user.discriminator}\` 的頭貼:`
            const avatarget = `${await message.guild.members.fetch(awaited).user.displayAvatarURL({dynamic:true})}?size=4096`
            message.channel.send({content:tosend,
            files: [avatarget]})*/
            message.channel.send(':flushed: 哞!發生錯誤!')
          }
        })
}