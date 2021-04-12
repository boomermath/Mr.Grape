const { Command, Embed } = require("../../structures");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "dice",
                type: "fun",
                aliases: ["roll"],
                description: "Roll a die!",
                usage: "No arguments required",
                cooldown: 5,
                saying: "Chill on the dice.",
            });
        }

        main(msg) {
            const diceRoll = new Embed()
                .setTitle(`${msg.author.username}'s die`)
                .addField("You rolled", this.randomize(6) + 1);
            msg.send(diceRoll);
        }
    };