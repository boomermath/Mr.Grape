module.exports = {
	name: 'invore',
	description: 'check your ore inventory',
	aliases: ['io'],
	cooldown: 3,
	cd: 'Chill, ur ores are ok',
	fan: true,
	async execute(message, args, d) {
		const person = message.mentions.members.first() || message.member;
		if (person.user.bot) { return message.channel.send('No bots in da economy! (except me cus im cool)'); }
		const inv = await d.items.get(person.id);
		const invEmbed = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setDescription('Ore Inventory')
			.setTitle(`${person.user.username}'s inventory`)
			.setTimestamp()
			.setFooter('Grape Storages Org.');
		if (!inv || !inv.ore || Object.keys(inv.ore).length === 0) { invEmbed.addField('nothing but cobwebs and pebbles m8', '_'); } else {
			for (const key in inv.ore) {
				if (inv.ore[key] === 0) {
					delete inv.ore[key];
					await d.items.set(message.author.id, inv);
					continue;
				}
				const orePic = d.emoji[d.ores.tier1.concat(d.ores.tier2, d.ores.tier3).filter(v => key.includes(v)).pop()];
				invEmbed.addField(`${orePic} - ${key.charAt(0).toUpperCase()}${key.slice(1)}(s) `, inv.ore[key]);
			}
		}
		message.channel.send(invEmbed);
	}
};
