module.exports = {
	name: 'cat',
	description: 'get a cat pic',
	cooldown: 3,
	cd: 'Cats are cute, but chill',
	async execute(message, args, d) {
		const catapi = 'https://api.thecatapi.com';
		const submitURL = `${catapi}/v1/images/search?mime_types=jpg,png&limit=1&size=small`;
		const key = process.env.CATAPI
		const pic = await d.r2.get(submitURL, { key }).json;
		const cat = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle('Cat!')
			.setImage(pic[0].url)
			.setTimestamp()
			.setFooter('Cat');
		message.channel.send(cat);
	}
};
