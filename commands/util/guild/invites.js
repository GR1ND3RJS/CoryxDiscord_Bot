const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['guildinv', 'guildinvites'],
    description: 'Displays all invite links in the server, sorted from descending order.',
    group: 'guild',
    callback: async (client, message, arguments, emb) => {
        //We need to first get all invites from a server!
        const invites = await message.guild.fetchInvites()

        if(!invites) return message.channel.send(`There are no invite links for this server.`)

        const allInvites = []

        invites.forEach((invite) => {
            const { uses, inviter, url } = invite
            const { username, discriminator } = inviter

            const inv = {
                url: url,
                uses: uses,
                username, username,
                discriminator: discriminator
            }

            allInvites.push(inv)
        })

        console.log(allInvites)

        allInvites.sort((a, b) => {
            b.uses - a.uses
        })

        allInvites.slice(0,12)

        let text = ''

        for(const i in allInvites) {
            const { uses, username, discriminator, url } = allInvites[i]

            text += `${username}#${discriminator} with ${uses} members invited. Link: ${url}\n\n`
        }

        const embed = new MessageEmbed()
        .setTitle(`TOP 12 Invites in the server:`)
        .setDescription(text)
        .setColor(emb.col)
        .setFooter(emb.footer, emb.icon);

        message.channel.send(embed)



    },
}