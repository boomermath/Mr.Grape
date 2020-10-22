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
                    .setTitle(message.author.username + "'s inventory")
                    .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                    .setTimestamp()
                    .setFooter('Grape Storage Org.');
		for (const key in inv) {invEmbed.addFields({name: key.charAt(0).toUpperCase() + key.slice(1) +"(s)", value: `${inv[key]}`});}
		message.edit(invEmbed);
                message.channel.send(invEmbed);
	      }
	  inv();
	}
};
