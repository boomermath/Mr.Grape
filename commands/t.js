module.exports = {
	name: 't',
	description: 'dig to earn stars',
	cooldown: 0,
	execute(message, args, d) {
		async function e() {
		const obj = {
			apple:1,
			orange:2	
		}
	await d.items.set(message.author.id, obj)	
		}
		async function a() {
		let gugu = await d.items.get(message.author.id)
		message.channel.send(gugu.apple);
			message.channel.send(gugu.orange);
		}
		e();
		a();
	}
};
