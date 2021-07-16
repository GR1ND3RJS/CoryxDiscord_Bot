const Discord = require('discord.js')
const { Client, Intents } = Discord
const client = new Client({ intents: [Intents.ALL] });
const disbut = require('discord-buttons')(client);
const path = require('path')
const fs = require('fs')
const { version } = require('./package.json')
const config = require('./config.json')
const { token } = config


const EventEmitter = require('events'); //Clears out limited events
EventEmitter.defaultMaxListeners = 69


const handler = require('./commands/run-handler')
const log = require('./config/log')
const buttonEvent = require('./events/buttonEvent')

  //----------------------------------------------------------------------------------------------------------------//

client.on('ready', async () => {

    const commands = await handler.run(client)

    buttonEvent(client);
    
    log.log([{
        name: "Client", // name
        value: [`Logged in as ${client.user.tag}!`,
        `Running ${commands.length} commands!`
    ] 
    }, {
        name: "Server", // name
        value: [
            `Listening to 13,046 users!`,
            ] // values
    }], 102)


    client.user.setPresence({
        status: 'online',
        activity: {
            name: `13,046 CoryxKenshin fans!`,
            type: "WATCHING",
        }
    })




})






client.login(token)
