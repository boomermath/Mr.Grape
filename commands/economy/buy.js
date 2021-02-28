const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "buy",
                type: "economy",
                description: "Buy junk.",
                usage: "<optional user>",
                aliases: ["purchase"],
                saying: "You have enough junk.",
                cooldown: 2
            });
        }

        main(msg, args) {
            //later
        }
    };