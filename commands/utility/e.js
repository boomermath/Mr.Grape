module.exports = {
	name: 'e',
	cooldown: 0,
	async execute(message, args, d) {
		d.guilds.delete(message.guild.id);
	}
}; 
