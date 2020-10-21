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
    if (numberOfItems === undefined) {
        numberofItems = 1;
    }
    if (numberOfItems === 0) {
        message.channel.send('ok karen');
        return;
    }
    if (!Object.keys(itemCost).includes(item)) {
        message.channel.send("dude that's not an item in the shop");
        return;
    }
    let total = itemCost[item] * numberOfItems;
    if (total > await d.users.get(message.author.id)) {
        message.channel.send('you donut have enough money, rip');
        return;
    }
    d.addMoni(message.author.id, -total)
    if (have[item] === undefined) {
        have[item] = 0
    }
    have[item] += numberOfItems
    d.items.set(message.author.id, have)
}
buy();
	}
};
