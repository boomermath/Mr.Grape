module.exports = {
    name: 'market',
    aliases: ['mk'],
    description: 'check ur balance',
    cooldown: 1,
    cd: 'Bruh its just ur balance, chill',
    fan: true,
    async execute(message, args, d) {
        let argument = args.join(' ');
        const regex = /\d+/g;
        let numItems = parseInt(argument.match(regex));
        let item = argument.replace(numItems, '')
        if (!argument) return message.channel.send("What are ya selling nerd?")
        let auction = await d.auctions.get(message.author.id);
        let inv = await d.items.get(message.author.id);
        let guild = await d.guilds.get('auctions');
        if (Object.keys(auction).length === 5) return message.channel.send("No more than 5 auctions at a time!")
        if (!inv) return message.channel.send("You don't have anything smh");
        if (!auction) { auction = {} }
        if (!guild) { guild = {} }
        if (!d.validItems.includes(item) && !d.itemAliases.includes(item)) return message.channel.send("Bruh that's not a valid item");
        if (d.itemAliases.includes(item)) { item = d.itemAliases[item]; }
        if (!inv[item] && !inv.ore[item]) return message.channel.send("You don't have that item, git gud nerd");
        else if (inv[item] > numItems || inv.ore[item] > numItems) return message.channel.send(`You don't have that many ${item}s`)
        if (auction[`${numItems} ${item}`]) return message.channel.send("You have another auction like this already!");
        let thisAuction = auction[`${numItems} ${item}`];
        let filter = m => m.author.id === message.author.id;
        message.channel.send("How much do you want to sell it for")
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
        })
            .then(message => {
                message = message.first()
                var number = parseInt(message.content);
                if (isNaN(number)) return message.channel.send("Invalid number, do ya know how to count?");
            })
            .catch(collected => {
                return message.channel.send("You took too long to answer");
            });
        thisAuction = number;
        inv[item] -= numItems;
        if (!guild[item]) {
            guild[item] = [];
            guild[item].push(`${message.author.id} ${numItems} ${item}`)
        }
        else { guild[item].push(`${message.author.id} ${numItems} ${item}`) }

    }
};
