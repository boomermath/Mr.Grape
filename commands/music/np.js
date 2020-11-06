module.exports = {
	name: 'nowplaying',
	description: 'see what song is currently playin',
	cooldown: 2,
  	aliases: ['np'],
	execute(message, args, d) {
	function convertTime(youtubeFormattedTime) {
		let vidTime = youtubeFormattedTime.split(':');
		let final;
		if (vidTime.length === 2 && vidTime[0] !== 0) {final = (vidTime[0] * 60) + (vidTime[1])}
		else if (vidTime.length === 3) {final = (vidTime[0] * 3600) + (vidTime[1] * 60) + (vidTime[2]);}
		else {final = vidTime[1]}
		return final;
	}
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Bruh wdym there is nothing playin");
    const q = serverQueue.songs[0];
    const actualSeek = ((serverQueue.connection.dispatcher.streamTime - serverQueue.connection.dispatcher.pausedTime) / 1000)
    const seek = new Date(actualSeek * 1000).toISOString().substr(11,8);
    const timeLeft = new Date((convertTime(q.duration) - actualSeek) * 1000).toISOString().substr(11,8);
    if (seek.startsWith('00:00:')) {seek.replace('00:')}
    if (timeLeft.startsWith('00:00:')) {timeLeft.replace('00:')}
    const np = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Now Playing')
    	    .setURL(q.url)
    	    .setThumbnail(q.thumbnail)
            .addFields(
            {name: `${q.title}`, value: '\u200b'},
            {name: 'Time elapsed' , value: seek},
            {name: 'Time remaining' , value: timeLeft},
            {name: 'Total Duration' , value: `${q.duration}`},

            )
            .setTimestamp()
            .setFooter('DJ Grape');
            message.channel.send(np);
	}
};
