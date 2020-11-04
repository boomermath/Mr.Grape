module.exports = {
	name: 'queue',
	description: 'get your server\'s music queue',
	cooldown: 2,
  	aliases: ['q'],
	execute(message, args, d) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There isn't a song playin");
    const q = serverQueue.songs;
    return message.channel.send(serverQueue.songs);
    const queue = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Song Queue\n_')
            .setTimestamp()
            .setFooter('DJ Grape');
      for (var key in q) {
	queue.addFields({name: '\u200b' + q[key], value: '_' })
      	if (!q[key]) {
		message.channel.send('There isn\'t a song playin!');
		serverQueue.songs.shift();
		return;
		     }	
      }
      message.channel.send(queue);
	}
};
