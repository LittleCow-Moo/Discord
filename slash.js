//#region 定義
const request = require('request')
let suggContent4creThread
let Discord;
let Database;

var cpu
os.cpuUsage((v) => {cpu = v});
setInterval(()=>{os.cpuUsage((v) => {cpu = v});},1000)

var alphlist = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿']
if (typeof window !== "undefined") {
    Discord = DiscordJS;
    Database = EasyDatabase;
} else {
    Discord = require("discord.js");
    Database = require("easy-json-database");
}
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));  
function mathRandomInt(a, b) {
    if (a > b) {
        // Swap a and b to ensure a is smaller.
        var c = a;
        a = b;
        b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}
const s4d = {
    Discord,
    client: null,
    tokenInvalid: false,
    reply: null,
    joiningMember: null,
    database: new Database("./db.json"),
    checkMessageExists() {
        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
    }
};
s4d.client = new s4d.Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});
const {
    Permissions,
    MessageButton,
    MessageActionRow,
    MessageEmbed
} = require('discord.js');
var _E7_AC_91_E8_A9_B1_E5_BA_AB, coinnum, cointext, color;
_E7_AC_91_E8_A9_B1_E5_BA_AB = ['冰塊最想做什麼事?||退伍 因為他當冰很久了||', '有一天,我去吉野家,可是||吉野不在家||', '我走進眼科診所跟醫生抱怨說:「最近視力變差了,我需要配一副新眼鏡。」他||嘆了一口氣回說:「你真的病得不輕，我這裡可是甜甜圈店啊!」||', '有一隻狼寶寶不吃肉只吃素,狼媽媽、狼爸爸看得很擔心,某天,狼寶寶終於追著一隻兔子跑,牠們感到很欣慰,狼寶寶抓到兔子後說:||快把紅蘿蔔交出來!||', '天上的星星有多重?||8克,因為星巴克||', '有一天,小明去醫院量血壓,血壓計的語音說:血壓升高中，請注意...小明問醫生:為什麼會這樣?醫生回:這表示你的血壓...||國中畢業了。||', '第一個進船的要說什麼?||要說online,因為仙境傳說online||', '小魚問大魚說:你-喜-歡-吃-怎-樣-的-魚?大魚回:我喜歡吃講話慢的魚!小魚說:||醬紫先走||', '小明每次開可樂,瓶蓋都寫銘謝惠顧,有一天,他在考試,突然忘記銘要怎麼寫了,於是他打開桌上的可樂,||結果寫:再來一瓶||', '有一天,我和牛弟弟在吃草,弟弟問我:草是什麼味道?我回:草莓味。弟弟吃了一口草,生氣的說:這草明明沒有味道!我回:我沒有說錯啊...||我剛剛說草沒有味道,草沒味啊!||', '你知道學校的警衛每天早上都在笑什麼嗎？||校門口||'];
s4d.client.login('{Bot Token}').catch((e) => {
    s4d.tokenInvalid = true;
    s4d.tokenError = e;
});
function createThread4sugg(username,content,id){
  const url = `https://discord.com/api/v9/channels/{Suggest Channel ID}/messages/${id}/threads`;
  var payload = {
  	name: `${username}：${content}`
  };
    request.post(url, {
        body: JSON.stringify(payload),
        headers: {
      Authorization: `${s4d.client.user?.bot ? "Bot " : ""}${s4d.client.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
}
//#endregion
s4d.client.ws.on('INTERACTION_CREATE', async interaction => {
    const channel = interaction.channel_id
    try {
        console.log(`slash user id:${interaction.member.user.id}`)
    }
    catch(err){
        s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: '哞!我無法回覆在私訊的指令!',
                    flags: 64
                }
            }
        })  
        return 
    }
    if (s4d.client.channels.cache.get(channel)==undefined){
        s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: '哞!我無法回覆在討論串的指令!',
                    flags: 64
                }
            }
        })  
        return 
    }
    
  
  const sub = interaction.data.options[0].name
  const user = interaction.member.user.id
  /*if (s4d.client.channels.cache.get(channel).guild.id===null){
      return
  }*/
  const server = s4d.client.channels.cache.get(channel).guild.id
  if (interaction.data.name === 'cow'){ 
            // here you could do anything. in this sample
            // i reply with an api interaction
            
     //#region cannot
      try {     
      if (!s4d.client.channels.cache.get(channel).permissionsFor(s4d.client.guilds.cache.get(server).members.cache.get('836204711454834688')).has('VIEW_CHANNEL')){
       s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: '哞!我無法檢視你使用指令的頻道!',
                        flags: 64
                    }
                }
            })  
          return
      }
      if (!s4d.client.channels.cache.get(channel).permissionsFor(s4d.client.guilds.cache.get(server).members.cache.get('836204711454834688')).has('SEND_MESSAGES')){
       s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: '哞!我無法在你使用指令的頻道發送訊息!',
                        flags: 64
                    }
                }
            })  
          return
      }
          } catch (errrrrrrr){
               s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: '哞!我在檢查我的權限時發生了一些錯誤!',
                        flags: 64
                    }
                }
            })  
          return
           }
      //#endregion
//#region haha
if (sub==='haha'){
            s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: '哞!讓我想想...'
                    }
                }
            })
//await sleep(Number(0.3) * 1000);
setTimeout(function(){ 
s4d.client.channels.cache.get(channel).send(String('啊!我想到了!'));
s4d.client.channels.cache.get(channel).send((_E7_AC_91_E8_A9_B1_E5_BA_AB[(mathRandomInt(1, _E7_AC_91_E8_A9_B1_E5_BA_AB.length) - 1)]));
}, 3000);
                
        }
        //#endregion
 //#region help
        if (sub==='help'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: String((['哞!我是牛牛,一隻很簡單的機器牛。', '目前有下列功能:', '`/cow haha` :讓我為你說一句笑話!', '`/cow coin` :讓我陪你玩猜硬幣小遊戲!', '`/cow say` :讓我一字不差的學你說話!', '`/cow delay` :測測看我的延遲!', '`/cow invite` :把我邀請到你的伺服器!', '`/cow suggest` :告訴我你想到的新功能!', '`/cow poll` :讓我為你舉行一場投票!', '`/cow avatar` :好奇某人的頭貼長什麼樣子嗎?讓我來幫你看他的頭貼!', '`/cow time` :看看現在的時間!', '`/cow screenshot` :好奇某個網站什麼樣子嗎?讓我來幫你看它的樣子!', '`/cow shortlink` :縮短你的網址!', '敬請期待更多功能!哞~'].join('\n')))
            }
        }
    })
 }
 //#endregion
//#region invite
 if (sub==='invite'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: String((['哞!點這裡來邀請我到你的伺服器!', '\n', 'https://littlecow-moo.github.io/invite'].join('')))
            }
        }
    })
 }
 //#endregion
//#region time
 if (sub==='time'){
 s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: String((['哞!現在的時間是:<t:',Math.floor(+ new Date()/1000),':F>'].join('')))
            }
        }
    })
 }
 //#endregion
//#region coin
 if (sub==='coin'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: '哞!你要猜正面還是反面?'
            }
        }
    })
    //#region waiting msg
    coinnum = mathRandomInt(1, 2);
    (s4d.client.channels.cache.get(channel)).awaitMessages((m) => m.author.id === (user), {
        time: (5 * 60 * 1000),
        max: 1
    }).then(async (collected) => {
        s4d.reply = collected.first().content;
        if (coinnum == '1') {
            cointext = '正面';
            if ((s4d.reply) == '正' || (s4d.reply) == '正面') {
              
                s4d.client.channels.cache.get(channel).send(String('答對了!'));
                
            } else {
                s4d.client.channels.cache.get(channel).send(String((['錯了,是', cointext, '才對'].join(''))));
                
            }
        } else {
            cointext = '反面';
            if ((s4d.reply) == '反' || (s4d.reply) == '反面' || (s4d.reply) == '背面') {
              
                s4d.client.channels.cache.get(channel).send(String('答對了!'));
               
            } else {
              
                s4d.client.channels.cache.get(channel).send(String((['錯了,是', cointext, '才對'].join(''))));
                
            }
        }

        s4d.reply = null;
    }).catch(async (e) => {
        console.error(e);
        
        s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不跟你玩了!'));
      
    });
    //#endregion
  
 }
 //#endregion
//#region delay
 if (sub==='delay'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: String('哞!延遲是:' + s4d.client.ws.ping + 'ms')
            }
        }
    })
 }
 //#endregion
//#region say
 if (sub==='say'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: '哞!你要我說什麼?'
            }
        }
    })
    //#region wait msg
    s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
        time: (5 * 60 * 1000),
        max: 1
    }).then(async (collected) => {
        s4d.reply = collected.first().content;
        s4d.client.channels.cache.get(channel).send(String((s4d.reply)));

        s4d.reply = null;
    }).catch(async (e) => {
        console.error(e);
 s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
    });
    //#endregion
 }
 //#endregion
//#region poll
 if (sub==='poll'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: '哞!投票內容是什麼?'
            }
        }
    })
    //#region wait msg
    s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
        time: (5 * 60 * 1000),
        max: 1
    }).then(async (collected) => {
        s4d.reply = collected.first().content;
        	
        s4d.client.channels.cache.get(channel).send(String((s4d.reply))).then(async (s4dreply) => {
            s4dreply.react('👍');
            s4dreply.react('👎');

        });
       

        s4d.reply = null;
    }).catch(async (e) => {
        console.error(e);
 s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
    });
    //#endregion

 }
 //#endregion
//#region avatar
 if (sub==='avatar'){
     
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: '哞!你要我給你看誰的頭貼?請輸入他的ID!'
            }
        }
    })
    //#region wait msg
    s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
        time: (5 * 60 * 1000),
        max: 1
    }).then(async (collected) => {
        s4d.reply = collected.first().content;
        
 s4d.client.channels.cache.get(channel).send(String((['哞!這是 ', ((s4d.client.guilds.cache.get(server).members.cache.get((s4d.reply)) || await s4d.client.guilds.cache.get(server).members.fetch((s4d.reply)))).user.username, '#', ((s4d.client.guilds.cache.get(server).members.cache.get((s4d.reply)) || await s4d.client.guilds.cache.get(server).members.fetch((s4d.reply)))).user.discriminator, ' 的頭貼:'].join(''))));
 s4d.client.channels.cache.get(channel).send(String((((s4d.client.guilds.cache.get(server).members.cache.get((s4d.reply)) || await s4d.client.guilds.cache.get(server).members.fetch((s4d.reply)))).user.displayAvatarURL()))+'?size=4096');

        s4d.reply = null;
    }).catch(async (e) => {
        console.error(e);
 s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
    });
    //#endregion
}
//#endregion
//#region suggest
if (sub==='suggest'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: '哞!建議內容是什麼?'
            }
        }
    })
    //#region wait msg
    s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                s4d.reply = collected.first().content;
        suggContent4creThread = collected.first().content
                s4d.client.channels.cache.get('875529441147781130').send(String((['哞!', interaction.member.user.username, '傳來了建議!詳細資料如下:'].join(''))),{
                    embed: {
                        title: null,
                        color: '#FFE153',
                        image: {
                            url: null
                        },

                        description: ([interaction.member.user.username, ' (', user, ') ', '\n', '從伺服器 ', (s4d.client.guilds.cache.get(server) || {}).name, ' (', (server) || {}.id, ') 傳來了新建議:', '\n', s4d.reply].join('')),
                        footer: {
                            text: null
                        },
                        thumbnail: {
                            url: null
                        }

                    }
                })
        .then(message => createThread4sugg(interaction.member.user.username,suggContent4creThread,message.id))
                
                s4d.client.channels.cache.get(channel).send(String('哞!傳送成功!'));

                s4d.reply = null;
            }).catch(async (e) => {
                console.error(e);
                s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
            });
    //#endregion
}
//#endregion
//#region screenshot
if (sub==='screenshot'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: '哞!你要我給你看哪個網站的截圖?請輸入網址!'
            }
        }
    })
    //#region wait msg
    s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
        time: (5 * 60 * 1000),
        max: 1
    }).then(async (collected) => {
        s4d.reply = collected.first().content;
        if ((((s4d.reply) || '').startsWith('http://' || '')) || (((s4d.reply) || '').startsWith('https://' || ''))) {
            s4d.client.channels.cache.get(channel).send(String((['哞!這是`', s4d.reply, '`的截圖:'].join(''))));
            s4d.client.channels.cache.get(channel).send(String(('https://urlscan.io/liveshot/?width=1920&height=1080&url=' + encodeURIComponent(String(s4d.reply)))));
    
        } else {
            s4d.client.channels.cache.get(channel).send(String('哞!這不是網址!'));
        }

        s4d.reply = null;
    }).catch(async (e) => {
        console.error(e);
        s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
    });
    //#endregion
}
//#endregion
//#region custompoll
if (sub==='custompoll'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: '哞!投票內容是什麼?'
            }}})
            s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                let pollcontent = collected.first().content;
                s4d.client.channels.cache.get(channel).send(String('哞!投票選項有哪些?使用\`;\`分隔選項!'));;
                s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                s4d.reply = collected.first().content;
                const polloption = s4d.reply.split(';')
                if (polloption.length>20){
                s4d.client.channels.cache.get(channel).send(String('哞!太多選項了!'));
                    return
                }
                let pollemotes = []
                polloption.forEach((item,index)=>{
                    polloption[index]=`${alphlist[index]}-${item}`
                    pollemotes.push(alphlist[index])
                })           
                s4d.client.channels.cache.get(channel).send(`${pollcontent}\n${polloption.join('\n')}`).then(async (s4dreply) => {
                    pollemotes.forEach(item=>{
                         s4dreply.react(item)
					})             

                });

                s4d.reply = null;
            }).catch(async (e) => {
                console.error(e);
                s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
            });
                }).catch(async (e) => {
                console.error(e);
         s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
            });
}
//#endregion
//#region shortlink
if (sub==='shortlink'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: '哞!你要我縮短哪個網址?'
            }
        }
    })
    //#region wait msg
    s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
        time: (5 * 60 * 1000),
        max: 1
    }).then(async (collected) => {
        s4d.reply = collected.first().content;
        if ((((s4d.reply) || '').startsWith('http://' || '')) || (((s4d.reply) || '').startsWith('https://' || ''))) {

const options = {
url: 'https://mooshort.repl.co/api/create',
form: {
'url':s4d.reply
}
};
//var cowshortlink
          
request.post(options, (err, res, body) => {
if (err) {
return console.log(err);
}
console.log(JSON.parse(body)['url']);
cowshortlink=(JSON.parse(body)['url'])
s4d.client.channels.cache.get(channel).send({
                embeds: null,
                content: String(('哞!你的短網址: `' + String(cowshortlink)+'`'))
            });
});                          

        } else {
            s4d.client.channels.cache.get(channel).send({
                embeds: null,
                content: String('哞!這不是網址!')
            });
        }

        s4d.reply = null;
    }).catch(async (e) => {
        console.error(e);
        s4d.client.channels.cache.get(channel).send({
            embeds: null,
            content: String('哞!你不理我,不理你了!')
        });  
    });
    //#endregion
}
//#endregion
      //#region botinfo
      if (sub=='botinfo') {
const rendermsg = ['牛牛 v0.2.6']
rendermsg.push(`伺服器數量:\`${client.guilds.cache.size}\``)
rendermsg.push(`CPU使用量:\`${cpu.toString().slice(0,4)}%\``)
rendermsg.push(`已上線\`${Math.floor(s4d.client.uptime/1000)}秒\``)
rendermsg.push(`於<t:${Math.floor(client.readyTimestamp/1000)}:F>上線`)
                
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: rendermsg.join('\n')
            }
        }
    })
            }
//#region hey
if (sub==='hey'){
    s4d.client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: '哞!有什麼事嗎?'
            }
        }
    })
    //#region weird stuff
    s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
        time: (5 * 60 * 1000),
        max: 1
    }).then(async (collected) => {
        s4d.reply = collected.first().content;
        //coin
        if ((s4d.reply) == '猜硬幣' || (s4d.reply) == '猜硬幣!') {
         
    coinnum = mathRandomInt(1, 2);
    s4d.client.channels.cache.get(channel).send(String('哞!你要猜正面還是反面?'));
     
    s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
        time: (5 * 60 * 1000),
        max: 1
    }).then(async (collected) => {
        s4d.reply = collected.first().content;
        if (coinnum == '1') {
            cointext = '正面';
            if ((s4d.reply) == '正' || (s4d.reply) == '正面') {
             
                s4d.client.channels.cache.get(channel).send(String('答對了!'));
                 
            } else {
               
                s4d.client.channels.cache.get(channel).send(String((['錯了,是', cointext, '才對'].join(''))));
                 
            }
        } else {
            cointext = '反面';
            if ((s4d.reply) == '反' || (s4d.reply) == '反面' || (s4d.reply) == '背面') {
              
                s4d.client.channels.cache.get(channel).send(String('答對了!'));
                 
            } else {
               
                s4d.client.channels.cache.get(channel).send(String((['錯了,是', cointext, '才對'].join(''))));
                 
            }
        }

        s4d.reply = null;
    }).catch(async (e) => {
        console.error(e);
         
        s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不跟你玩了!'));
         
    });
}
        //coinend
        //hahastart
        if ((s4d.reply) == '說笑話!' || (s4d.reply) == '說笑話' || (s4d.reply) == '笑話' || (s4d.reply) == '笑話!') {
          s4d.client.channels.cache.get(channel).startTyping(1);
     await delay(Number(0.4) * 1000);
            s4d.client.channels.cache.get(channel).send(String('哞!讓我想想...'));
             
            setTimeout(function(){ 
s4d.client.channels.cache.get(channel).send(String('啊!我想到了!'));
s4d.client.channels.cache.get(channel).send((_E7_AC_91_E8_A9_B1_E5_BA_AB[(mathRandomInt(1, _E7_AC_91_E8_A9_B1_E5_BA_AB.length) - 1)]));
}, 3000);
        }
//haha end
        //ping start
        if ((s4d.reply) == '測延遲!' || (s4d.reply) == '測延遲' || (s4d.reply) == '延遲'|| '延遲!' == (s4d.reply)) {
        
            s4d.client.channels.cache.get(channel).send(String('哞!延遲是:' + s4d.client.ws.ping + 'ms'));
             
        }
        //ping end
        //say start
        if ('說話' == (s4d.reply) || '說' == (s4d.reply)|| '說!' == (s4d.reply)|| '說話!' == (s4d.reply) || '説話' == (s4d.reply) || '説' == (s4d.reply)|| '説!' == (s4d.reply)|| '説話!' == (s4d.reply)) {
          
        s4d.client.channels.cache.get(channel).send(String('哞!你要我說什麼?'));
         
        s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
             
            s4d.client.channels.cache.get(channel).send(String((s4d.reply)));
             

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
             
            s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
             
        });
    }
        //say end
        //ann start
        //ann end
        //poll start
        if ((s4d.reply) == '投票' || (s4d.reply) == '投票!') {
          
        s4d.client.channels.cache.get(channel).send(String('哞!投票內容是什麼?'));
         
        s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
             
            s4d.client.channels.cache.get(channel).send(String((s4d.reply))).then(async (s4dreply) => {
                s4dreply.react('👍');
                s4dreply.react('👎');

            });
             

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
             
            s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
             
        });
    }
        //poll end
        //custompoll start
        if ((s4d.reply) == '自訂投票' || (s4d.reply) == '自訂投票!') {
            s4d.client.channels.cache.get(channel).send(String('哞!投票內容是什麼?'));
            s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                let pollcontent = collected.first().content;
            s4d.client.channels.cache.get(channel).send(String('哞!投票選項有哪些?使用\`;\`分隔選項!'));
            s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                s4d.reply = collected.first().content;
                const polloption = s4d.reply.split(';')
                if (polloption.length>20){
                s4d.client.channels.cache.get(channel).send(String('哞!太多選項了!'));
                    return
                }
                let pollemotes = []
                polloption.forEach((item,index)=>{
                    polloption[index]=`${alphlist[index]}-${item}`
                    pollemotes.push(alphlist[index])
                })     
                s4d.client.channels.cache.get(channel).send(`${pollcontent}\n${polloption.join('\n')}`).then(async (s4dreply) => {
                    pollemotes.forEach(item=>{
                         s4dreply.react(item)
					})             

                });

                s4d.reply = null;
            }).catch(async (e) => {
                console.error(e);
                s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
            });
                }).catch(async (e) => {
                console.error(e);
                s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
            });
        }
        //custompoll end
        //sugg start
        if ((s4d.reply) == '建議!' || (s4d.reply) == '建議') {
         
        s4d.client.channels.cache.get(channel).send(String('哞!建議內容是什麼?'));
         
        s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            suggContent4creThread = collected.first().content
            s4d.client.channels.cache.get('875529441147781130').send(String((['哞!', interaction.member.user.username, '傳來了建議!詳細資料如下:'].join(''))),{
                embed: {
                    title: null,
                    color: '#FFE153',
                    image: {
                        url: null
                    },

                    description: ([interaction.member.user.username, ' (', user, ') ', '\n', '從伺服器 ', (s4d.client.guilds.cache.get(server) || {}).name, ' (', (s4d.client.guilds.cache.get(server) || {}).id, ') 傳來了新建議:', '\n', s4d.reply].join('')),
                    footer: {
                        text: null
                    },
                    thumbnail: {
                        url: null
                    }

                }
            })
            .then(message => createThread4sugg(interaction.member.user.username,suggContent4creThread,message.id))
            
           
            s4d.client.channels.cache.get(channel).send(String('哞!傳送成功!'));
             

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
             
            s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
             
        });
    }

        //sugg end
        //help start
         if ('幫助' == (s4d.reply) || '幫助!' == (s4d.reply)) {
           
        s4d.client.channels.cache.get(channel).send(String((['哞!我是牛牛,一隻很簡單的機器牛。', '目前有下列功能:', '`笑話` :讓我為你說一句笑話!', '`猜硬幣` :讓我陪你玩猜硬幣小遊戲!', '`說話` :讓我一字不差的學你說話!', '`延遲` :測測看我的延遲!', '`邀請` :把我邀請到你的伺服器!', '`建議` :告訴我你想到的新功能!', '`投票` :讓我為你舉行一場投票!', '`頭貼` :好奇某人的頭貼長什麼樣子嗎?讓我來幫你看他的頭貼!', '`時間` :看看現在的時間!', '`網頁截圖` :好奇某個網站什麼樣子嗎?讓我來幫你看它的樣子!', '`短網址` :縮短你的網址!', '敬請期待更多功能!哞~'].join('\n'))));
         
    }
        //help end
        //invite start
        if ((s4d.reply) == '邀請!' || (s4d.reply) == '邀請') {
          
        s4d.client.channels.cache.get(channel).send(String((['哞!點這裡來邀請我到你的伺服器!', '\n', 'https://cow-moomoomoo.github.io/invite'].join(''))));
         
    }
        //invite end
        //color start
        //color end
        //avatar start
        if ((s4d.reply) == '頭貼' || (s4d.reply) == '頭貼!' || (s4d.reply) == '看頭貼' || (s4d.reply) == '看頭貼!') {
         
        s4d.client.channels.cache.get(channel).send(String('哞!你要我給你看誰的頭貼?請輸入他的ID!'));
         
        s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            
            s4d.client.channels.cache.get(channel).send(String((['哞!這是 ', ((s4d.client.guilds.cache.get(server).members.cache.get((s4d.reply)) || await s4d.client.guilds.cache.get(server).members.fetch((s4d.reply)))).user.username, '#', ((s4d.client.guilds.cache.get(server).members.cache.get((s4d.reply)) || await s4d.client.guilds.cache.get(server).members.fetch((s4d.reply)))).user.discriminator, ' 的頭貼:'].join(''))));
            s4d.client.channels.cache.get(channel).send(String((((s4d.client.guilds.cache.get(server).members.cache.get((s4d.reply)) || await s4d.client.guilds.cache.get(server).members.fetch((s4d.reply)))).user.displayAvatarURL())));
             

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
             
            s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
             
        });
    }
//avatar end
//time start
if ((s4d.reply) == '時間' || (s4d.reply) == '時間!') {

            s4d.client.channels.cache.get(channel).send(String((['哞!現在的時間是:<t:',Math.floor(+ new Date()/1000),':F>'].join(''))));
             
        }
        //time end
        //botinfo
        if ((s4d.reply) == '機器人資訊' || (s4d.reply) == '機器人資訊!' || (s4d.reply) == '資訊!' || (s4d.reply) == '資訊') {
const rendermsg = ['牛牛 v0.2.6']
rendermsg.push(`伺服器數量:\`${s4d.client.guilds.cache.size}\``)
rendermsg.push(`CPU使用量:\`${cpu.toString().slice(0,4)}%\``)
rendermsg.push(`已上線\`${Math.floor(s4d.client.uptime/1000)}秒\``)
rendermsg.push(`於<t:${Math.floor(s4d.client.readyTimestamp/1000)}:F>上線`)
                s4d.client.channels.cache.get(channel).send(rendermsg.join('\n'))
            }
        //wss start
        if ((s4d.reply) == '網頁截圖' || (s4d.reply) == '網頁截圖!' || (s4d.reply) == '截圖!' || (s4d.reply) == '截圖') {
          
            s4d.client.channels.cache.get(channel).send(String('哞!你要我給你看哪個網站的截圖?請輸入網址!'));
             
            s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                s4d.reply = collected.first().content;
                if ((((s4d.reply) || '').startsWith('http://' || '')) || (((s4d.reply) || '').startsWith('https://' || ''))) {
                 
                    s4d.client.channels.cache.get(channel).send(String((['哞!這是`', s4d.reply, '`的截圖:'].join(''))));
                    s4d.client.channels.cache.get(channel).send(String(('https://urlscan.io/liveshot/?width=1920&height=1080&url=' + encodeURIComponent(String(s4d.reply)))));
             
                } else {
                    s4d.client.channels.cache.get(channel).send(String('哞!這不是網址!'));
             
                }

                s4d.reply = null;
            }).catch(async (e) => {
                console.error(e);
                 
                s4d.client.channels.cache.get(channel).send(String('哞!你不理我,不理你了!'));
             
            });
        }
        //wss end
        //shortlink start
        if ((s4d.reply) == '短網址' || (s4d.reply) == '短網址!' || (s4d.reply) == '短址!' || (s4d.reply) == '短址') {
         
                s4d.client.channels.cache.get(channel).send(String('哞!你要我縮短哪個網址?'));
          
             
                s4d.client.channels.cache.get(channel).awaitMessages((m) => m.author.id === user, {
                    time: (5 * 60 * 1000),
                    max: 1
                }).then(async (collected) => {
                    s4d.reply = collected.first().content;
                    if ((((s4d.reply) || '').startsWith('http://' || '')) || (((s4d.reply) || '').startsWith('https://' || ''))) {

const options = {
url: 'https://mooshort.repl.co/api/create',
form: {
    'url':s4d.reply
}
};
//var cowshortlink
                      
request.post(options, (err, res, body) => {
if (err) {
    return console.log(err);
}
console.log(JSON.parse(body)['url']);
cowshortlink=(JSON.parse(body)['url'])
s4d.client.channels.cache.get(channel).send({
                            embeds: null,
                            content: String(('哞!你的短網址: `' + String(cowshortlink)+'`'))
                        });
});                          
             
                    } else {
                        s4d.client.channels.cache.get(channel).send({
                            embeds: null,
                            content: String('哞!這不是網址!')
                        });
             
                    }

                    s4d.reply = null;
                }).catch(async (e) => {
                    console.error(e);
                   
                    s4d.client.channels.cache.get(channel).send({
                        embeds: null,
                        content: String('哞!你不理我,不理你了!')
                    });                      
             
                });
            }
            //shortlink end
        //trust me start
        
            //trust me end

        s4d.reply = null;
    }).catch(async (e) => {
        console.error(e);
         
        s4d.client.channels.cache.get(channel).send(String('哞!你不回我,不理你了!'));
         
    });
    //#endregion
}
//#endregion
return
}
  // 在這做一些事，下面是回復
console.log(interaction.channel_id)
  console.log(interaction.data.options[0].name)
  s4d.client.api.interactions(interaction.id, interaction.token).callback.post({data: {
  type: 4,
  data: {
    content: '哞!斜線指令正在開發中!\n敬請期待!'
  }
}})
})
s4d;