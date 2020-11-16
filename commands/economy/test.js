const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        const emoji = client.emojis.find(emoji => emoji.name === "silver");
        message.reply(`${emoji} silver look cool`);
    }
};
