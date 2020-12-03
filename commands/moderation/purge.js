module.exports = {
	name: 'purge',
	description: 'purge messages from a channel',
	cooldown: 0,
	execute(message, args, d) {
        if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('You don\'t have perms!')
        if (!args[0]) return message.channel.send('Bruh how many messages should I purge?');
        message.channel.bulkDelete(parseInt(args[0]));
	}
};
