const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "dig",
                type: "economy",
                description: "Dig in the mines for ores and more!",
                usage: "No arguments required",
                aliases: ["mine"],
                saying: "Mines will be bare. Chill.",
                cooldown: 2
            });
        }

        async main(msg) {
            
        }
    };