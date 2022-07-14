module.exports = (client,message)=>{
  message.channel.send(`哞!延遲是:${client.ws.ping}ms`)
}