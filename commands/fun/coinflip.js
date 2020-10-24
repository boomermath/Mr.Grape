
module.exports = {
	name: '8ball',
	description: 'fortune telling is cool',
	cooldown: 5,
	execute(message, args, d) {
      let flip = Math.floor(Math.random() * 2) + 1;
      const coin = new d.Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s coinflip`)
					.setTimestamp()
					.setFooter('Grape Coin Flipper Club');
      switch (flip) {
      case 1:
      coin.addFields({name: 'It landed on:', value: 'Heads!'});
      break;
      default:
      coin.addFields({name: 'It landed on:', value: 'Tails!'});
     }
     message.channel.send(coin);
   }
};
