module.exports = {
    name: 'dog',
    description: 'get a dog pic',
    cooldown: 3,
    async execute(message, args, d) {
        let catapi = "https://api.thedogapi.com"
        let key = process.env.DOGAPI;
        let submitURL = catapi + `/v1/images/search?mime_types=jpg,png&limit=1&size=small`;
        let pic = await d.r2.get(submitURL, { key }).json;
        message.channel.send({ files: [pic[0].url] });
    }
};
