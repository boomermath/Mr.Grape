const Discord = require('discord.js')
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        const someEmoji = message.client.emojis.cache.get("778264742606798860");
        console.log(someEmoji);
        message.channel.send(`${someEmoji}`);
    }
};
