module.exports = async (client,Discord,message)=>{
  message.channel.send('哞!建議內容是什麼?')
  message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then((collected)=>{   
          const awaited = collected.first().content
          const embed = new Discord.MessageEmbed()
          .setColor('#FFE153')
          .setDescription(`${message.author.username} (${message.author.id}) 
從伺服器 ${message.guild.name} (${message.guild.id}) 傳來了新建議:
${awaited}`)
          client.channels.cache.get('875529441147781130').send({
            content: `哞!${message.author.username}傳來了建議!詳細資料如下:`,
            embeds: [embed]
          })
          message.channel.send('哞!傳送成功!')
        })
}