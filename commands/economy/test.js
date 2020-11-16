const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        let myGuild = '743208211460653177';
        let emojiss =  message.guild.emojis.cache?.find(emoji => emoji.name === 'silver');
        message.channel.send(`${emojiss}`);
    }
};
