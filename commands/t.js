module.exports = {
	name: 't',
	description: 'dig to earn stars',
	cooldown: 0,
	execute(message, args, d) {
    async function test() {
    const arr = [23,24,25,26,27]
    await items.set(message.author.id, arr);
    }
    async function test2() {
    let gu = await items.get(message.author.id);
    message.channel.send(gu[0])
       message.channel.send(gu[1])
          message.channel.send(gu[2])
             message.channel.send(gu[3])
             
    }
    test();
    test2();
	}
};
