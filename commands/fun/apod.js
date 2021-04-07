const { RequestCommand, Embed } = require("../../structures");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "apod",
                type: "fun",
                aliases: ["nasapic", "npod", "nasapicoftheday", "nasa"],
                description: "See pictures of space!",
                usage: "No arguments required",
                cooldown: 5,
                saying: "There's only one NASA pic.",
            });
        }

        async main(msg) {
            const response = await this.request({
                url: "https://api.nasa.gov/planetary/apod",
                params: {
                    api_key: process.env.NASA
                }
            });

            const pictureEmbed = new Embed()
                .setTitle("NASA Picture of the day!")
                .setImage(response.picture);
            msg.send(pictureEmbed);
        }
    };