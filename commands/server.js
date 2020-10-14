module.exports = {
	name: 'server',
	description: 'get some basic info about your server',
	cooldown: 2,
	execute(message, args) {
	const serversoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Server Info')
					.addFields(
						{ name: 'Server name:', value: `${message.guild.name}`},
						{ name: 'Members:', value: `${message.guild.memberCount}`},	
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Databases');

				message.channel.send(serversoloEmbed);
	}
};