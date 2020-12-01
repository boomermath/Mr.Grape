module.exports = {
	name: 'connection',
	description: 'pause a song that\'s playing',
	cooldown: 2,
	execute(message, args, d) {
    const q = message.client.queue.get(message.guild.id);
    message.channel.send(q);	
	}
};
