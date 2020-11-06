const guild = require('discord.js');
module.exports = {
	name: 'queue',
	description: 'get your server\'s music queue',
	cooldown: 2,
  	aliases: ['q'],
	execute(message, args, d) {
    	const serverQueue = message.client.queue.get(message.guild.id);
   	 if (!serverQueue) return message.channel.send("There isn't a song playin");
	let loop;
	switch(serverQueue.repeatMode) {
  	case 1:
	loop = "the **song**"
    	break;
  	case y:
	loop = "the **queue**"
    	break;
  	default:
	loop = "**nothing**"
	}
   	 const q = serverQueue.songs;
   	 const queue = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(`${guild.name}\'s Queue`)
	    .addField('Looping', loop, true)
            .setTimestamp()
            .setFooter('DJ Grape');
      for (var key in q) {queue.addFields({name: '\u200b' + `${parseInt(key) + 1}` + '. ' + q[key].title, value: '_' })}
      message.channel.send(queue);
	}
};
