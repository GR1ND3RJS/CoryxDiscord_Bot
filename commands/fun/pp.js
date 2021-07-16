const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['pp'],
    description: 'Checks ur pp.... idk',
    group: 'fun',
    maxArgs: 0,
    delmsg: 1,
    callback: async (client, message, arguments, emb) => {
        const random = Math.floor(Math.random() * 20)

        let pp = '8'

        for(let e = 1; e < random + 1; ++e) {
            pp += '='
        }

        pp += `D`

        const ppEmbed = new MessageEmbed()
        .setAuthor(`${emb.author}'s pp:`)
        .setDescription(`${pp}`)
        .setFooter(emb.footer, emb.icon)
        .setColor(emb.col);

        message.channel.send(ppEmbed)
    },
}