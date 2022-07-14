module.exports = async (client,message)=>{
  message.channel.send(`哞!現在的時間是:<t:${Math.floor(+ new Date()/1000)}:F>`)
}