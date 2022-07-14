const alphlist = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿']
module.exports = (client,message)=>{
  message.channel.send('哞!投票內容是什麼?')
  message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then((collecte)=>{   
          const pollmsg = collecte.first().content
          message.channel.send('哞!投票選項有哪些?使用\`;\`分隔選項!')
          message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then((collected)=>{
          const pollopt = collected.first().content.split(';')
                if (pollopt.length>20){
                cowmessage.channel.send('哞!太多選項了!')
                return
                }
                let pollemotes = []
                pollopt.forEach((item,index)=>{
            pollopt[index]=`${alphlist[index]}-${item}`
                    pollemotes.push(alphlist[index])
                })
                  message.channel.send(`${pollmsg}\n${pollopt.join('\n')}`).then(async (custompoll) => {
                    pollemotes.forEach(item=>{
                         custompoll.react(item)
					})             
          
        })
        })
})}