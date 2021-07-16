const {
    MessageButton
} = require("discord-buttons");
const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    commands: ['ptb'],
    description: 'Play a game! Press the button.',
    group: 'fun',
    minArgs: 1,
    delmsg: 0,
    expectedArgs: '`easy | medium | hard`',
    fun: true,
    callback: (client, message, arguments, emb) => {

        const choices = ['easy', 'medium', 'hard']

        let counter = 30;

        let bool = false

        for(const choice in choices) {
            if(arguments[0].toLowerCase() === choices[choice]) {
                let num = (parseInt(choice) + 1) * 5
                counter = counter - num
                bool = true
            }
        }

        if(bool == false) return message.channel.send(`You need to pick a difficulty. Choose from these three: \`easy | medium | hard\``)


        counter = counter * 1000

        const {
            channel,
            author
        } = message

        let points = 0



        channel.send(`Click me!`).then(async msg => {
            await msg.react('👆')
            message.channel.send(`Start clicking!`).then(e => e.delete({timeout: 1000}))


            const butfil = (reaction, user) => reaction.emoji.name === '👆' && user.id === message.author.id;
            const collector = msg.createReactionCollector(butfil, { time: counter})


            collector.on('collect', r => {
                points += 1
            })

            collector.on('end', r => {
                if(points == 0) {
                    message.channel.send(`Sorry, but you did not score a point.`)
                    msg.delete()
                    return
                }

                message.channel.send(`Great job ${message.author}! You got ${points} point${points == 1 ? '' : 's'}`)
                msg.delete()
            })


        })
    },
}