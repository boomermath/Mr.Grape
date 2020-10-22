module.exports = {
	name: 'buy',
	aliases: ['purchase'],
	description: 'buy stuff from the shop',
	cooldown: 2,
	execute(message, args, d) {
const blankObj = {}
const itemCost = {
    fan: 100,
    orangedetector: 100,
    mangodetector: 50,
    carrotdetector: 50,
    starmagnet: 100,
    starmill: 400
}
async function buy() {
    let have = await d.items.get(message.author.id);
    if (have === undefined || have === null) {
 	await d.items.set(message.author.id, blankObj)
	have = blankObj;
    }
    let regex = /\d+/g;
    let numberOfItemsRaw = args.join(' ').match(regex);
    let numberOfItems = parseInt(numberOfItemsRaw);
    let item = args.join(' ').replace(numberOfItems, '').replace(' ', '');
      if (numberOfItemsRaw === NaN || numberOfItemsRaw === null || numberOfItemsRaw === undefined) {
        numberOfItems = 1;
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
    if (have[item] === undefined || have[item] === null) {
	have[item] = 0;
    }
    have[item] += numberOfItems
    d.items.set(message.author.id, have);
    let receipt;
    if (numberOfItems === 1) {receipt = "You successfully purchased a " + item + "!";}
    else {receipt = "You successfully purchased "+ numberOfItems + " " + item + "s!";}
	    const buy = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + "'s purchase")
                .addFields({
                    name: 'Receipt',
                    value: receipt
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Marketplaces');
            message.channel.send(buy);
}
buy();
	}
};
	
