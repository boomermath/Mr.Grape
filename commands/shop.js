 
module.exports = {
	name: 'shop',
	description: 'display the shop',
	cooldown: 2,
	execute(message, args, d) {
		const shop = new d.Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('The Shop')
		                        .setDescription('To buy an item, do ' +`${d.config.prefix}`+"buy <itemname>")
					.addFields(
						{ name: 'fan:', value:'reduces cooldowns of some commands\ncost: 100:star:'},
						{ name: 'orangedetector', value: 'increases the chance you find an orange in the orange job\ncost: 100:star:'},	
						{ name: 'mangodetector', value: 'increases the chance you find a mango in the mango job\ncost: 50:star:'},
						{ name: 'carrotdetector', value: 'increases the chance you find a carrot in the carrot job\ncost: 50:star:'},
						{ name: 'starmagnet', value: 'increases the chance you find :star:s\ncost: 100:star:'},
						{ name: 'starmill', value: 'generates you :star:s passively at a rate of 1:star: per 10m\ncost: 400:star:'},
						{ name: 'shovel', value: 'gives you more stars for digging job\ncost: 100:star:'},
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Marketplaces');

				message.channel.send(shop); 
		
	     }
	};
