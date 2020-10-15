
const Discord = require('discord.js');
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {
    namespace: 'users'
});
module.exports = {
	name: 'info',
	description: 'basic info about the bot',
	cooldown: 5,
	execute(message, args) {
	        let uptime = bot.uptime / 1000;
        let unit = "second(s)";
        if (uptime > 59 && unit === "second(s)") {
            uptime /= 60;
            unit = "minute(s)";
        }
        if (uptime > 59 && unit === "minute(s)") {
            uptime /= 60;
            unit = "hour(s)";
        }
        if (uptime > 23 && unit === "hour(s)") {
            uptime /= 24;
            unit = "day(s)";
        }
        //message.channel.send(`Version: \`${config.version}\`\nUptime: \`${Math.floor(uptime)}\` ${unit}\nTodo list:\n${config.todo.join("\n")}`);
        const info = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Info')
            .addFields({
                name: 'Version:',
                value: `${config.version}`
            }, {
                name: 'Uptime:',
                value: `${Math.floor(uptime)}` + ` ${unit}`
            }, {
                name: 'To-do list:',
                value: `${config.todo.join("\n")}`
            }, {
                name: '# of Servers Mr.Grape is in:',
                value: `${bot.guilds.cache.size}`
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Enterprises');

        message.channel.send(info);

	
	
	}
};
