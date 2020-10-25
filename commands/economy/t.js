module.exports = {
	name: 't',
	description: 'test',
	cooldown: 0,
	execute(message, args, d) {
      const users = d.items.opts.store.query('SELECT * FROM keyv')
      message.channel.send(users);
   }
};
