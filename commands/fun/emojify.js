module.exports = {
    commands: ['emojify'],
    description: 'Changes your message into Emojis! Max size is 21',
    expectedArgs: '[text...(max: 21)]',
    minArgs: 1,
    maxArgs: 21,
    fun: true,
    cooldown: 20,
    delmsg: 0,
    callback: (client, message, arguments, emb) => {
        const mapping = {
            ' ': '   ',
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '!': ':grey_exclamation:',
            '?': ':grey_question:',
            '#': ':hash:',
            '*': ':asterisk:'
          };
          
        'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
        });

        message.channel.send(arguments.join(' ').split('').map(c => mapping[c] || c).join(''));
        

    },
}