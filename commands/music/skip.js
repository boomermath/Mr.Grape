module.exports = {
	name: 'queue',
	description: 'play music from youtube',
  	aliases: ['q'],
	cooldown: 2,
	async execute(message, args, d) {
    const channel= message.member.voice;
		if (!channel) return message.channel.send('Get in a voice channel if you wanna do stuff');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send("There ain't any songs playin");
		serverQueue.connection.dispatcher.end('Skipped dat song!');
};
