const { RequestCommand } = require("../../structures");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "joke",
                type: "fun",
                aliases: ["jk"],
                description: "Get a joke!",
                usage: "No arguments required",
                cooldown: 3,
                saying: "Haha, big funny, finish laughing first.",
                url: "https://sv443.net/jokeapi/v2/joke/Pun",
                params: {
                    blacklistFlags: "nsfw,religious,political,racist,sexist",
                    format: "json",
                }
            });
        }

        async main(msg, args) {
            const { setup, delivery } = await this.request();

            const jokeEmbed = new msg.embed()
                .setTitle("Meow!")
                .addField(setup, delivery);
            msg.send(jokeEmbed);
        }
    };