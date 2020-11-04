module.exports = {
	name: 'nowplaying',
	description: 'get see what song is currently playin',
	cooldown: 2,
  aliases: ['np'],
	execute(message, args, d) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Bruh wdym there is nothing playin");
    const np = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Now playing\n_')
            .addFields(
            {name: `${serverQueue.songs[0].title}`, value: '\u200b'}
            )
            .setTimestamp()
            .setFooter('DJ Grape');
            message.channel.send(np);
	}
};
