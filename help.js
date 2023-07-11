const {
  SelectMenuOptionBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
} = require("@discordjs/builders")
const hjson = require("./help.json")
const option = new SelectMenuOptionBuilder()
const options = [
  option
    .setLabel(hjson.haha.name)
    .setDescription(hjson.haha.desc)
    .setValue("haha")
    .setEmoji({ id: "992975702276190218" })
    .toJSON(),
  option
    .setLabel(hjson.coin.name)
    .setDescription(hjson.coin.desc)
    .setValue("coin")
    .setEmoji({ id: "992975700443275305" })
    .toJSON(),
  option
    .setLabel(hjson.say.name)
    .setDescription(hjson.say.desc)
    .setValue("say")
    .setEmoji({ id: "992975697394008094" })
    .toJSON(),
  option
    .setLabel(hjson.suggest.name)
    .setDescription(hjson.suggest.desc)
    .setValue("suggest")
    .setEmoji({ id: "992975695288479845" })
    .toJSON(),
  option
    .setLabel(hjson.poll.name)
    .setDescription(hjson.poll.desc)
    .setValue("poll")
    .setEmoji({ id: "992975693770145872" })
    .toJSON(),
  option
    .setLabel(hjson.custompoll.name)
    .setDescription(hjson.custompoll.desc)
    .setValue("custompoll")
    .setEmoji({ id: "992975693770145872" })
    .toJSON(),
  option
    .setLabel(hjson.avatar.name)
    .setDescription(hjson.avatar.desc)
    .setValue("avatar")
    .setEmoji({ id: "992975691966590996" })
    .toJSON(),
  option
    .setLabel(hjson.time.name)
    .setDescription(hjson.time.desc)
    .setValue("time")
    .setEmoji({ id: "992975690062368839" })
    .toJSON(),
  option
    .setLabel(hjson.screenshot.name)
    .setDescription(hjson.screenshot.desc)
    .setValue("screenshot")
    .setEmoji({ id: "992975688363671613" })
    .toJSON(),
  option
    .setLabel(hjson.shortlink.name)
    .setDescription(hjson.shortlink.desc)
    .setValue("shortlink")
    .setEmoji({ id: "992975686505599027" })
    .toJSON(),
  option
    .setLabel(hjson.botinfo.name)
    .setDescription(hjson.botinfo.desc)
    .setValue("botinfo")
    .setEmoji({ id: "992975684702064800" })
    .toJSON(),
  option
    .setLabel(hjson.delay.name)
    .setDescription(hjson.delay.desc)
    .setValue("delay")
    .setEmoji({ id: "992975682881728633" })
    .toJSON(),
  option
    .setLabel(hjson.mcjava.name)
    .setDescription(hjson.mcjava.desc)
    .setValue("mcjava")
    .setEmoji({ id: "992977049218187364" })
    .toJSON(),
  option
    .setLabel(hjson.mcbedrock.name)
    .setDescription(hjson.mcbedrock.desc)
    .setValue("mcbedrock")
    .setEmoji({ id: "992977040812806235" })
    .toJSON(),
  option
    .setLabel(hjson["2048"].name)
    .setDescription(hjson["2048"].desc)
    .setValue("2048")
    .setEmoji({ id: "999215339726442588" })
    .toJSON(),
  option
    .setLabel(hjson.invoice.name)
    .setDescription(hjson.invoice.desc)
    .setValue("invoice")
    .setEmoji({ id: "999215343786528821" })
    .toJSON(),
  option
    .setLabel(hjson.color.name)
    .setDescription(hjson.color.desc)
    .setValue("color")
    .setEmoji({ id: "999215341928452156" })
    .toJSON(),
  option
    .setLabel(hjson.lyrics.name)
    .setDescription(hjson.lyrics.desc)
    .setValue("lyrics")
    .setEmoji({ id: "1009247448738316319" })
    .toJSON(),
  option
    .setLabel(hjson.earthquake.name)
    .setDescription(hjson.earthquake.desc)
    .setValue("earthquake")
    .setEmoji({ id: "1053482212328222810" })
    .toJSON(),
]

const menu = new SelectMenuBuilder()
  .addOptions(options)
  .setPlaceholder("指令清單")
  .setCustomId("features")
const row = new ActionRowBuilder().addComponents(menu)
module.exports = row
