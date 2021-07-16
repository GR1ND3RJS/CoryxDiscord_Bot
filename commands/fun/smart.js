const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['smart'],
    description: 'Checks ur smortness level... idk',
    group: 'fun',
    maxArgs: 0,
    delmsg: 1,
    callback: (client, message, arguments, emb) => {
        const random = Math.floor(Math.random() * 100)

        //For this command, I want to make it so if you get above a certain number after the random ^^^, it will say if you are smart or dumb.


        let answer;


        if(random > 70) {
            answer = `You are quite smart! Good for you.`
        } else if (random > 50) { // <= This will make it so if you are below 30, but greater than 20, you get another message.
            answer = `You are smart! Nice.`
        } else if (random > 25) { // We will now start the dirty work eheheheheh
            answer = `Not quite there yet, but atleast you can breath`
        } else { // If you get below 10, and dont meet any requirements above, you get this:
            answer = `Dumb looking monster.`
        } //Sorry, but I am chaotic evil lmao


        

        const smartEmbed = new MessageEmbed()
        .setAuthor(`${emb.author}'s smartness level: ${random}%`)
        .setDescription(`${answer}`)
        .setFooter(emb.footer, emb.icon) 
        .setColor(emb.col);

        //Lets test!

        message.channel.send(smartEmbed)
    },
}