const { EconomyCommand, Embed } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "russianroulette",
                type: "economy",
                description: "1/6 chance you lose all your money. 5/6 chance you multiply your bet by 2x.",
                usage: "No arguments required.",
                aliases: ["rr"],
                saying: "Pew pew.",
                cooldown: 2
            });
        }

        main(msg) {
                
        }
    };
