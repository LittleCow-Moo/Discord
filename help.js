const { SelectMenuOptionBuilder, SelectMenuBuilder, ActionRowBuilder } = require('@discordjs/builders')
const option = new SelectMenuOptionBuilder
const options = [
    option
        .setLabel('笑話')
        .setDescription('為你說一句笑話!')
        .setValue('haha')
        .setEmoji({ id: '992975702276190218' })
        .toJSON(),
    option
        .setLabel('猜硬幣')
        .setDescription('陪你玩猜硬幣小遊戲!')
        .setValue('coin')
        .setEmoji({ id: '992975700443275305' })
        .toJSON(),
    option
        .setLabel('說話')
        .setDescription('讓我一字不差的學你說話!')
        .setValue('say')
        .setEmoji({ id: '992975697394008094' })
        .toJSON(),
    option
        .setLabel('建議')
        .setDescription('告訴我你想到的新功能!')
        .setValue('suggest')
        .setEmoji({ id: '992975695288479845' })
        .toJSON(),
    option
        .setLabel('投票')
        .setDescription('為你舉行一場投票!')
        .setValue('poll')
        .setEmoji({ id: '992975693770145872' })
        .toJSON(),
    option
        .setLabel('自訂投票')
        .setDescription('為你舉行一場自訂選項的投票!')
        .setValue('custompoll')
        .setEmoji({ id: '992975693770145872' })
        .toJSON(),
    option
        .setLabel('頭貼')
        .setDescription('放大看某人的頭貼!')
        .setValue('avatar')
        .setEmoji({ id: '992975691966590996' })
        .toJSON(),
    option
        .setLabel('時間')
        .setDescription('看看現在的時間!')
        .setValue('time')
        .setEmoji({ id: '992975690062368839' })
        .toJSON(),
    option
        .setLabel('網頁截圖')
        .setDescription('截圖某個網站!')
        .setValue('screenshot')
        .setEmoji({ id: '992975688363671613' })
        .toJSON(),
    option
        .setLabel('短網址')
        .setDescription('縮短你的網址!')
        .setValue('shortlink')
        .setEmoji({ id: '992975686505599027' })
        .toJSON(),
    option
        .setLabel('機器人資訊')
        .setDescription('查看關於我的資訊!')
        .setValue('botinfo')
        .setEmoji({ id: '992975684702064800' })
        .toJSON(),
    option
        .setLabel('延遲')
        .setDescription('測測看我的延遲!')
        .setValue('delay')
        .setEmoji({ id: '992975682881728633' })
        .toJSON(),
    option
        .setLabel('MC伺服/Java')
        .setDescription('查看關於某個Minecraft Java版伺服器的資訊!')
        .setValue('mcjava')
        .setEmoji({ id: '992977049218187364' })
        .toJSON(),
    option
        .setLabel('MC伺服/基岩')
        .setDescription('查看關於某個Minecraft 基岩版伺服器的資訊!')
        .setValue('mcbedrock')
        .setEmoji({ id: '992977040812806235' })
        .toJSON(),
    option
        .setLabel('一起看YouTube')
        .setDescription('和你的朋友一起看YouTube!')
        .setValue('youtube')
        .setEmoji({ id: '992975680298041385' })
        .toJSON(),
    option
        .setLabel('2048')
        .setDescription('陪你玩猜2048遊戲!')
        .setValue('2048')
        .setEmoji({ id: '999215339726442588' })
        .toJSON(),
    option
        .setLabel('發票兌獎')
        .setDescription('來看看你的發票有沒有中獎!')
        .setValue('invoice')
        .setEmoji({ id: '999215343786528821' })
        .toJSON(),
    option
        .setLabel('顏色')
        .setDescription('看看某個顏色!')
        .setValue('color')
        .setEmoji({ id: '999215341928452156' })
        .toJSON(),
    option
        .setLabel('找歌詞')
        .setDescription('尋找某首歌的歌詞!')
        .setValue('lyrics')
        .setEmoji({ id: '1009247448738316319' })
        .toJSON()
]

const menu = new SelectMenuBuilder()
    .addOptions(options)
    .setPlaceholder('指令清單')
    .setCustomId('features')
const row = new ActionRowBuilder()
    .addComponents(menu)
module.exports = row