const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['strength'],
    description: 'How much strength do you have?',
    group: 'paul',
    maxArgs: 0,
    delmsg: 1,
    cooldown: 30,
    callback: async (client, message, arguments, emb) => {
        const random = Math.floor(Math.random() * 80)

        let reply;
        let img;

        if(random > 54) {
            reply = '"I see you are very strong!", says CoryxKenshin. He is impressed with your strength!'
            img = 'https://www.thewrap.com/wp-content/uploads/2015/04/Paul-Blart-Mall-Cop-2-james-sidebar.jpg'
        } else {
            reply = '"You need some more work!", says CoryxKenshin! He wants you to improve!'
            img = 'https://www.media4.hw-static.com/wp-content/uploads/60016551-638x425.jpg'
        }

        const paulEmbed = new MessageEmbed()
        .setAuthor(`${emb.author}'s strength: ${random}0${random * 5}`)
        .setDescription(reply)
        .setThumbnail(img)
        .setFooter(emb.footer, emb.icon)
        .setColor(emb.col);

        message.channel.send(paulEmbed)
    },
}