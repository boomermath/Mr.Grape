module.exports = {
    name: 'spacepic',
    description: 'get a nasa pic',
    aliases: ['nasapic', 'npod', 'nasapicoftheday', 'nasa'],
    cooldown: 3,
    cd: "Woah. Chill.",
    async execute(message, args, d) {
        let query = args.join(' ');
        if (!query) return message.channel.send('You gotta give me something to search up!')
        let NASAURL = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`
        let res = await d.r2.get(NASAURL).json;
        let url = res.collection.items[0].links[0].href;
        const nasa = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('NASA Picture of the Day!')
            .setImage(url)
            .setTimestamp()
            .setFooter('Grape Fortune-Telling');
        message.channel.send(nasa);
    }
};
