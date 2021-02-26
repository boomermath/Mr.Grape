const { RequestCommand } = require("../../structures");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "dog",
                type: "fun",
                aliases: ["woof"],
                description: "Get dog pictures!",
                usage: "No arguments required",
                cooldown: 2,
                saying: "Dogs = epic, but chill.",
                url: "https://api.thedogapi.com/v1/images/search",
                params: {
                    mime_types: "jpg,png",
                    limit: 1,
                    size: "small"
                }
            })
        }

        async main(msg, args) {
            const picture = await this.request();

            const dogEmbed = new msg.embed()
                .setTitle(`Woof!`)
                .setImage(picture[0].url)
            msg.send(dogEmbed)
        }
    }