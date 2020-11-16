const Discord = require('discord.js')
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        const emoji = message.client.emojis.find(emoji => emoji.name === "silver");
        message.reply(`${emoji} silver look cool`);
    }
};
