module.exports = {
	name: 'queue',
	description: 'get your server\'s music queue',
	cooldown: 2,
  	aliases: ['q'],
	execute(message, args, d) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There isn't a song playin");
    const qRaw = serverQueue.songs.map(song => `${song.title}`).join(',');
    const q = qRaw.split(',');
    const queue = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Song Queue')
            .setTimestamp()
            .setFooter('DJ Grape');
      for (var key in q) {queue.addFields({name: '\u200b' + q[key], value: '\u200b' })}
      message.channel.send(queue);
	}
};
