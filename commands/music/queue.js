module.exports = {
	name: 'queue',
	description: 'Queue command.',
	cooldown: 2,
  aliases: ['q'],
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send("There isn't a song playin");
    const q = Array.from(serverQueue.songs.map(song => `${song.title}`).join(',') + ',0');
    const queue = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Song Queue')
            .setDescription('DJ Grape in the house!')
            .setTimestamp()
            .setFooter('DJ Grape');
      for (var key in q) {queue.addFields({name: q[key], value: '_' })}
      message.channel.send(queue);
};
