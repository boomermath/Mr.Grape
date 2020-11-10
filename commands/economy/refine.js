module.exports = {
    name: "refine",
    cooldown: 0,
    async execute(message, args, d) {
        let argument = args.join(' ');
        let inv = await d.users.get(message.author.id)
        if (argument === 'all') {
            function getCost() {
                let moni = 0;
                for (const key in inv.ore) {
                    if (key.includes('Refined') || key.includes('refined')) { continue; }
                    if (d.ores.tier1.includes(key)) { moni += 3 }
                    if (d.ores.tier2.includes(key)) { moni += 5 }
                    if (d.ores.tier3.includes(key)) { moni += 10 }
                }
                return moni;
            }
            let cost = getCost();
            if (cost > await d.users.get(message.author.id)) {
                const refine = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s refinement')
                    .addFields({
                        name: 'Cannot Refine',
                        value: 'You don\'t have the monies!'
                    })
                    .setTimestamp()
                    .setFooter('Grape Refinery');

                return message.channel.send(refine);
            }
           for (let key in inv.ore) {
            if (key.includes('Refined') || key.includes('refined')) { continue; }
            inv.ore["Refined " + key] = inv.ore[key];
            delete inv.ore[key];
           }
        }
    }
};
