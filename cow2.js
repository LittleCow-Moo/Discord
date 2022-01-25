const request = require('request');
let Discord;
let moment;
let suggContent4creThread
if (typeof window !== "undefined") {
    Discord = DiscordJS;
        moment = Momentl;
} else {
    Discord = require("discord.js");
    moment = require('moment');
} 
const {
    MessageButton,
    MessageActionRow,
    MessageMenu,
    MessageMenuOption
} = require("discord-buttons")

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
const s4d = {
    Discord,
    client: null,
    tokenInvalid: false,
    reply: null,
    joiningMember: null,
    checkMessageExists() {
        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
    }
};
s4d.client = new s4d.Discord.Client({
    fetchAllMembers: true,
    ws: { properties: { $browser: "Discord iOS" }}
     });
s4d.client.on('raw', async (packet) => {
    if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) {
        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
        if (!guild) return;
        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
        if (!member) return;
        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
        if (!channel) return;
        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
        if (!message) return;
        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
    }
});
var _E7_AC_91_E8_A9_B1_E5_BA_AB, coinnum, cointext, color;

function mathRandomInt(a, b) {
    if (a > b) {
        // Swap a and b to ensure a is smaller.
        var c = a;
        a = b;
        b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}


s4d.client.login('Removed').catch((e) => {
    s4d.tokenInvalid = true;
    s4d.tokenError = e;
});
function createThread4sugg(username,suscontent,id){
  const url = `https://discord.com/api/v9/channels/875529441147781130/messages/${id}/threads`;
  var payload = {
  	name: `${username}：${suscontent}`
  };
    request.post(url, {
        body: JSON.stringify(payload),
        headers: {
      Authorization: `${s4d.client.user?.bot ? "Bot " : ""}${s4d.client.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
}
s4d.client.on('ready', async () => {
    _E7_AC_91_E8_A9_B1_E5_BA_AB = ['冰塊最想做什麼事?||退伍 因為他當冰很久了||', '有一天,我去吉野家,可是||吉野不在家||', '我走進眼科診所跟醫生抱怨說:「最近視力變差了,我需要配一副新眼鏡。」他||嘆了一口氣回說:「你真的病得不輕，我這裡可是甜甜圈店啊!」||', '有一隻狼寶寶不吃肉只吃素,狼媽媽、狼爸爸看得很擔心,某天,狼寶寶終於追著一隻兔子跑,牠們感到很欣慰,狼寶寶抓到兔子後說:||快把紅蘿蔔交出來!||', '天上的星星有多重?||8克,因為星巴克||', '有一天,小明去醫院量血壓,血壓計的語音說:血壓升高中，請注意...小明問醫生:為什麼會這樣?醫生回:這表示你的血壓...||國中畢業了。||', '第一個進船的要說什麼?||要說online,因為仙境傳說online||', '小魚問大魚說:你-喜-歡-吃-怎-樣-的-魚?大魚回:我喜歡吃講話慢的魚!小魚說:||醬紫先走||', '小明每次開可樂,瓶蓋都寫銘謝惠顧,有一天,他在考試,突然忘記銘要怎麼寫了,於是他打開桌上的可樂,||結果寫:再來一瓶||', '有一天,我和牛弟弟在吃草,弟弟問我:草是什麼味道?我回:草莓味。弟弟吃了一口草,生氣的說:這草明明沒有味道!我回:我沒有說錯啊...||我剛剛說草沒有味道,草沒味啊!||', '你知道學校的警衛每天早上都在笑什麼嗎？||校門口||'];
    while (s4d.client && s4d.client.token) {
        await delay(50);
        s4d.client.user.setActivity(String('牛弟弟'));
        await delay(Number(1) * 15000);
        s4d.client.user.setActivity(String('牛鄰居'));
        await delay(Number(1) * 15000);
        s4d.client.user.setActivity(String('牛龜'));
        await delay(Number(1) * 15000);
        s4d.client.user.setActivity(String('牛肉麵'));
        await delay(Number(1) * 0);

        console.log('哞~狀態輪完一次了~')
    }
    while (s4d.client && s4d.client.token) {
        await delay(50);
        s4d.database.set(String('ping'), (s4d.client.ws.ping));
        console.log('哞~測完延遲了!延遲是:' + String(s4d.database.get(String('ping'))) + 'ms');
        await delay(Number(15) * 1000);
    }

});
//pulljoin start
s4d.client.on('guildCreate', async (s4dguild) => {
    s4d.client.channels.cache.get('879496612773240872').send(String(([
        [s4dguild.name, '     (', s4dguild.id, ')'].join(''), s4dguild.iconURL(), [(s4dguild.owner).user.username, '#', (s4dguild.owner).user.discriminator, '     (', (s4dguild.owner).user.id, ')'].join('')
    ].join('\n'))));
    s4d.client.channels.cache.get(mainchannel((s4d.client.guilds.cache.get((s4dguild.id))))).send(String('哞!我是牛牛~'));

});
//pulljoin end
s4d.client.on('message', async (s4dmessage) => {
  //autoreply start
//*if (((s4dmessage.content).slice(-1).charAt(0) == '嗎' || (s4dmessage.content).slice(-1).charAt(0) == '呢' || (s4dmessage.content).slice(-2).charAt(0) == '呢' || (s4dmessage.content).slice(-2).charAt(0) == '嗎') && ((s4dmessage.channel || {}).id) != '879496612773240872' && (s4dmessage.author.id) != '836204711454834688' && !((String((s4dmessage.content)).includes(String('87'))) || (String((s4dmessage.content)).includes(String('白癡'))) || (String((s4dmessage.content)).includes(String('共產黨'))) || (String((s4dmessage.content)).includes(String('💩'))) || (String((s4dmessage.content)).includes(String('甲賽'))) || (String((s4dmessage.content)).includes(String('你是'))) || (String((s4dmessage.content)).includes(String('黃腔'))))) {
  //          s4dmessage.channel.send(('哞!感覺可以喔,哞!絕對不要!,哞!這是個值得思考的問題。,哞!應該可以吧!,哞!當然!'.split(',')[(mathRandomInt(1, 5) - 1)]));
  //      }
//autoreply end
  //pullmsg start
        //pullmsg end
    //undo point
  //if (((s4dmessage.guild || {}).id) == '815623990793601065') {
 //           s4dmessage.react('<:Chrome_D:884423066824892466>');
  //      }
    if (((s4dmessage.channel || {}).id) == '873863515193090059') {
        (s4dmessage.member).setNickname((s4dmessage.content));
        s4dmessage.delete();
        s4d.client.channels.cache.get('873830415473999895').send(String((['<@', s4dmessage.author.id, '>'].join(''))));
    }
    //end
       if ((s4dmessage.content) == '🍀') {
         s4dmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
        (s4dmessage.channel).send(String('謝謝!'))
          s4dmessage.channel.stopTyping(true);
 }
    if ((s4dmessage.content) == 'Hey,牛牛!' || (s4dmessage.content) == 'hey,牛牛' || (s4dmessage.content) == 'hey牛牛' || (s4dmessage.content) == '<@!891581140031385613>' || (s4dmessage.content) == '<@891581140031385613>'|| (s4dmessage.content) == '/cow'|| (s4dmessage.content) == '牛' || (s4dmessage.content) == '牛牛' || (s4dmessage.content) == ':cow:' || (s4dmessage.content) == '🐮') {
         s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
        (s4dmessage.channel).send(String('哞!有什麼事嗎?'));
        s4dmessage.channel.stopTyping(true);
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            //coin
            if ((s4d.reply) == '猜硬幣' || (s4d.reply) == '猜硬幣!') {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.6) * 1000);
        coinnum = mathRandomInt(1, 2);
        (s4dmessage.channel).send(String('哞!你要猜正面還是反面?'));
        s4dmessage.channel.stopTyping(true);
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            if (coinnum == '1') {
                cointext = '正面';
                if ((s4d.reply) == '正' || (s4d.reply) == '正面') {
                  s4dmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                    s4dmessage.channel.send(String('答對了!'));
                    s4dmessage.channel.stopTyping(true);
                } else {
                  s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                    s4dmessage.channel.send(String((['錯了,是', cointext, '才對'].join(''))));
                    s4dmessage.channel.stopTyping(true);
                }
            } else {
                cointext = '反面';
                if ((s4d.reply) == '反' || (s4d.reply) == '反面' || (s4d.reply) == '背面') {
                  s4dmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                    s4dmessage.channel.send(String('答對了!'));
                    s4dmessage.channel.stopTyping(true);
                } else {
                  s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                    s4dmessage.channel.send(String((['錯了,是', cointext, '才對'].join(''))));
                    s4dmessage.channel.stopTyping(true);
                }
            }

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
            (s4dmessage.channel).send(String('哞!你不理我,不跟你玩了!'));
            s4dmessage.channel.stopTyping(true);
        });
    }
            //coinend
            //hahastart
            if ((s4d.reply) == '說笑話!' || (s4d.reply) == '說笑話' || (s4d.reply) == '笑話' || (s4d.reply) == '笑話!') {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                (s4dmessage.channel).send(String('哞!讓我想想...'));
                s4dmessage.channel.stopTyping(true);
                await delay(Number(3) * 1000);
                s4dmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                (s4dmessage.channel).send(String('啊!我想到了!'));
                (s4dmessage.channel).send((_E7_AC_91_E8_A9_B1_E5_BA_AB[(mathRandomInt(1, _E7_AC_91_E8_A9_B1_E5_BA_AB.length) - 1)]));
                s4dmessage.channel.stopTyping(true);
            }
//haha end
            //ping start
            if ((s4d.reply) == '測延遲!' || (s4d.reply) == '測延遲' || (s4d.reply) == '延遲'|| '延遲!' == (s4d.reply)) {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                (s4dmessage.channel).send(String('哞!延遲是:' + s4d.client.ws.ping + 'ms'));
                s4dmessage.channel.stopTyping(true);
            }
            //ping end
            //say start
            if ('說話' == (s4d.reply) || '說' == (s4d.reply)|| '說!' == (s4d.reply)|| '說話!' == (s4d.reply) || '説話' == (s4d.reply) || '説' == (s4d.reply)|| '説!' == (s4d.reply)|| '説話!' == (s4d.reply)) {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
            (s4dmessage.channel).send(String('哞!你要我說什麼?'));
            s4dmessage.channel.stopTyping(true);
            (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                s4d.reply = collected.first().content;
                s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                s4dmessage.channel.send(String((s4d.reply)));
                s4dmessage.channel.stopTyping(true);

                s4d.reply = null;
            }).catch(async (e) => {
                console.error(e);
                s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                s4dmessage.channel.send(String('哞!你不理我,不理你了!'));
                s4dmessage.channel.stopTyping(true);
            });
        }
            //say end
            //ann start
            //ann end
            //poll start
            if ((s4d.reply) == '投票' || (s4d.reply) == '投票!') {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
            (s4dmessage.channel).send(String('哞!投票內容是什麼?'));
            s4dmessage.channel.stopTyping(true);
            (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                s4d.reply = collected.first().content;
                s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                s4dmessage.channel.send(String((s4d.reply))).then(async (s4dreply) => {
                    s4dreply.react('👍');
                    s4dreply.react('👎');

                });
                s4dmessage.channel.stopTyping(true);

                s4d.reply = null;
            }).catch(async (e) => {
                console.error(e);
                s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                s4dmessage.channel.send(String('哞!你不理我,不理你了!'));
                s4dmessage.channel.stopTyping(true);
            });
        }
            //poll end
            //sugg start
            if ((s4d.reply) == '建議!' || (s4d.reply) == '建議') {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
            (s4dmessage.channel).send(String('哞!建議內容是什麼?'));
            s4dmessage.channel.stopTyping(true);
            (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                s4d.reply = collected.first().content;
                suggContent4creThread = collected.first().content
                s4d.client.channels.cache.get('875529441147781130').startTyping(1);
         await delay(Number(0.6) * 1000);
                s4d.client.channels.cache.get('875529441147781130').send(String((['哞!', s4dmessage.author.username, '傳來了建議!詳細資料如下:'].join(''))),{embed: {
                        title: null,
                        color: '#FFE153',
                        image: {
                            url: null
                        },

                        description: ([s4dmessage.author.username, ' (', s4dmessage.author.id, ') ', '\n', '從伺服器 ', (s4dmessage.guild || {}).name, ' (', (s4dmessage.guild || {}).id, ') 傳來了新建議:', '\n', s4d.reply].join('')),
                        footer: {
                            text: null
                        },
                        thumbnail: {
                            url: null
                        }

                    }
                })
                .then(message => createThread4sugg(s4dmessage.author.username,suggContent4creThread,message.id))
                s4d.client.channels.cache.get('875529441147781130').stopTyping(true);
                s4dmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                s4dmessage.channel.send(String('哞!傳送成功!'));
                s4dmessage.channel.stopTyping(true);

                s4d.reply = null;
            }).catch(async (e) => {
                console.error(e);
                s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                s4dmessage.channel.send(String('哞!你不理我,不理你了!'));
                s4dmessage.channel.stopTyping(true);
            });
        }

            //sugg end
            //help start
             if ('幫助' == (s4d.reply) || '幫助!' == (s4d.reply)) {
               s4dmessage.channel.startTyping(1);
         await delay(Number(0.8) * 1000);
            s4dmessage.channel.send(String((['哞!我是牛牛,一隻很簡單的機器牛。', '目前有下列功能:', '`笑話` :讓我為你說一句笑話!', '`猜硬幣` :讓我陪你玩猜硬幣小遊戲!', '`說話` :讓我一字不差的學你說話!', '`延遲` :測測看我的延遲!', '`邀請` :把我邀請到你的伺服器!', '`建議` :告訴我你想到的新功能!', '`投票` :讓我為你舉行一場投票!', '`頭貼` :好奇某人的頭貼長什麼樣子嗎?讓我來幫你看他的頭貼!', '`時間` :看看現在的時間!', '`網頁截圖` :好奇某個網站什麼樣子嗎?讓我來幫你看它的樣子!', '`短網址` :縮短你的網址!', '敬請期待更多功能!哞~'].join('\n'))));
            s4dmessage.channel.stopTyping(true);
        }
            //help end
            //invite start
            if ((s4d.reply) == '邀請!' || (s4d.reply) == '邀請') {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.6) * 1000);
            s4dmessage.channel.send(String((['哞!點這裡來邀請我到你的伺服器!', '\n', 'https://cow-moomoomoo.github.io/invite'].join(''))));
            s4dmessage.channel.stopTyping(true);
        }
            //invite end
            //color start
            //color end
            //avatar start
            if ((s4d.reply) == '頭貼' || (s4d.reply) == '頭貼!' || (s4d.reply) == '看頭貼' || (s4d.reply) == '看頭貼!') {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.7) * 1000);
            (s4dmessage.channel).send(String('哞!你要我給你看誰的頭貼?請輸入他的ID!'));
            s4dmessage.channel.stopTyping(true);
            (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                s4d.reply = collected.first().content;
                s4dmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                s4dmessage.channel.send(String((['哞!這是 ', (((s4dmessage.guild).members.cache.get((s4d.reply)) || await (s4dmessage.guild).members.fetch((s4d.reply)))).user.username, '#', (((s4dmessage.guild).members.cache.get((s4d.reply)) || await (s4dmessage.guild).members.fetch((s4d.reply)))).user.discriminator, ' 的頭貼:'].join(''))));
                s4dmessage.channel.send(String(((((s4dmessage.guild).members.cache.get((s4d.reply)) || await (s4dmessage.guild).members.fetch((s4d.reply)))).user.displayAvatarURL()))+'?size=4096');
                s4dmessage.channel.stopTyping(true);

                s4d.reply = null;
            }).catch(async (e) => {
                console.error(e);
                s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                s4dmessage.channel.send(String('哞!你不理我,不理你了!'));
                s4dmessage.channel.stopTyping(true);
            });
        }
//avatar end
//time start
if ((s4d.reply) == '時間' || (s4d.reply) == '時間!') {
 s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000); 
                s4dmessage.channel.send(String((['哞!現在的時間是:<t:',Math.floor(+ new Date()/1000),':F>'].join(''))));
                s4dmessage.channel.stopTyping(true);
            }
            //time end
            //wss start
            if ((s4d.reply) == '網頁截圖' || (s4d.reply) == '網頁截圖!' || (s4d.reply) == '截圖!' || (s4d.reply) == '截圖') {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.7) * 1000);
                (s4dmessage.channel).send(String('哞!你要我給你看哪個網站的截圖?請輸入網址!'));
                s4dmessage.channel.stopTyping(true);
                (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                    time: (5 * 60 * 1000),
                    max: 1
                }).then(async (collected) => {
                    s4d.reply = collected.first().content;
                    if ((((s4d.reply) || '').startsWith('http://' || '')) || (((s4d.reply) || '').startsWith('https://' || ''))) {
                      s4dmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                        s4dmessage.channel.send(String((['哞!這是`', s4d.reply, '`的截圖:'].join(''))));
                        s4dmessage.channel.send(String(('https://urlscan.io/liveshot/?width=1920&height=1080&url=' + encodeURIComponent(String(s4d.reply)))));
                s4dmessage.channel.stopTyping(true);
                    } else {
                      s4dmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                        s4dmessage.channel.send(String('哞!這不是網址!'));
                s4dmessage.channel.stopTyping(true);
                    }

                    s4d.reply = null;
                }).catch(async (e) => {
                    console.error(e);
                    s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                    s4dmessage.channel.send(String('哞!你不理我,不理你了!'));
                s4dmessage.channel.stopTyping(true);
                });
            }
            //wss end
            //shortlink start
            if ((s4d.reply) == '短網址' || (s4d.reply) == '短網址!' || (s4d.reply) == '短址!' || (s4d.reply) == '短址') {
              s4dmessage.channel.startTyping(1);
         await delay(Number(0.6) * 1000);
                    (s4dmessage.channel).send(String('哞!你要我縮短哪個網址?'));
              
                s4dmessage.channel.stopTyping(true);
                    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
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
                          
  s4dmessage.channel.startTyping(1);
        await  delay(Number(0.5) * 1000);
request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log(JSON.parse(body)['url']);
 cowshortlink=(JSON.parse(body)['url'])
  s4dmessage.channel.send({
                                embeds: null,
                                content: String(('哞!你的短網址: `' + String(cowshortlink)+'`'))
                            });
});                          
                s4dmessage.channel.stopTyping(true);
                        } else {
                          s4dmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                            s4dmessage.channel.send({
                                embeds: null,
                                content: String('哞!這不是網址!')
                            });
                s4dmessage.channel.stopTyping(true);
                        }

                        s4d.reply = null;
                    }).catch(async (e) => {
                        console.error(e);
                      s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                        s4dmessage.channel.send({
                            embeds: null,
                            content: String('哞!你不理我,不理你了!')
                        });                      
                s4dmessage.channel.stopTyping(true);
                    });
                }
                //shortlink end
            //trust me start
            
                //trust me end

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
            (s4dmessage.channel).send(String('哞!你不回我,不理你了!'));
            s4dmessage.channel.stopTyping(true);
        });
    }

});
//undo start
s4d.client.on('guildMemberAdd', async (param1) => {
    s4d.joiningMember = param1;
    if ((s4d.joiningMember.guild.id) == '871592803283660871') {
        if ((s4d.joiningMember).user.bot) {
            for (var count = 0; count < 10; count++) {
                (s4d.joiningMember).roles.remove((s4d.joiningMember).guild.roles.cache.find((role) => role.id === '871998225320652831' || role.name === '871998225320652831' || '@' + role.name === '871998225320652831'));
            }
            (s4d.joiningMember).setNickname('機器人');
        }
    }
    if ((s4d.joiningMember.guild.id) == '848141774119370774') {
        if ((s4d.joiningMember).user.bot) {
            for (var count = 0; count < 10; count++) {
                (s4d.joiningMember).roles.remove((s4d.joiningMember).guild.roles.cache.find((role) => role.id === '848392144514973696' || role.name === '848392144514973696' || '@' + role.name === '848392144514973696'));
                (s4d.joiningMember).roles.add((s4d.joiningMember).guild.roles.cache.find((role) => role.id === '848392779401920523' || role.name === '848392779401920523' || '@' + role.name === '848392779401920523'));
            }
            (s4d.joiningMember).setNickname('吐司');
        }
    }
if ((s4d.joiningMember.guild.id) == '858984157929144321') {
        if ((s4d.joiningMember).user.bot) {
            (s4d.joiningMember).roles.add((s4d.joiningMember).guild.roles.cache.find((role) => role.id === '859642245006622720' || role.name === '859642245006622720' || '@' + role.name === '859642245006622720'));
        } else {
            (s4d.joiningMember).roles.add((s4d.joiningMember).guild.roles.cache.find((role) => role.id === '858987687657340958' || role.name === '858987687657340958' || '@' + role.name === '858987687657340958'));
        }
    }
    //panadol
    if ((s4d.joiningMember.guild.id) == '870853300172521493') {
        if ((s4d.joiningMember).user.bot) {
            for (var count = 0; count < 10; count++) {
                (s4d.joiningMember).roles.remove((s4d.joiningMember).guild.roles.cache.find((role) => role.id === '870859641238724648' || role.name === '870859641238724648' || '@' + role.name === '870859641238724648'));
            }
            (s4d.joiningMember).roles.add((s4d.joiningMember).guild.roles.cache.find((role) => role.id === '870860380677763112' || role.name === '870860380677763112' || '@' + role.name === '870860380677763112'));
        }
    }
    //panadol end
    s4d.joiningMember = null
});
s4d.client.on('guildMemberRemove', async (param1) => {
    s4d.leavingMember = param1;
    if ((s4d.leavingMember.guild.id) == '871592803283660871') {
        (((s4d.leavingMember.guild).members.cache.get((s4d.leavingMember.id)) || await (s4d.leavingMember.guild).members.fetch((s4d.leavingMember.id)))).send(String('https://discord.gg/YB6rQaHcWp'));
    }
    s4d.leavingMember = null
});
//end
//buttons
//s4d.client.on('clickButton', async (button) => {
//    if ((button.id) == 'trustme') {
  //      await button.reply.send('https://imgur.com/QpL39fW', true)
 //   }



s4d;