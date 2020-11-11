module.exports = {
    name: "refine",
    cooldown: 0,
    async execute(message, args, d) {
        let argument = args.join(' ').toLowerCase();
        let inv = await d.items.get(message.author.id)
        if (!inv || !inv.ore) { return message.channel.send('Bruh you don\'t got ores git good'); }
        if (argument === 'all') {
            function getCost() {
                let moni = 0;
                for (const key in inv.ore) {
                    if (key.includes('Refined') || key.includes('refined')) { continue; }
                    if (d.ores.tier1.includes(key)) { moni += 3 * inv.ore[key] }
                    if (d.ores.tier2.includes(key)) { moni += 5 * inv.ore[key] }
                    if (d.ores.tier3.includes(key)) { moni += 10 * inv.ore[key] }
                }
                return moni;
            }
            let cost = getCost();
            if (cost > await d.users.get(message.author.id)) {
                const error = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s refinement')
                    .addFields({
                        name: 'Cannot Refine',
                        value: 'You don\'t have the monies!'
                    })
                    .setTimestamp()
                    .setFooter('Grape Refinery');

                return message.channel.send(error);
            }
            if (cost === 0) { return message.channel.send('There\'s nothing to refine!') }
            for (let key in inv.ore) {
                if (key.includes('Refined') || key.includes('refined')) { continue; }
                inv.ore["Refined " + key] = inv.ore[key];
                delete inv.ore[key];
            }
            d.addMoni(message.author.id, -cost);
            await d.items.set(message.author.id, inv);
            const refine = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + '\'s refinement')
                .addFields({
                    name: 'Refined',
                    value: `Successfully refined all of your ores for ${cost} :star:s!`
                })
                .setTimestamp()
                .setFooter('Grape Refinery');

            return message.channel.send(refine);
        }
        else {
            if (argument.includes('all')) {
                let item = argument.replace('all', '').replace(' ', '');
                message.channel.send(item);
                if (!d.ores.tier1.includes(item) || !d.ores.tier2.includes(item) || !d.ores.tier3.includes(item)) {
                    const e = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + '\'s refinement')
                        .addFields({
                            name: 'Cannot Refine',
                            value: 'That ore doesn\'t exist bruh'
                        })
                        .setTimestamp()
                        .setFooter('Grape Refinery');
                    return message.channel.send(e);
                }
                if (!inv.ore[item]) {
                    const e = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + '\'s refinement')
                        .addFields({
                            name: 'Cannot Refine',
                            value: 'You don\'t have that ore, git good.'
                        })
                        .setTimestamp()
                        .setFooter('Grape Refinery');
                    return message.channel.send(e);
                }
                function getCostSingle() {
                    let moni = 0;
                    if (d.ores.tier1.includes(item)) { moni += 3 * inv.ore[item] }
                    if (d.ores.tier2.includes(item)) { moni += 5 * inv.ore[item] }
                    if (d.ores.tier3.includes(item)) { moni += 10 * inv.ore[item] }
                    return moni;
                }
                let cost = getCostSingle();
                if (!inv.ore["Refined " + item]) { inv.ore["Refined " + item] = inv.ore[item]; }
                else { inv.ore["Refined " + item] += inv.ore[item]; }
                delete inv.ore[item];
                d.addMoni(message.author.id, -cost);
                await d.items.set(message.author.id, inv);
                const r = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s refinement')
                    .addFields({
                        name: 'Refined',
                        value: `You refined your ${item} ore(s) for ${cost} :star:s`
                    })
                    .setTimestamp()
                    .setFooter('Grape Refinery');
                return message.channel.send(r);
            }
        }
    }
};
