module.exports = {
    name: 'ore',
    description: 'display ores you can get',
    aliases: ['ores'],
    cooldown: 2,
    execute(message, args, d) {
        const ore = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('The Ores')
            .setDescription("A list of ores you can obtain by buying/mining.")
            .addFields({
                name: 'Tier 1',
                value: 'Copper, Tin , Iron, Lead, Silver, Bronze'
            }, {
                name: 'Tier 2',
                value: 'Gold, Platinum, Titanium, Obsidian, Cobalt'
            }, {
                name: 'Tier 3',
                value: 'Starium, Lumionite, Hellinite, Grapium\n'
            }, {
                name: 'Pickaxes',
                value: 'Tier 1: Allows you to get Tier 1 ores, and gives you a small chance of getting Tier 2 ores.\nTier 2: Increases chance of getting Tier 2 ores, small chance of getting Tier 3 ores.\nTier 3: Increases chance of getting Tier 3 ores.'
            },)
            .setTimestamp()
            .setFooter('Grape Mining Corp');

        message.channel.send(ore);

    }
};
