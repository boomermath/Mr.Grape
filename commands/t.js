module.exports = {
	name: 't',
	description: 'dig to earn stars',
	cooldown: 0,
	execute(message, args, d) {
	    const balEmbed = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle('Testing Embed Looping')
                    .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                    .setTimestamp()
                    .setFooter('Grape Labs Inc.');
		
		for (let i = 0; i < 9; i++) {
		balEmbed.addFields({name: 'Test', value: i});
		}
		message.edit(balEmbed);
		
                message.channel.send(balEmbed);
	}
};
