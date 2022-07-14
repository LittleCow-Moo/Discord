module.exports = async (client,Discord,minecraft,message)=>{
    message.channel.send('哞!你要我給你看哪個伺服器的資訊?請輸入`IP:連接埠`!')
  message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then(async (collected)=>{
            const awaited = collected.first().content
        const splited = awaited.split(':')
        const ip = splited[0]
        const port = splited[1]
        if (!ip||!port){return message.channel.send('哞!這不是IP!')}
        minecraft.statusBedrock({
            ip: ip,
            port: parseInt(port)
        })
        .then(async (result) => {
            const dataembed = new Discord.MessageEmbed()
            .addField('名稱', result.motd.clean[0]||"undef", true)
            .addField('玩家數', [result.players.online, '/', result.players.max||"undef"].join(''), true)
            .addField('模式', (result.gamemode||"undef"), true)
            .addField('版本', (result.version||"undef"), true)
            .addField('世界名稱', (result.map||"undef"), true)
            message.channel.send({content:`哞!這是 \`${ip}:${port}\` 的資訊:`,embeds:[dataembed]})
        })
        .catch((ayo)=>{
            return message.channel.send(`哞!這不是伺服器!\n\`\`\`${ayo}\`\`\``)
        })
    })
}