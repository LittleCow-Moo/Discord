module.exports = async (client,rnum,message)=>{
  message.channel.send('哞!你要猜正面還是反面?')
  const coinnum = rnum(1,2)
  message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1 })
        .then((collected)=>{         
          const awaited = collected.first().content
          if (coinnum==1&&(awaited=='正'||awaited=='正面')) return message.channel.send('答對了!')
          if (coinnum==1&&(awaited=='反'||awaited=='反面'||awaited=='背面')) return message.channel.send('錯了,是正面才對')
          if (coinnum==2&&(awaited=='反'||awaited=='反面'||awaited=='背面')) return message.channel.send('答對了!')
          if (coinnum==2&&(awaited=='正'||awaited=='正面')) return message.channel.send('錯了,是反面才對')
          message.channel.send(':flushed: 哞!我不知道你在指哪面!')
        })
}