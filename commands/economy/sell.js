module.exports = {
    name: 'sell',
    description: 'give items for a price to people',
    cooldown: 5,
    execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        let regex = /\d+/g;
        let numberOfItemsRaw = args.join(' ').match(regex);
        let numberOfItems = parseInt(numberOfItemsRaw);
        let item = args.join(' ').replace(numberOfItems, '').replace(' ', '');
        if (Object.keys(d.itemShop).includes(item)) {
            if (!item) {
                message.channel.send('Whaddya wanna sell?');
                return;
            }
            if (isNaN(numberOfItems) || !numberOfItemsRaw) {
                numberOfItems = 1;
            }
            if (numberOfItems === 0) {
                message.channel.send('ok boomer');
                return;
            }
            if (!currentObj) {
                message.channel.send("bruh you don't even have that item lol");
                return;
            }
            if (numberOfItems > currentObj) {
                message.channel.send("You don't have that many " + item + '(s)');
                return;
            }
            let gain = price * numberOfItems;
            d.addMoni(message.author.id, gain);
            currentObj -= numberOfItems;
            await d.items.set(message.author.id, inv);
            let sale;
            if (numberOfItems === 1) {
                sale = "a " + item
            } else {
                sale = numberOfItems + " " + item + "s"
            }
            const sell = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + "'s sale")
                .addFields({
                    name: 'Transaction',
                    value: 'You successfully sold ' + sale + " for " + price + " :star:s each!"
                }, {
                    name: 'Profit',
                    value: gain + " :star:s"
                })
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Marketplaces');
            return message.channel.send(sell);
        }
        else if (d.ores.tier1.includes(item) || d.ores.tier2.includes(item) || d.ores.tier3.includes(item)) {
            return message.channel.send('Ore support comin soon');
        }
        else {return message.channel.send('Bruh wdym that\'s not a valid item to sell');}
    }
};