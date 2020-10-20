module.exports = {
	name: 't',
	description: 'dig to earn stars',
	cooldown: 0,
	execute(message, args, d) {
    async function buy() {
	    const obj = {
		apple: 1,
		banana: 2
	    }
    let haveRaw = await d.items.set(message.author.id, obj);    
    
	    
    }	    
		async function reu () {
		let somethin = await d.items.get(message.author.id);
		message.channel.send(somethin.apple);
		}
		
		
		buy();
		reu();
	}
};
