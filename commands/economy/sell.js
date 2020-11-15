module.exports = {
    name: 'sell',
    description: 'give items for a price to people',
    cooldown: 5,
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        let argument = args.join('');
        let oreConcat = d.ores.tier1.concat(d.oreSell.tier2, d.oreSell.tier3);
        let item;
        if (Object.keys(d.itemShop).some(e => argument.includes(e))) {
            if (argument.includes('all')) {
                item = argument.replace('all');
                if (!inv[item]) { return message.channel.send('You dont\'t have that item!') }
                let profit = (d.itemShop[item] / 2) * inv[item];
                d.addMoni(message.author.id, profit);
                delete inv[item];
                const saleAll = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s sale')
                    .addFields(
                        { name: 'Transaction', value: `You sold all of your ${item}s for ${d.itemShop[item] / 2} :star:s each!` },
                        { name: 'Profit', value: `${profit} :star:s` }
                    )
                    .setTimestamp()
                    .setFooter('Grape Marketplaces');

                message.channel.send(saleAll);
            }
            else {
                let numItems = parseInt(argument.replace(Object.keys(d.itemShop), ''));
                item = argument.replace(numItems, '');
                if (!inv[item]) { return message.channel.send('You dont\'t have that item!') }
                if (isNaN(numItems) || numItems < 0) { numItems = 1; }
                if (numItems === 0) { return message.channel.send('ok boomer'); }
                if (numItems > inv[item]) { return message.channel.send(`You don't have that many ${item}(s)`); }
                inv[item] -= numItems;
                let profit = (d.itemShop[item] / 2) * numItems;
                d.addMoni(message.author.id, profit);
                let receipt;
                if (numItems === 1) { receipt = `You sold a ${item} for ${d.itemShop[item] / 2} :star:s each!` }
                else { receipt = `You sold ${numItems} ${item}s for ${d.itemShop[item] / 2} :star:s each!` }
                const sale = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s sale')
                    .addFields(
                        { name: 'Transaction', value: receipt },
                        { name: 'Profit', value: `${profit} :star:s` }
                    )
                    .setTimestamp()
                    .setFooter('Grape Marketplaces');

                message.channel.send(sale);
            }
            await d.items.set(message.author.id, inv);
        }
        else if (oreConcat.some(e => argument.includes(e))) {
            if (argument.includes('all')) {
                item = argument.replace('all', '');
                if (!inv.ore[item]) { return message.channel.send('Bruh you don\'t have that ore'); }
                let profit = 0;
                let each;
                if (argument.includes(d.ores.tier1)) {
                    if (item.includes("refined")) {
                        each = d.oreSell.tier1 * 2;
                        profit += each * inv[item];
                    }
                    else {
                        each = d.oreSell.tier1;
                        profit += each * inv[item];
                    }
                }
                else if (argument.includes(d.ores.tier2)) {
                    if (item.includes("refined")) {
                        each = d.oreSell.tier2 * 2;
                        profit += each * inv[item];
                    }
                    else {
                        each = d.oreSell.tier2;
                        profit += each * inv[item];
                    }
                }
                else if (argument.includes(d.ores.tier3)) {
                    if (item.includes("refined")) {
                        each = d.oreSell.tier3 * 2
                        profit += each * inv[item];
                    }
                    else {
                        each = d.oreSell.tier3;
                        profit += each * inv[item]
                    }
                }
                d.addMoni(message.author.id, profit);
                delete inv[item];
                const sale = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s sale')
                    .addFields(
                        { name: 'Transaction', value: `You sold all of your ${item}s for ${each} :star:s each!` },
                        { name: 'Profit', value: `${profit} :star:s` }
                    )
                    .setTimestamp()
                    .setFooter('Grape Marketplaces');

                message.channel.send(sale);
            }
            else {
                let numItems = parseInt(argument.replace(oreConcat, '').replace('refined', ''));
                item = argument.replace(numItems, '');
                if (!inv.ore[item]) { return message.channel.send('You dont\'t have that item!') }
                if (isNaN(numItems) || numItems < 0) { numItems = 1; }
                if (numItems === 0) { return message.channel.send('ok boomer'); }
                if (numItems > inv.ore[item]) { return message.channel.send(`You don't have that many ${item}(s)`); }
                let profit = 0;
                let each;
                if (argument.includes(d.ores.tier1)) {
                    if (item.includes("refined")) {
                        each = d.oreSell.tier1 * 2;
                        profit += each * numItems;
                    }
                    else {
                        each = d.oreSell.tier1;
                        profit += each * numItems;
                    }
                }
                else if (argument.includes(d.ores.tier2)) {
                    if (item.includes("refined")) {
                        each = d.oreSell.tier2 * 2;
                        profit += each * numItems;
                    }
                    else {
                        each = d.oreSell.tier2;
                        profit += each * numItems;
                    }
                }
                else if (argument.includes(d.ores.tier3)) {
                    if (item.includes("refined")) {
                        each = d.oreSell.tier3 * 2
                        profit += each * numItems;
                    }
                    else {
                        each = d.oreSell.tier3;
                        profit += each * numItems;
                    }
                }
                d.addMoni(message.author.id, profit);
                inv.ore[item] -= numItems;
                let receipt;
                if (numItems === 1) { receipt = `You sold a ${item} for ${each} :star:s each!` }
                else { receipt = `You sold ${numItems} ${item}s for ${each} :star:s each!` }
                const sale = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s sale')
                    .addFields(
                        { name: 'Transaction', value: receipt },
                        { name: 'Profit', value: `${profit} :star:s` }
                    )
                    .setTimestamp()
                    .setFooter('Grape Marketplaces');

                message.channel.send(sale);
            }
            await d.items.set(message.author.id, inv);
        }
    }
};
