const path = require('path')
const fs = require('fs')


module.exports.run = (client) => {
    const baseFile = 'handler.js'
    const commandBase = require(`./${baseFile}`)

    const commands = []

    const readCommands = directory => {
        const files = fs.readdirSync(path.join(__dirname, directory))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, directory, file))
            if (stat.isDirectory()) {
                readCommands(path.join(directory, file))
            } else if (file !== baseFile && file !== 'run-handler.js') {
                const option = require(path.join(__dirname, directory, file))
                commands.push(option)
                if(client) {
                    commandBase(client, option)
                }
            }
        }
    }

    readCommands('.')


    return commands
}