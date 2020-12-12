module.exports = {
    name: 'dog',
    description: 'get a dog pic',
    cooldown: 3,
    cd: "Dogs = epic, but chill",
    async execute(message, args, d) {
        const catapi = "https://api.thedogapi.com"
        const submitURL = catapi + `/v1/images/search?mime_types=jpg,png&limit=1&size=small`;
        const key = process.env.DOGAPI
        const pic = await d.r2.get(submitURL, { key }).json;
        const dog = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Dog!')
            .setImage(pic[0].url)
            .setTimestamp()
            .setFooter('Dog');
        message.channel.send(dog);
    }
};
