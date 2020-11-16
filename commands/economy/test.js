const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
    name: 'test',
    description: 'test',
    cooldown: 0,
    execute(message, args, d) {
        function emoji (id) {
            return message.guild.emojis.get(id).toString()
        }
        message.channel.send(emoji("778032565197865020"))
    }
};
