const Discord = require('discord.js')
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        const someEmoji = message.client.emojis.cache.get("776578867988267059");
        console.log(message.client.emojis.cache);
        message.channel.send(`${someEmoji}`);
    }
};
