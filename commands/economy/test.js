const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        let emojiss = message.client.emojis.get("778023226449330176");
        message.channel.send(`${emojiss}`);
    }
};
