const Discord = require('discord.js')
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        const emoji = message.client.emojis.get('777977486172618812');
        message.reply(`${emoji} silver look cool`);
    }
};
