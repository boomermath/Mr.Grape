const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        const emoji = '<:silver:777985067016126474>'
        message.reply(`${emoji} silver look cool`);
    }
};
