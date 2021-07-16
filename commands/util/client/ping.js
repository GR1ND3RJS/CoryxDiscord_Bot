const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    commands: ['ping'],
    description: 'Get the overall ping of the bot.',
    group: 'client',
    callback: (client, message, arguments, emb) => {
        const apitext = `API Latency is ${Math.round(client.ws.ping)}ms`





        message.channel.send(`Pinging...`).then(msg => {

            const embed = new MessageEmbed()
            .setTitle(`Ping`)
            .setColor(emb.col)
            .setFooter(emb.footer, emb.icon)
            .setThumbnail(emb.img)
            .addField('Latency', `Client latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`)
            .addField('API', apitext)
            .addField('Version', `${emb.ver}`);
            msg.edit(embed)
        })
        message.react('🤖')

    },
}