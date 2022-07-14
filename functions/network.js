module.exports = async (client,message)=>{
  if (message.channel.name.startsWith('cow-network-')){
    if (message.author.id==client.user.id) return
    channels=client.channels.cache
    embed=message.embeds[0]
    attachment=message.attachments.first()
    current=message.channel
    channels.forEach((channel)=>{
        if (channel.name!=current.name) return
        if (!attachment){
            channel.send(`${message.author.username}:${message.content}`,{embed})
        } else {
            channel.send(`${message.author.username}:${message.content}`,{embed,files:[attachment]})
        }
    })
    message.delete()
    }
}