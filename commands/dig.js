
module.exports = {
	name: 'dig',
	description: 'dig to earn stars',
	cooldown: 30,
	execute(message, args, d) {
	 let earn = Math.round(Math.random() * 6) + 1;
        const mine = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s mine`)
            .addFields({
                name: 'You dug up ' + earn + ' :star:s',
                value: '_'
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Enterprises');
        message.channel.send(mine);
        d.addMoni(message.author.id, earn);
	}
};
