module.exports = {
	name: 'e',
	description: 'stop playing music',
	cooldown: 2,
	execute(message, args, d) {
        const { currentChannel } = message.client.voice;
        message.channel.send(currentChannel)
	}
};
