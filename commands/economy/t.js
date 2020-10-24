module.exports = {
	name: 't',
	description: 'test',
	cooldown: 0,
	execute(message, args, d) {
      const users = d.Keyv.opts.store.query('FROM * SELECT keyv')
      message.channel.send(users);
   }
};
