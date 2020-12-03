module.exports = {
	name: 'e',
	description: 'stop playing music',
	cooldown: 2,
	execute(message, args, d) {
        const { currentChannel } = message.guild.voiceConnection;
        message.channel.send(currentChannel)
	}
};
