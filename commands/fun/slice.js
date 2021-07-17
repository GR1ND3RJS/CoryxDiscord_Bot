const {
    MessageButton
} = require("discord-buttons");
const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    commands: ['slice'],
    description: 'Play a game! Slice the button!',
    group: 'cory',
    fun: true,
    callback: (client, message, arguments, emb) => {

        const button = new MessageButton()
        .setID('slice')
        .setLabel('👍')
        .setStyle('blurple')


        message.channel.send(`Slice that like button!`, button).then(msg => {
            const filter = (button) => button.id === 'slice' && button.clicker.user.id === message.author.id;

            const collector = msg.createButtonCollector(filter, { time: (1000 * 60 * 5) });


            collector.on('collect', r => {
                const random = Math.floor(Math.random() * 26)
                let strength = '🟩'

                for(let i = 1; i <= random; i++) {
                    strength += '🟩'
                }

                for(let u = 1; u < 25 - random; u++) {
                    strength += '◼'
                }
                
                const embed = new MessageEmbed()
                .setAuthor(`You sliced the button!`)
                .setDescription(`Your sword's power: \n${strength}\n  `)
                .setColor(emb.col)
                .setFooter(emb.footer, emb.icon)


                if(random > 20) {
                    button.setStyle('gray').setLabel('🔥 You\'ve destroyed it! 🔥') 
                } else {
                    button.setStyle('red').setLabel('🩸 You\'ve sliced it, but it still lives! 🩸')
                }


                msg.edit('', {embed: embed, buttons: button})
                collector.stop()
            })
        })



    },
}