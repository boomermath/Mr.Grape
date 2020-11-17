const Discord = require('discord.js')
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        if (!args[0]) { return; }
        else {
            message.channel.send(`${d.emoji[args[0]]}`);
        }
    }
};
