module.exports = {
    name: 'collect',
    aliases: ['col'],
    description: 'collect the stars from your starmill!',
    cooldown: 600,
    description: 'collect stars if you have a starmill',
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        let collectedStars;
        const rn = Date.now();
        if (!inv || !inv.starmill || inv.starmill === 0) { return message.channel.send('You don\'t have a starmill! ~~broke man~~'); }
        if (typeof inv.starmill !== 'object') {
            inv.starmill = [inv.starmill, rn]
            collectedStars = inv.starmill;
            await d.items.set(message.author.id, inv);
        }
        else {
            const arr = inv.starmill;
            let elapsedTime = Math.floor((rn - arr[1]) / 60000);
            collectedStars = arr[0] * (elapsedTime / 1);
        }
        d.addMoni(message.author.id, collectedStars)
        const colEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s collection of stars`)
            .addFields({
                name: 'Collected',
                value: collectedStars + " :star:s"
            })
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');
        message.channel.send(colEmbed);

    }
};
