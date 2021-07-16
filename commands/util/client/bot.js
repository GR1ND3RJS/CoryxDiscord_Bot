const { MessageEmbed } = require('discord.js');
const { version, description } = require('../../../package.json')

module.exports = {
    commands: ['bot', 'util'],
    description: 'The information about the bot',
    group: 'client',
    minArgs: 0,
    maxArgs: 0,
    callback: async (client, message, arguments, emb) => {
        const ping = client.ws.ping;
        const serverCount = client.guilds.cache.size;
        let memberCount = message.guild.memberCount;

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const botEmbed = new MessageEmbed()
        .setAuthor(`Information about: ${client.user.tag}`)
        .addFields({
            name: `Version`,
            value: version,
        }, {
            name: `Description`,
            value: description
        }, {
            name: `Bot Ping`,
            value: ping
        }, {
            name: `Server count`,
            value: serverCount
        }, {
            name: `Current Member count`,
            value: memberCount
        }, {
            name: `Uptime`,
            value: `${days}d ${hours}h ${minutes}m ${seconds}s`
        })
        .setColor(emb.col)
        .setFooter(emb.footer, emb.icon);

        message.channel.send(botEmbed)

    },
}