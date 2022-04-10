//#region 最初始的設定
const request = require('request');
let Discord;
let moment;
let suggContent4creThread
const koa = require('koa')
const api = new koa()
const os = require('os-utils')
const so = require('os')
var alphlist = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿']
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
const disbut = require('discord-buttons')

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
const mgr = {
    reply: null,
    joiningMember: null,
    checkMessageExists() {
        if (!client) throw new Error('You cannot perform message operations without a Discord.js client')
        if (!client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
    }
};
const client = new Discord.Client({
    fetchAllMembers: true,
    ws: { properties: { $browser: "Discord iOS" }}
     });
disbut(client)

var cpu
os.cpuUsage((v) => {cpu = v});
setInterval(()=>{os.cpuUsage((v) => {cpu = v});},1000)

const webhook = new Discord.WebhookClient('{Webhook ID}', '{Webhook Token}');
client.on('raw', async (packet) => {
    if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) {
        const guild = client.guilds.cache.get(packet.d.guild_id);
        if (!guild) return;
        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
        if (!member) return;
        const channel = client.channels.cache.get(packet.d.channel_id);
        if (!channel) return;
        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
        if (!message) return;
        client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
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


client.login('{Bot Token}').catch((e) => {
    tokenInvalid = true;
    tokenError = e;
});
//#endregion
//#region 建議的討論串
function createThread4sugg(username,content,id){
  const url = `https://discord.com/api/v9/channels/{Suggest Channel ID}/messages/${id}/threads`;
  var payload = {
  	name: `${username}：${content}`
  };
    request.post(url, {
        body: JSON.stringify(payload),
        headers: {
      Authorization: `${client.user?.bot ? "Bot " : ""}${client.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
}
//#endregion
client.on('ready', async () => {
    //#region 初始設定&執行其他機器人
    require('./slash.js')
    require('./music.js')
    _E7_AC_91_E8_A9_B1_E5_BA_AB = ['冰塊最想做什麼事?||退伍 因為他當冰很久了||', '有一天,我去吉野家,可是||吉野不在家||', '我走進眼科診所跟醫生抱怨說:「最近視力變差了,我需要配一副新眼鏡。」他||嘆了一口氣回說:「你真的病得不輕，我這裡可是甜甜圈店啊!」||', '有一隻狼寶寶不吃肉只吃素,狼媽媽、狼爸爸看得很擔心,某天,狼寶寶終於追著一隻兔子跑,牠們感到很欣慰,狼寶寶抓到兔子後說:||快把紅蘿蔔交出來!||', '天上的星星有多重?||8克,因為星巴克||', '有一天,小明去醫院量血壓,血壓計的語音說:血壓升高中，請注意...小明問醫生:為什麼會這樣?醫生回:這表示你的血壓...||國中畢業了。||', '第一個進船的要說什麼?||要說online,因為仙境傳說online||', '小魚問大魚說:你-喜-歡-吃-怎-樣-的-魚?大魚回:我喜歡吃講話慢的魚!小魚說:||醬紫先走||', '小明每次開可樂,瓶蓋都寫銘謝惠顧,有一天,他在考試,突然忘記銘要怎麼寫了,於是他打開桌上的可樂,||結果寫:再來一瓶||', '有一天,我和牛弟弟在吃草,弟弟問我:草是什麼味道?我回:草莓味。弟弟吃了一口草,生氣的說:這草明明沒有味道!我回:我沒有說錯啊...||我剛剛說草沒有味道,草沒味啊!||', '你知道學校的警衛每天早上都在笑什麼嗎？||校門口||'];
    //#endregion
    while (client) {
        //#region 狀態
        await delay(50);
        client.user.setActivity(String('牛弟弟'));
        await delay(Number(1) * 15000);
        client.user.setActivity(String('牛鄰居'));
        await delay(Number(1) * 15000);
        client.user.setActivity(String('牛龜'));
        await delay(Number(1) * 15000);
        client.user.setActivity(String('牛肉麵'));
        await delay(Number(1) * 0);

        console.log('哞~狀態輪完一次了~')
        //#endregion
    }

});
//#region 加入紀錄
client.on('guildCreate', async (cowguild) => {
    client.channels.cache.get('{Join Log Channel}').send(String(([
        [cowguild.name, '     (', cowguild.id, ')'].join(''), cowguild.iconURL(), [(cowguild.owner).user.username, '#', (cowguild.owner).user.discriminator, '     (', (cowguild.owner).user.id, ')'].join('')
    ].join('\n'))));
    client.channels.cache.get(mainchannel((client.guilds.cache.get((cowguild.id))))).send(String('哞!我是牛牛~'));

});
//#endregion
client.on('message', async (cowmessage) => {
    //#region 跨群
    if (cowmessage.channel.name.startsWith('{Cross Server ID}')){
    if (cowmessage.author.id==client.user.id) return
    channels=client.channels.cache
    embed=cowmessage.embeds[0]
    attachment=cowmessage.attachments.first()
    console.log(attachment)
    current=cowmessage.channel
    channels.forEach((channel)=>{
        if (channel.name!=current.name) return
        if (!attachment){
            channel.send(`${cowmessage.author.username}:${cowmessage.content}`,{embed})
        } else {
            channel.send(`${cowmessage.author.username}:${cowmessage.content}`,{embed,files:[attachment]})
        }
    })
    cowmessage.delete()
    }
    //#endregion
    //#region 吃草
       if ((cowmessage.content) == '🍀') {
         cowmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
        (cowmessage.channel).send(String('謝謝!'))
          webhook.send(`\`\`\`${cowmessage.member.user.username}#${cowmessage.member.user.discriminator}餵我吃草\`\`\``)
          cowmessage.channel.stopTyping(true);
 }
 //#endregion
    if ((cowmessage.content) == 'Hey,牛牛!' || (cowmessage.content) == 'hey,牛牛' || (cowmessage.content) == 'hey牛牛' || (cowmessage.content) == '<@!836204711454834688>' || (cowmessage.content) == '<@836204711454834688>'|| (cowmessage.content) == '/cow'|| (cowmessage.content) == '牛' || (cowmessage.content) == '牛牛' || (cowmessage.content) == ':cow:' || (cowmessage.content) == '🐮') {
         cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
        (cowmessage.channel).send(String('哞!有什麼事嗎?'));
        webhook.send(`\`\`\`${cowmessage.member.user.username}#${cowmessage.member.user.discriminator}使用 ${cowmessage.content} 呼叫我\`\`\``)
        cowmessage.channel.stopTyping(true);
        (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            mgr.reply = collected.first().content;
            //#region 猜硬幣
            if ((mgr.reply) == '猜硬幣' || (mgr.reply) == '猜硬幣!') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.6) * 1000);
        coinnum = mathRandomInt(1, 2);
        (cowmessage.channel).send(String('哞!你要猜正面還是反面?'));
                webhook.send(`\`\`\`${cowmessage.member.user.username}#${cowmessage.member.user.discriminator}想玩猜硬幣\`\`\``)
        cowmessage.channel.stopTyping(true);
        (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            mgr.reply = collected.first().content;
            if (coinnum == '1') {
                cointext = '正面';
                if ((mgr.reply) == '正' || (mgr.reply) == '正面') {
                  cowmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                    cowmessage.channel.send(String('答對了!'));
              webhook.send(`\`\`\`${cowmessage.member.user.username}#${cowmessage.member.user.discriminator}玩猜硬幣,他回答正面,答對了\`\`\``)
                    cowmessage.channel.stopTyping(true);
                } else {
                  cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                    cowmessage.channel.send(String((['錯了,是', cointext, '才對'].join(''))));                  webhook.send(`\`\`\`${cowmessage.member.user.username}#${cowmessage.member.user.discriminator}玩猜硬幣,他回答正面,答錯了\`\`\``)
                    cowmessage.channel.stopTyping(true);
                }
            } else {
                cointext = '反面';
                if ((mgr.reply) == '反' || (mgr.reply) == '反面' || (mgr.reply) == '背面') {
                  cowmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                    cowmessage.channel.send(String('答對了!'));
              webhook.send(`\`\`\`${cowmessage.member.user.username}#${cowmessage.member.user.discriminator}玩猜硬幣,他回答反面,答對了\`\`\``)
                    cowmessage.channel.stopTyping(true);
                } else {
                  cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                    cowmessage.channel.send(String((['錯了,是', cointext, '才對'].join(''))));
              webhook.send(`\`\`\`${cowmessage.member.user.username}#${cowmessage.member.user.discriminator}玩猜硬幣,他回答反面,答錯了\`\`\``)
                    cowmessage.channel.stopTyping(true);
                }
            }

            mgr.reply = null;
        }).catch(async (e) => {
            console.error(e);
            cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
            (cowmessage.channel).send(String('哞!你不理我,不跟你玩了!'));
            webhook.send(`\`\`\`${cowmessage.member.user.username}#${cowmessage.member.user.discriminator}不跟我玩猜硬幣\`\`\``)
            cowmessage.channel.stopTyping(true);
        });
    }
            //#endregion
            //#region 笑話
            if ((mgr.reply) == '說笑話!' || (mgr.reply) == '說笑話' || (mgr.reply) == '笑話' || (mgr.reply) == '笑話!') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                (cowmessage.channel).send(String('哞!讓我想想...'));
                cowmessage.channel.stopTyping(true);
                await delay(Number(3) * 1000);
                cowmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                (cowmessage.channel).send(String('啊!我想到了!'));
                (cowmessage.channel).send((_E7_AC_91_E8_A9_B1_E5_BA_AB[(mathRandomInt(1, _E7_AC_91_E8_A9_B1_E5_BA_AB.length) - 1)]));
                cowmessage.channel.stopTyping(true);
            }
//#endregion
            //#region 延遲
            if ((mgr.reply) == '測延遲!' || (mgr.reply) == '測延遲' || (mgr.reply) == '延遲'|| '延遲!' == (mgr.reply)) {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                (cowmessage.channel).send(String('哞!延遲是:' + client.ws.ping + 'ms'));
                cowmessage.channel.stopTyping(true);
            }
            //#endregion
            //#region 說話
            if ('說話' == (mgr.reply) || '說' == (mgr.reply)|| '說!' == (mgr.reply)|| '說話!' == (mgr.reply) || '説話' == (mgr.reply) || '説' == (mgr.reply)|| '説!' == (mgr.reply)|| '説話!' == (mgr.reply)) {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
            (cowmessage.channel).send(String('哞!你要我說什麼?'));
            cowmessage.channel.stopTyping(true);
            (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                mgr.reply = collected.first().content;
                cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                cowmessage.channel.send(String((mgr.reply)));
                cowmessage.channel.stopTyping(true);

                mgr.reply = null;
            }).catch(async (e) => {
                console.error(e);
                cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                cowmessage.channel.send(String('哞!你不理我,不理你了!'));
                cowmessage.channel.stopTyping(true);
            });
        }
            //#endregion
            //#region 投票
            if ((mgr.reply) == '投票' || (mgr.reply) == '投票!') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
            (cowmessage.channel).send(String('哞!投票內容是什麼?'));
            cowmessage.channel.stopTyping(true);
            (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                mgr.reply = collected.first().content;
                cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                cowmessage.channel.send(String((mgr.reply))).then(async (cowreply) => {
                    cowreply.react('👍');
                    cowreply.react('👎');

                });
                cowmessage.channel.stopTyping(true);

                mgr.reply = null;
            }).catch(async (e) => {
                console.error(e);
                cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                cowmessage.channel.send(String('哞!你不理我,不理你了!'));
                cowmessage.channel.stopTyping(true);
            });
        }
            //#endregion
            //#region 建議
            if ((mgr.reply) == '建議!' || (mgr.reply) == '建議') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
            (cowmessage.channel).send(String('哞!建議內容是什麼?'));
            cowmessage.channel.stopTyping(true);
            (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                mgr.reply = collected.first().content;
                suggContent4creThread = collected.first().content
                client.channels.cache.get('{Suggest Channel ID}').startTyping(1);
         await delay(Number(0.6) * 1000);
                client.channels.cache.get('{Suggest Channel ID}').send(String((['哞!', cowmessage.author.username, '傳來了建議!詳細資料如下:'].join(''))),{embed: {
                        title: null,
                        color: '#FFE153',
                        image: {
                            url: null
                        },

                        description: ([cowmessage.author.username, ' (', cowmessage.author.id, ') ', '\n', '從伺服器 ', (cowmessage.guild || {}).name, ' (', (cowmessage.guild || {}).id, ') 傳來了新建議:', '\n', mgr.reply].join('')),
                        footer: {
                            text: null
                        },
                        thumbnail: {
                            url: null
                        }

                    }
                })
                .then(message => createThread4sugg(cowmessage.author.username,suggContent4creThread,message.id))
                client.channels.cache.get('{Suggest Channel ID}').stopTyping(true);		
                cowmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                cowmessage.channel.send(String('哞!傳送成功!'));
                cowmessage.channel.stopTyping(true);

                mgr.reply = null;
            }).catch(async (e) => {
                console.error(e);
                cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                cowmessage.channel.send(String('哞!你不理我,不理你了!'));
                cowmessage.channel.stopTyping(true);
            });
        }

            //#endregion
            //#region 幫助
             if ('幫助' == (mgr.reply) || '幫助!' == (mgr.reply)) {
               cowmessage.channel.startTyping(1);
         await delay(Number(0.8) * 1000);
            cowmessage.channel.send(String((['哞!我是牛牛,一隻很簡單的機器牛。', '目前有下列功能:', '`笑話` :讓我為你說一句笑話!', '`猜硬幣` :讓我陪你玩猜硬幣小遊戲!', '`說話` :讓我一字不差的學你說話!', '`延遲` :測測看我的延遲!', '`邀請` :把我邀請到你的伺服器!', '`建議` :告訴我你想到的新功能!', '`投票` :讓我為你舉行一場投票!', '`自訂投票` :讓我為你舉行一場自訂選項的投票!', '`頭貼` :好奇某人的頭貼長什麼樣子嗎?讓我來幫你看他的頭貼!', '`時間` :看看現在的時間!', '`網頁截圖` :好奇某個網站什麼樣子嗎?讓我來幫你看它的樣子!', '`短網址` :縮短你的網址!', '`機器人資訊` :查看關於我的資訊!', '敬請期待更多功能!哞~'].join('\n'))));
            cowmessage.channel.stopTyping(true);
        }
            //#endregion
            //#region 邀請
            if ((mgr.reply) == '邀請!' || (mgr.reply) == '邀請') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.6) * 1000);
            cowmessage.channel.send(String((['哞!點這裡來邀請我到你的伺服器!', '\n', 'https://cow.c-moo.cf/invite'].join(''))));
            cowmessage.channel.stopTyping(true);
        }
            //#endregion
            //#region 頭貼
            if ((mgr.reply) == '頭貼' || (mgr.reply) == '頭貼!' || (mgr.reply) == '看頭貼' || (mgr.reply) == '看頭貼!') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.7) * 1000);
            (cowmessage.channel).send(String('哞!你要我給你看誰的頭貼?請輸入他的ID!'));
            cowmessage.channel.stopTyping(true);
            (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                mgr.reply = collected.first().content;
                cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                cowmessage.channel.send(String((['哞!這是 ', (((cowmessage.guild).members.cache.get((mgr.reply)) || await (cowmessage.guild).members.fetch((mgr.reply)))).user.username, '#', (((cowmessage.guild).members.cache.get((mgr.reply)) || await (cowmessage.guild).members.fetch((mgr.reply)))).user.discriminator, ' 的頭貼:'].join(''))));
                cowmessage.channel.send(String(((((cowmessage.guild).members.cache.get((mgr.reply)) || await (cowmessage.guild).members.fetch((mgr.reply)))).user.displayAvatarURL()))+'?size=4096');
                cowmessage.channel.stopTyping(true);

                mgr.reply = null;
            }).catch(async (e) => {
                console.error(e);
                cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                cowmessage.channel.send(String('哞!你不理我,不理你了!'));
                cowmessage.channel.stopTyping(true);
            });
        }
//#endregion
            //#region 時間
if ((mgr.reply) == '時間' || (mgr.reply) == '時間!') {
 cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000); 
                cowmessage.channel.send(String((['哞!現在的時間是:<t:',Math.floor(+ new Date()/1000),':F>'].join(''))));
                cowmessage.channel.stopTyping(true);
            }
            //#endregion
            //#region 網頁截圖
            if ((mgr.reply) == '網頁截圖' || (mgr.reply) == '網頁截圖!' || (mgr.reply) == '截圖!' || (mgr.reply) == '截圖') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.7) * 1000);
                (cowmessage.channel).send(String('哞!你要我給你看哪個網站的截圖?請輸入網址!'));
                cowmessage.channel.stopTyping(true);
                (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
                    time: (5 * 60 * 1000),
                    max: 1
                }).then(async (collected) => {
                    mgr.reply = collected.first().content;
                    if ((((mgr.reply) || '').startsWith('http://' || '')) || (((mgr.reply) || '').startsWith('https://' || ''))) {
                      cowmessage.channel.startTyping(1);
         await delay(Number(0.3) * 1000);
                        cowmessage.channel.send(String((['哞!這是`', mgr.reply, '`的截圖:'].join(''))));
                        cowmessage.channel.send(String(('https://urlscan.io/liveshot/?width=1920&height=1080&url=' + encodeURIComponent(String(mgr.reply)))));
                cowmessage.channel.stopTyping(true);
                    } else {
                      cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                        cowmessage.channel.send(String('哞!這不是網址!'));
                cowmessage.channel.stopTyping(true);
                    }

                    mgr.reply = null;
                }).catch(async (e) => {
                    console.error(e);
                    cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                    cowmessage.channel.send(String('哞!你不理我,不理你了!'));
                cowmessage.channel.stopTyping(true);
                });
            }
            //#endregion
            //#region 短網址
            if ((mgr.reply) == '短網址' || (mgr.reply) == '短網址!' || (mgr.reply) == '短址!' || (mgr.reply) == '短址') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.6) * 1000);
                    (cowmessage.channel).send(String('哞!你要我縮短哪個網址?'));
              
                cowmessage.channel.stopTyping(true);
                    (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
                        time: (5 * 60 * 1000),
                        max: 1
                    }).then(async (collected) => {
                        mgr.reply = collected.first().content;
                        if ((((mgr.reply) || '').startsWith('http://' || '')) || (((mgr.reply) || '').startsWith('https://' || ''))) {

const options = {
    url: 'https://mooshort.repl.co/api/create',
    form: {
        'url':mgr.reply
    }
};
//var cowshortlink
                          
  cowmessage.channel.startTyping(1);
        await  delay(Number(0.5) * 1000);
request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log(JSON.parse(body)['url']);
 cowshortlink=(JSON.parse(body)['url'])
  cowmessage.channel.send({
                                embeds: null,
                                content: String(('哞!你的短網址: `' + String(cowshortlink)+'`'))
                            });
});                          
                cowmessage.channel.stopTyping(true);
                        } else {
                          cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
                            cowmessage.channel.send({
                                embeds: null,
                                content: String('哞!這不是網址!')
                            });
                cowmessage.channel.stopTyping(true);
                        }

                        mgr.reply = null;
                    }).catch(async (e) => {
                        console.error(e);
                      cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                        cowmessage.channel.send({
                            embeds: null,
                            content: String('哞!你不理我,不理你了!')
                        });                      
                cowmessage.channel.stopTyping(true);
                    });
                }
                //#endregion
            //#region 自訂投票
            if ((mgr.reply) == '自訂投票' || (mgr.reply) == '自訂投票!') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
            (cowmessage.channel).send(String('哞!投票內容是什麼?'));
            cowmessage.channel.stopTyping(true);
            (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                let pollcontent = collected.first().content;
                cowmessage.channel.startTyping(1);
         await delay(Number(0.4) * 1000);
            (cowmessage.channel).send(String('哞!投票選項有哪些?使用\`;\`分隔選項!'));
            cowmessage.channel.stopTyping(true);
            (cowmessage.channel).awaitMessages((m) => m.author.id === (cowmessage.member).id, {
                time: (5 * 60 * 1000),
                max: 1
            }).then(async (collected) => {
                mgr.reply = collected.first().content;
                const polloption = mgr.reply.split(';')
                if (polloption.length>20){
                    cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                cowmessage.channel.send(String('哞!太多選項了!'));
                cowmessage.channel.stopTyping(true);
                    return
                }
                let pollemotes = []
                polloption.forEach((item,index)=>{
                    polloption[index]=`${alphlist[index]}-${item}`
                    pollemotes.push(alphlist[index])
                })
                cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);            
                cowmessage.channel.send(`${pollcontent}\n${polloption.join('\n')}`).then(async (cowreply) => {
                    pollemotes.forEach(item=>{
                         cowreply.react(item)
					})             

                });
                cowmessage.channel.stopTyping(true);

                mgr.reply = null;
            }).catch(async (e) => {
                console.error(e);
                cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                cowmessage.channel.send(String('哞!你不理我,不理你了!'));
                cowmessage.channel.stopTyping(true);
            });
                }).catch(async (e) => {
                console.error(e);
                cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
                cowmessage.channel.send(String('哞!你不理我,不理你了!'));
                cowmessage.channel.stopTyping(true);
            });
        }
            //#endregion
               
            //#region 機器人資訊
            if ((mgr.reply) == '機器人資訊' || (mgr.reply) == '機器人資訊!' || (mgr.reply) == '資訊!' || (mgr.reply) == '資訊') {
              cowmessage.channel.startTyping(1);
         await delay(Number(0.9) * 1000);
const rendermsg = ['牛牛 v0.2.6']
rendermsg.push(`伺服器數量:\`${client.guilds.cache.size}\``)
rendermsg.push(`CPU型號:\`${so.cpus()[0].model}\``)
rendermsg.push(`CPU使用量:\`${cpu.toString().slice(0,4)}%\``)
rendermsg.push(`已上線\`${Math.floor(client.uptime/1000)}秒\``)
rendermsg.push(`於<t:${Math.floor(client.readyTimestamp/1000)}:F>上線`)
                cowmessage.channel.send(rendermsg.join('\n'))
                cowmessage.channel.stopTyping(true);
            }
                //#endregion
            
            mgr.reply = null;
        }).catch(async (e) => {
            console.error(e);
            cowmessage.channel.startTyping(1);
         await delay(Number(0.5) * 1000);
            (cowmessage.channel).send(String('哞!你不回我,不理你了!'));
            cowmessage.channel.stopTyping(true);
        });
    }

});
//#region API
api.use(req=>{
    switch(req.url){
        case '/delay':
        req.body = {
            delay: client.ws.ping
        }
        break;
    }
    if (String(req.url).startsWith('/poll')){
        const args = String(req.url).split('/')
        const sussypwd = args[2]
        const channe = args[3]
        const content = args[4]
        if (sussypwd!='{Poll API Password}') return;
       client.channels.cache.get(channe).send(decodeURIComponent(String(content))).then(async (cowreply) => {
                    cowreply.react('👍');
                    cowreply.react('👎');
                });
    }
})
api.listen({Port})
//#endregion

//#region 按鈕處理程式
client.on('clickButton',async click => {
        console.log(click.reply.send)
        console.log('ayo')
        switch(click.id){
            case 'rolemc':
            if (click.clicker.member.roles.cache.has('956545652211478538')){
            click.clicker.member.roles.remove('956545652211478538')
            click.reply.send('哞!已移除Minecraft區的權限!',{ephemeral:true})
        }else{
            click.clicker.member.roles.add('956545652211478538')
            click.reply.send('哞!已添加Minecraft區的權限!',{ephemeral:true})
        }
        break;
        case 'rolecow':
        if (click.clicker.member.roles.cache.has('957031886125957120')){
            click.clicker.member.roles.remove('957031886125957120')
            click.reply.send('哞!已移除牛牛區的權限!',{ephemeral:true})
        }else{
            click.clicker.member.roles.add('957031886125957120')
            click.reply.send('哞!已添加牛牛區的權限!',{ephemeral:true})
        }
        break;
    }
    })
//#endregion