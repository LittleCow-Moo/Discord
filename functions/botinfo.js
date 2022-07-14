module.exports = async (client,so,cpu,moment,message)=>{
  const rendermsg = ['牛牛 v0.3.0']
rendermsg.push(`伺服器數量:\`${client.guilds.cache.size}\``)
rendermsg.push(`CPU型號:\`${so.cpus()[0].model}\``)
rendermsg.push(`CPU使用量:\`${cpu.toString().slice(0,4)}%\``)
let tempTime = moment.duration(client.uptime);
let y = `${tempTime.hours()}時${tempTime.minutes()}分${tempTime.seconds()}秒`;
rendermsg.push(`已上線\`${y}\``)
rendermsg.push(`於<t:${Math.floor(client.readyTimestamp/1000)}:F>上線`)
message.channel.send(rendermsg.join('\n'))
}