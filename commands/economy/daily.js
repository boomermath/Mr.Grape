module.exports = {
	name: 'daily',
	description: 'get ur daily amount of stars',
	cooldown: 0,
	execute(message, args, d) {async () => {
	 let og = Math.floor(Math.random() * 25) + 25;
	 let random;
	let inv = await d.items.get(message.author.id)
	if (inv.starmagnet !== undefined && inv.starmagnet > 0) {random = og * (1 + (0.02 * inv.starmagnet));}
	else {random = og;}
        const dailystarEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s daily reward`)
            .addFields({
                name: 'Daily Reward',
                value: 'here is ' + ` ${random} ` + ' :star:s'
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');
        message.channel.send(dailystarEmbed);
        d.addMoni(message.author.id, random);
		}
	}
};
