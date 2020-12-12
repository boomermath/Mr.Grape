/* eslint-disable no-unused-vars */
module.exports = {
	name: 'market',
	aliases: ['mk'],
	description: 'check ur balance',
	cooldown: 1,
	cd: 'Bruh its just ur balance, chill',
	fan: true,
	async execute(message, args, d) {
		const argument = args.join(' ');
		const regex = /\d+/g;
		let numItems = parseInt(argument.match(regex));
		let item = argument.replace(numItems, '');
		message.channel.send(item);
		if (!argument) return message.channel.send('What are ya selling nerd?');
		let auction = await d.auctions.get(message.author.id);
		const inv = await d.items.get(message.author.id);
		let guild = await d.guilds.get('auctions');
		if (!inv) return message.channel.send("You don't have anything smh");
		if (!auction) { auction = {}; }
		if (!guild) { guild = {}; }
		if (isNaN(numItems)) { numItems = 1; }
		message.channel.send(numItems)
		if (Object.keys(auction).length === 5) return message.channel.send('No more than 5 auctions at a time!');
		if (Object.keys(d.itemAliases).includes(item)) { item = d.itemAliases[item]; }
		message.channel.send(item);
		if (!d.validItems.includes(item)) return message.channel.send("Bruh that's not a valid item");
		if (!inv[item] && !inv.ore[item]) return message.channel.send("You don't have that item, git gud nerd");
		else if (inv[item] > numItems) return message.channel.send(`You don't have that many ${item}s`);
		else if (inv.ore[item] > numItems) return message.channel.send(`You don't have that many ${item} ores!`);
		if (auction[`${numItems} ${item}`]) return message.channel.send('You have another auction like this already!');
		const thisAuction = auction[`${numItems} ${item}`];
		const filter = m => m.author.id === message.author.id;
		message.channel.send('How much do you want to sell it for?');
		message.channel.awaitMessages(filter, {
			max: 1,
			time: 10000,
			errors: ['time']
		})
			.then(message => {
				message = message.first();
				var number = parseInt(message.content.match(regex));
				if (isNaN(number)) return message.channel.send("You didn't give me a **number** bruh");
				thisAuction.cost = number;
			})
			.catch(collected => message.channel.send('You took too long to answer'));
		inv[item] -= numItems;
		if (!guild[item]) {
			guild[item] = [];
			guild[item].push([message.author, numItems, item]);
		} else { guild[item].push([message.author, numItems, item]); }
		message.channel.send('Item is on auction, you cannot use it unless you cancel the sale!');
	}
};
