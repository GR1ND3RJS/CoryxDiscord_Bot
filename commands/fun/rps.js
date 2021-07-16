module.exports = {
    commands: ['rps'],
    description: 'Play rock paper scissors!',
    group: 'fun',
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "<rock/paper/scissors",
    delmsg: 0,
    callback: (client, message, arguments, emb) => {
        if (!arguments[0] || arguments[0] === '') {
            message.channel.send(`What are you picking? You can only choose \`rock, paper, scissors\``)
            return
        }
        const choice = arguments[0].toLowerCase()
        const options = ['rock', 'paper', 'scissors']
        if (options.includes(choice)) {
            let botEmoji;
            let playerEmoji;
            const botChoice = Math.floor(Math.random() * 2) + 1;
            let botChoiceStr;

            if (botChoice == 1) {
                botChoiceStr = 'rock'
                botEmoji = ':rock: Rock'
            } else if (botChoice == 2) {
                botChoiceStr = 'paper'
                botEmoji = ':newspaper: Paper'
            } else if (botChoice == 3) {
                botChoiceStr = 'scissors'
                botEmoji = ':scissors: Scissors'
            }

            if (choice === 'rock') {
                playerEmoji = ':rock: Rock'
            } else if (choice === 'paper') {
                playerEmoji = ':newspaper: Paper'
            } else if (choice === 'scissors') {
                playerEmoji = ':scissors: Scissors'
            }

            let answer = `I picked: ${botEmoji}, you picked: ${playerEmoji}.`


            if (botChoiceStr === choice) return message.channel.send(`${answer} Its a draw!`)

            if (choice === 'rock') {
                if (botChoiceStr === 'paper') return message.channel.send(`${answer} You lost!`)
                if (botChoiceStr === 'scissors') return message.channel.send(`${answer} You won!`)
            } else if (choice === 'paper') {
                if (botChoiceStr === 'scissors') return message.channel.send(`${answer} You lost!`)
                if (botChoiceStr === 'rock') return message.channel.send(`${answer} You won!`)
            } else if (choice === 'scissors') {
                if (botChoiceStr === 'rock') return message.channel.send(`${answer} You lost!`)
                if (botChoiceStr === 'paper') return message.channel.send(`${answer} You won!`)
            }


        } else {
            message.channel.send(`This choice is invalid. Choose between \`${options}\``)
        }
    },
}