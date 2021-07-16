const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: ['cat'],
    description: 'Sends cat pictures.',
    group: 'fun',
    minArgs: 0,
    delmsg: 1,
    fun: true,
    maxArgs: 0,
    callback: (client, message, arguments, emb) => {
        axios.get('https://api.thecatapi.com/v1/images/search')
        .then((res) => {
            let responses = ["Look at this cute kitty!", "This is one of my fav!", "Aww! So cute!", "I wanna pet this one!", "This kitty is soo adorable!"]
            let index = Math.floor(Math.random() * responses.length)
            const catEmbed = new MessageEmbed()
            .setAuthor(responses[index])
            .setImage(res.data[0].url)
            .setColor(emb.col);

            message.channel.send(catEmbed)
        })
        .catch((error) => {
            console.log(error);
        })
    },
}