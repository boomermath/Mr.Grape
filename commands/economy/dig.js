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

        chance(num) {
            return Math.floor(Math.random() * num) + 1;
        }

        async main(msg) {
            const earn = Math.round(Math.random() * this.eco.items.getItem(msg.author.id, "shovel") ? 15 : 6) + 1;

            const mineEmbed = new msg.embed()
                .setTitle(`${msg.author.username}'s mine`)
                .addField(`You dug up ${earn} :star:s!`, "\u200b");
        }
    };