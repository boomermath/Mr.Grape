module.exports = {
	name: 'rr',
	description: 'set prefix',
	cooldown: 2,
	async execute(message, args, d) {
        await d.guilds.clear();
        message.channel.send('done')
	}
}; 
