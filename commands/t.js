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
            await d.item.set(message.author.id, blankObj)
        }
        let regex = /\d+/g;
        let numberOfItems = args.join(' ').match(regex);
	if (numberOfItems === undefined) {numberofItems = 1;}
	if (numberOfItems === 0) {message.channel.send('ok karen'); return;}
        let item = args.join(' ').replace(numberOfItems, '').replace(' ', '');
        for (var key in itemCost) {
            if (key !== item) {
                message.channel.send("dude that's not an item in the shop")
                break;
		return;
            }
        }
	let total = itemCost.item * numberOfItems;
       if (total > await users.get(message.author.id)) {message.channel.send('you donut have enough money, rip'); return;}
       d.addMoni(message.author.id, -total)
       if (have.item === undefined) {have.item = 0}
	have.item += numberOfItems
    }	    
  buy();
	}
};
