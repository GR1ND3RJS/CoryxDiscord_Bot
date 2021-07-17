const { MessageEmbed } = require("discord.js")
const { version } = require('../package.json')
const { prefix } = require('../config.json');
const devId = '571673609953738784'
const { fun, members: blacklistedMembers, funreply, memReply } = require('../config/blacklist.json');

const validatePerms = (permissions) => {
    const validPermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}`)
        }
    }
}

let recentlyRan = []

const resetRan = (array) => {
    array = []
}




resetRan(recentlyRan);

module.exports = async (client, commandOptions) => {
    let {
        commands,
        isdev = false,
        isFun = false,
        unList = true,
        group,
        desc,
        needRoles = [],
        delmsg = -1,
        cooldown = -1,
        expectedArgs = '',
        permissionError = 'You have no permission to run this command.',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        reqPerms = [],
        callback
    } = commandOptions

    if (typeof commands === 'string') {
        commands = [commands]
    }

    if (!commands) {
        return
    }

    if (!desc) {
        desc = 'No Description'
    }

    if (needRoles.length) {
        if (typeof needRoles === 'string') {
            needRoles = [needRoles]
        }
        validatePerms(needRoles)
    }

    //good Perms in command
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePerms(permissions)
    }

    client.on('message', async message => {




        const {
            member,
            content,
            guild,
            user
        } = message

        const starter = message.content + ' '


        const options = {
            author: message.author.username, // The message Author
            footer: `Samurai sliced by: ${message.author.tag}`,
            icon: message.author.displayAvatarURL({
                dynamic: true
            }),
            img: message.author.displayAvatarURL({
                dynamic: true
            }), // The message author's pfp
            col: '#3449eb', //Color - For the embed
            pre: prefix, // Prefix
            ver: version, // Version of bot
        }

        /* Embeds for the any purpose */

        const cooldownEmbed = new MessageEmbed()
            .setAuthor(`Slow it down!`)
            .setDescription(`Woah, slow it down ${message.author}! You need to wait ${cooldown} seconds before using this command again!`)
            .setColor('#FF0R00')
            .setTimestamp();


        /* ----------------------------------------------------------------------------------------------------------------------- */

        for (const alias of commands) {
            if (starter.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()} `)) {
                if (message.channel.type === 'dm') return


                if (!commands.includes(alias)) {
                    message.reply(`That is not a valid command!`)
                    message.delete()
                    return
                }
                //Ensure required Perms
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError)
                        return
                    }
                }

                //Ensure required Roles
                for (const reqPerm of reqPerms) {

                    if (!guild.me.hasPermission(reqPerm)) {
                        message.reply(`I must have the required permission "${reqPerm}" to do this!`)
                        return
                    }
                }




                const arguments = content.split(/[ ]+/)

                //Removing the first index
                arguments.shift()


                //Ensure we have correct number of args
                if (arguments.length < minArgs || (
                        maxArgs !== null && arguments.length > maxArgs
                    )) {
                    message.channel.send(`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`).then(m => {
                        m.delete({ timeout: 1000})
                    })
                    return
                }



                //Check if this command is blacklisted

                for(const c in fun) {
                    if(isFun == true) {
                        if(message.channel.id === fun[c]) {
                            return message.channel.send(funreply)
                        }
                    }
                    
                }

                for(const c in blacklistedMembers) {
                    if(unList == false) {
                        if(message.author.id === blacklistedMembers[c]) {
                            return message.author.send(memReply)
                        }
                    }
                    
                }


                //delete a message
                if (delmsg > 0) {
                    message.delete({
                        timeout: delmsg * 1000
                    })
                }

                if (delmsg === 0) {
                    message.delete()
                }

                if (isdev == true) {
                    if (message.author.id !== devId) {
                        message.delete()
                        return
                    }
                }


                // adding array
                //Cooldown
                let cooldownString = `${member.id}-${commands[0]}`
                if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
                    message.reply(cooldownEmbed)
                    return
                }

                if (cooldown > 0) {
                    if(message.author.id !== '') {
                      recentlyRan.push(cooldownString)

                        setTimeout(() => {
                            recentlyRan = recentlyRan.filter((string) => {
                                return string !== cooldownString
                            })
                        }, 1000 * cooldown)  
                    }
                    
                }

                



                



                //Run the code
                callback(client, message, arguments, options)

                await message.channel.stopTyping(true)



                return
            }
        }
    })


}

/*
module.exports = {
    commands: [''],
    description: '',
    group: '',
    minArgs: 0,
    reqPerms: [''],
    callback: (client, message, arguments, emb) => {

    },
}




expectedArgs: '',
permissionError: '',
permissions: [],
*/