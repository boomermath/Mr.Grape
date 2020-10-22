module.exports = {
	name: 't',
	description: 'dig to earn stars',
	cooldown: 0,
	execute(message, args, d) {
	async function test() {
  let inv = await d.items.get(message.author.id);
  message.channel.send(Object.entries(inv));
  }
  test();
	}
};
