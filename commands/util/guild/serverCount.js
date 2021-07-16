const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: ['membercount', 'mbc'],
    description: 'Displays the number of members in this server.',
    group: 'guild',
    unList: false,
    minArgs: 0,
    maxArgs: 0,
    callback: async (client, message, arguments, emb) => {
        let memberCount = message.guild.members.cache.filter(m => !m.user.bot).size;
        let botCount = message.guild.members.cache.filter(m => m.user.bot).size;

        let onlineMembers = message.guild.members.cache
        .filter(m => m.presence.status !== 'offline' && !m.user.bot).size;

        const botEmbed = new MessageEmbed()
        .setAuthor(`Information about: ${client.user.tag}`)
        .addFields(
        { name: `Current Member count`, value: memberCount }, 
        { name: `Number of Bots`, value: botCount },
        { name: "Online members", value: onlineMembers } 
        )
        .setColor(emb.col)

        message.channel.send(botEmbed)

    },
}