const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        const someEmoji = message.client.emojis.cache.get("<778264742606798860>");
        message.channel.send(someEmoji);
    }
};
