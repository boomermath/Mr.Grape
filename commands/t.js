module.exports = {
	name: 'inv',
	description: 'dig to earn stars',
	aliases: ['inventory'],
	cooldown: 3,
	execute(message, args, d) {
	    async function inv() {	
            let inv = await d.items.get(message.author.id);
	    const invEmbed = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.id + "'s inventory")
                    .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                    .setTimestamp()
                    .setFooter('Grape Storage Org.');
		for (const key in inv) {invEmbed.addFields({name: `${key}`, value: `${inv[key]}`});}
		message.edit(balEmbed);
                message.channel.send(balEmbed);
	      }
	  inv();
	}
};
