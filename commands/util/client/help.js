const handler = require('../../run-handler')
const { prefix } = require('../../../config/secrets/config.json');
const { ad } = require('../../../config/info.json')
const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
    commands: ['help'],
    description: 'Displays all of the commands in the bot',
    group: 'client',
    unList: false,
    minArgs: 0,
    maxArgs: 0,
    callback: async (client, message, arguments, emb) => {
        const commands = await handler.run()



        let txt_Fun = 'FUN COMMANDS: \n\n';
        let txt_dev = 'DEVELOPER COMMANDS (Hey dev!): \n\n';
        let txt_gui = 'GUILD UTILITY COMMANDS: \n\n';
        let txt_cli = 'CLIENT UTILITY COMMANDS: \n\n'
        let txt_pb = 'PAUL BLART ENJOYS: \n\n'




        commands.sort()

        
        
        
        
        for (const command of commands) {
            let permissions = command.permission
            if(permissions) {
                let hasPermission = true
                if(typeof permissions === 'string') {
                    permissions = [permissions]
                }

                for(const permission of permissions) {
                    if(!message.member.hasPermission(permission)) {
                        hasPermission = false
                        break
                    }
                }

                if(!hasPermission) {
                    continue
                }


            }

            if(!command.commands) {
                continue
            }

            const mainCommand = typeof command.commands === 'string' 
            ? command.commands 
            : command.commands[0];


            const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
            const description = command.description
            ? command.description
            : 'No description'

            let reply = `**${prefix}${mainCommand}${args}** - ${description}\n`


            if(command.group) {
                if(command.group === 'fun') {
                    txt_Fun += reply
                } else if (command.group === 'guild') {
                    txt_gui += reply
                } else if (command.group === 'client') {
                    txt_cli += reply
                }  else if (command.group === 'developer') {
                    txt_dev += reply
                } else if (command.group === 'paul') {
                    txt_pb += reply
                }
            }


            

        }

        let init = `HELP PAGE \nWelcome to the HELP page. Version ${emb.ver} \n\n If you have any questions about commands, answer them in the support channel or dm the developer of the bot (AKA GR1ND3R#1000). (BUTTON DOWN BELOW) \nADVERTISEMENT: \n **${ad}**`




        let pages = [init, txt_Fun, txt_pb, txt_gui, txt_cli, txt_dev]
        let titles = ["HELP", '😃 FUN 😃', "🚓 PAUL BLART FAVS 👮‍♂️", "📃 GUILD UTILITY 📊", "🤖 CLIENT UTILITY 🤖", "DEVELOPER"]
        let page = 1
        let title = 1

        if(message.member.id !== '571673609953738784') {
            pages.pop()
            titles.pop()
        }

        const helpEmbed = new MessageEmbed()
        .setAuthor(emb.author, emb.img)
        .setTitle(titles[title - 1])
        .setDescription(pages[page - 1])
        .setColor(emb.col)
        .setFooter(`Page ${page} of ${pages.length}`)
        .setThumbnail(emb.img)


        let helpButton = new MessageButton()
        .setStyle('url')
        .setLabel(`Support Channel`)
        .setURL(`https://discord.gg/wprjEAAPSp`)

        let rBe = new MessageButton()
        .setStyle('blurple')
        .setLabel("▶")
        .setID(`help_right`)

        let lBe = new MessageButton()
        .setStyle('blurple')
        .setLabel("◀")
        .setID(`help_left`)

        let lBe2 = new MessageButton()
        .setStyle('blurple')
        .setLabel("⏪")
        .setID(`double_left`)

        let rBe2 = new MessageButton()
        .setStyle('blurple')
        .setLabel("⏩")
        .setID(`double_right`)

        message.author.send(`HELP`, {embed: helpEmbed, buttons: [lBe2, lBe, helpButton, rBe, rBe2]}).then(async msg => {
            message.channel.send(`Check your dms!`)
            message.react(`👍`)

            const rBFilter = (button) => button.id === 'help_right' // One turn
            const lBFilter = (button) => button.id === 'help_left' // One turn

            const rightFilter2 = (button) => button.id === 'double_right' // 2 turns
            const leftFilter2 = (button) => button.id === 'double_left' // 2 turns


            const rB = msg.createButtonCollector(rBFilter, { time: (1000 * 60 * 5) })
            const lB = msg.createButtonCollector(lBFilter, { time: (1000 * 60 * 5) })

            const doubleRight = msg.createButtonCollector(rightFilter2, { time: (1000 * 60 * 5) })
            const doubleLeft = msg.createButtonCollector(leftFilter2, { time: (1000 * 60 * 5) })

            rB.on('collect', async r => {
                if (page === pages.length) return;
                page++;
                if (title === pages.length) return;
                title++;
                helpEmbed.setDescription(pages[page-1])
                helpEmbed.setTitle(titles[title-1])
                helpEmbed.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(helpEmbed)
                
            })

            lB.on('collect', r => {
                if (page === 1) return;
                page--;
                if (title === 1) return;
                title--;
                helpEmbed.setDescription(pages[page-1])
                helpEmbed.setTitle(titles[title-1])
                helpEmbed.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(helpEmbed)
            })

            doubleRight.on('collect', r => {
                if (page === pages.length - 1 || page === pages.length) return;
                page++;
                page++;
                if (title === pages.length - 1 || title === pages.length) return;
                title++;
                title++;
                helpEmbed.setDescription(pages[page-1])
                helpEmbed.setTitle(titles[title-1])
                helpEmbed.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(helpEmbed)
            })

            doubleLeft.on('collect', r => {
                if (page === 2 || page === 1) return;
                page--;
                page--;
                if (title === 2 || title === 1) return;
                title--;
                title--;
                helpEmbed.setDescription(pages[page-1])
                helpEmbed.setTitle(titles[title-1])
                helpEmbed.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(helpEmbed)
            })

            rB.on('end', r => {
                msg.delete()
            })



        }).catch(e => {
            if(e.message === 'Cannot send messages to this user') {
                message.channel.send(`There was an error from this user. They must have blocked me, or have left the server.`)
                console.log(e.messsage)
                return
            }
            message.channel.send(`There was an error`)
            console.log(e.message)
        })
    },
}