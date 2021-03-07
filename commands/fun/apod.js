const { RequestCommand } = require("../../structures");

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
                url: "https://api.nasa.gov/planetary/apod",
                params: {
                    api_key: process.env.NASA
                }
            });
        }

        async main(msg) {
            const { hdurl: picture } = await this.request();

            const pictureEmbed = new msg.embed()
                .setTitle("NASA Picture of the day!")
                .setImage(picture);
            msg.send(pictureEmbed);
        }
    };