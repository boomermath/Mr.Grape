module.exports = {
	name: 'nowplaying',
	description: 'get see what song is currently playin',
	cooldown: 2,
  	aliases: ['np'],
	execute(message, args, d) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Bruh wdym there is nothing playin");
    const q = serverQueue.songs[0];
    const seek = (serverQueue.connection.dispatcher.streamTime - serverQueue.connection.dispatcher.pausedTime) / 1000;
    const timePlaying = q - seek;
    const show = new Date(timePlaying * 1000).toISOString().substr(11, 8);
    const np = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Now Playing')
    	    .setURL(q.url)
    	    .setThumbnail(q.thumbnail)
            .addFields(
            {name: `${q.title}`, value: '\u200b'},
            {name: `${show}/${q.duration}` , value: '_'},
            )
            .setTimestamp()
            .setFooter('DJ Grape');
            message.channel.send(np);
	}
};
