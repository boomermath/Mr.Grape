module.exports = {
	name: 'e',
	description: 'stop playing music',
	cooldown: 2,
	execute(message, args, d) {
        const { currentChannel } = message.guild.voiceChannel;
        message.channel.send(currentChannel)
	}
};
