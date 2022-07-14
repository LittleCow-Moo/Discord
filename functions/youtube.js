module.exports = async (client,game,message)=>{
    message.channel.send('哞!我要在哪個頻道建立連結?')
    message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
    .then((collected)=>{
        const awaited = collected.first().mentions.channels.first()
        if(awaited.type!='GUILD_VOICE') return message.channel.send('哞!這不是語音頻道!')
        game.play(awaited).then(result => message.channel.send(`哞!點擊連結開始一起看YouTube! <${result.inviteLink}>`))
    })
}