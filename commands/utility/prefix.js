module.exports = {
	name: 'prefix',
	description: 'set prefix',
	cooldown: 2,
	async execute(message, args, d) {
    if (!args[0]) {return message.channel.send('What do you wanna set the prefix to?');}
    let guild = await d.guilds.get(message.guild.id);
    if (!guild) {guild = {};}
    guild.prefix = args[0];
	const prefixEmbed = new d.Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Guild Prefix')
					.addField(`Prefix set to ${args[0]}`,'_')
					.setTimestamp()
					.setFooter('Grape Databases');

                message.channel.send(prefixEmbed);
            await d.guilds.set(message.guild.id, guild);
	}
};
