module.exports = {
	name: 'e',
	description: 'stop playing music',
	cooldown: 2,
	execute(message, args, d) {
        const { currentChannel } = message.client.voice;
        if (currentChannel) {message.channel.send('e');}
	}
};
