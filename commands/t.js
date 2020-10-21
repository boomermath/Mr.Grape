module.exports = {
	name: 't',
	description: 'dig to earn stars',
	cooldown: 0,
	execute(message, args, d) {
		const blankObj = {};
const itemCost = {
    fan: 100,
    orangeDetector: 100,
    mangoDetector: 50,
    carrotDetector: 50,
    starMagnet: 100,
    starMill: 400
}

async function buy() {
    let have = await d.items.get(message.author.id);
    if (have === undefined || have === null) {
        await d.items.set(message.author.id, blankObj)
    }
    let regex = /\d+/g;
    let numberOfItems = parseInt(args.join(' ').match(regex));
    let item = args.join(' ').replace(numberOfItems, '').replace(' ', '');
    message.channel.send(item);
    message.channel.send(numberOfItems);
}
buy();
	}
};
