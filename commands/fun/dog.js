module.exports = {
    name: 'dog',
    description: 'get a dog pic',
    cooldown: 3,
    cd: "Dogs = epic, but chill",
    async execute(message, args, d) {
        let catapi = "https://api.thedogapi.com"
        let key = process.env.DOGAPI;
        let submitURL = catapi + `/v1/images/search?mime_types=jpg,png&limit=1&size=small`;
        let pic = await d.r2.get(submitURL, { key }).json;
        const dog = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('NASA Picture of the Day!')
            .setImage(pic[0].url)
            .setTimestamp()
            .setFooter('Grape Fortune-Telling');
        message.channel.send(dog);
    }
};
