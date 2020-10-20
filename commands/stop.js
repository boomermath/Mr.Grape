
module.exports = {
	name: 'stop',
	description: 'play music',
	cooldown: 0,
	execute(message, args, d) {
        if (!message.member.voice.channel) return message.channel.send( 'You must be in a voice channel!')
    if (!d.distube.isPlaying(message)) return message.channel.send('There is nothing playing!')
    d.distube.stop(message);
    message.channel.send('Done.')
	}
};
