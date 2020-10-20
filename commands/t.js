module.exports = {
	name: 't',
	description: 'dig to earn stars',
	cooldown: 0,
	execute(message, args, d) {
    async function test() {
    const arr = [23,24,25,26,27]
    await d.items.set(message.author.id, arr);
    }
    async function test2() {
    let gu = await d.items.get(message.author.id);
    message.channel.send(gu);
             
    }
    test();
    test2();
	}
};
