# How to install the CORYXKENSHIN Discord bot

- Clone this repo
- `npm init` in order to create the package (for you to use the version and description variables I have used)
- Create a **config.json** file, and add a *token* and *prefix* variable
- If you do not have a node_modules or the bot has not worked yet, do `npm i discord.js` and `npm i discord-buttons` (2 dependencies of the bot!)
- After doing so, go into `commands/handler.js | Line 124` and change some of the functions you see there! (and add some)


# Information about files

1. `config/blacklist.json` is used to blacklist members from using the bot

2. `config/info.json` is used for advertisements in the HELP menu, and for support server link.

3.  `config/log.js` is just for the console.log() beautification, when starting your bot. Don't worry about it unless **it breaks your bot, then you go to index.js and delete the function.**
