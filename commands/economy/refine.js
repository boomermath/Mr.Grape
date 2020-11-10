module.exports = {
    name: 'refine',
    description: 'give items for a price to people',
    cooldown: 5,
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        if (!inv || !inv.ore) { message.channel.send('Bruh you don\'t even have any ores, git good'); }
        if (args.join('') === 'all') {
            let item = inv.ore;
            let cost = 0;
            for (const ore in item) {
                let cost = 0;
                if (d.ores.tier1.includes(ore)) {
                    cost += 3
                }
                if (d.ores.tier2.includes(ore)) {
                    cost += 5
                }
                if (d.ores.tier3.includes(ore)) {
                    cost += 10
                }
            }
            if (cost > await d.users.get(message.author.id)) { return message.channel.send('You don\'t have enough money! ~~broke~~'); }
            d.addMoni(message.author.id, -cost);
            for (const ore in item) {
                item["Refined " + ore] = item[ore];
                delete item[ore];
            }
            await d.items.set(message.author.id, inv)
            const refine = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + ' refinement')
                .addFields({
                    name: 'Refinery',
                    value: `It cost you ${cost} to refine all of your ores!`
                })
                .setTimestamp()
                .setFooter('Grape Refinery');

            message.channel.send(refine);
        }
        else {
            let regex = /\d+/g;
            let numberOfItemsRaw = args.join(' ').match(regex);
            let numberOfItems = parseInt(numberOfItemsRaw);
            let item = args.join('').replace(numberOfItems, '');
            if (numberOfItemsRaw === NaN || numberOfItemsRaw === null || numberOfItemsRaw === undefined) { numberOfItems = 1; }
            if (numberOfItems === 0) { return message.channel.send('ok boomer'); }
            else if (!Object.keys(d.ores).includes(item)) {
                const refine = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + ' refinement')
                    .addFields({
                        name: 'Cannot Refine',
                        value: 'That\'s not a valid item!'
                    })
                    .setTimestamp()
                    .setFooter('Grape Refinery');

                return message.channel.send(refine);
            }
            else if (!inv.ore[item]) {
                const refine = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + ' refinement')
                    .addFields({
                        name: 'Cannot Refine',
                        value: 'Bruv you don\'t even have that item.'
                    })
                    .setTimestamp()
                    .setFooter('Grape Refinery');

                return message.channel.send(refine);
            }
            else {
                if (args.join('').includes('all')) {
                    let amount = inv.ore[item];
                    let cost = 0;
                    if (d.ores.tier1.includes(ore)) {
                        cost += 3 * amount;
                    }
                    if (d.ores.tier2.includes(ore)) {
                        cost += 5 * amount;
                    }
                    if (d.ores.tier3.includes(ore)) {
                        cost += 10 * amount;
                    }
                    d.addMoni(message.author.id, -cost)
                    inv.ore["Refined " + item] = inv.ore[item];
                    delete inv.ore[item];
                    await d.items.set(messsage.author.id, inv)
                    const refine = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + ' refinement')
                        .addFields({
                            name: 'Refined',
                            value: `Successfully refined ${amount} ${args.join('').replace('all', '')}(s)`
                        })
                        .setTimestamp()
                        .setFooter('Grape Refinery');
                    message.channel.send(refine);
                }
                else {
                    let cost = 0;
                    if (d.ores.tier1.includes(ore)) {
                        cost += 3 * numberOfItems;
                    }
                    if (d.ores.tier2.includes(ore)) {
                        cost += 5 * numberOfItems;
                    }
                    if (d.ores.tier3.includes(ore)) {
                        cost += 10 * numberOfItems;
                    }
                    d.addMoni(message.author.id, -cost);
                    inv.ore[item] -= numberOfItems;
                    if (!inv.ore["Refined " + item]) { inv.ore["Refined " + item] = numberOfItems }
                    else { inv.ore["Refined " + item] += numberOfItems }
                    const refine = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + ' refinement')
                        .addFields({
                            name: 'Refined',
                            value: `Successfully refined ${numberOfItems} ${item}(s)`
                        })
                        .setTimestamp()
                        .setFooter('Grape Refinery');
                    message.channel.send(refine);
                }
            }
        }
    }
};