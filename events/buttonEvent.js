module.exports = (client) => {
    client.on('clickButton', async (button) => {
        await button.reply.defer()
        if (button.id === 'welcome') {
            button.clicker.user.send(`Welcome to the server!`)
        }
    });
}