
module.exports = {
	name: 'play',
	description: 'play music',
	cooldown: 0,
	execute(message, args, d) {
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel!')
        let string = args.join(" ")
        if (!string) return message.channel.send('Please enter a song url or query to search.')
        try {
            d.distube.play(message, string)
        } catch (e) {
            message.channel.send('Error: ' + `${e}`)
        }
	}
};
