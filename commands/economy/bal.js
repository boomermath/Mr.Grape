module.exports = {
	name: 'bal',
	aliases: ['balance', 'wallet'],
	description: 'check ur balance',
	cooldown: 1,
	cd: 'Bruh its just ur balance, chill',
	fan: true,
	async execute(message, args, d) {
		const person = message.mentions.members.first() || message.member;
		if (person.user.bot) return message.channel.send('Begone bots (except me, cus im actually good)');
		const bal = await d.users.get(person.id);
		let displayBal;
		if (bal === null || !bal) {
			displayBal = 0;
		} else {
			displayBal = bal;
		}
		const balEmbed = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle(`${person.user.username}'s balance`)
			.addField('Balance', `${displayBal} :star:s`)
			.setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
			.setTimestamp()
			.setFooter('Grape Bank Inc.');
		message.channel.send(balEmbed);
	}
};
