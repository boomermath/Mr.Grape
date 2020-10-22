module.exports = {
	name: 't',
	description: 'dig to earn stars',
	cooldown: 0,
	execute(message, args, d) {
	    const balEmbed = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(personName + `'s balance`)
                    .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                    .setTimestamp()
                    .setFooter('Grape Bank Inc.');
		
		for (let i = 0; i < 9; i++) {
		balEmbed.addField({name: Test, value: i})
		}
		
                message.channel.send(balEmbed);
	}
};
