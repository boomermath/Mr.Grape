const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "balance",
                type: "economy",
                description: "Get a user's balance.",
                usage: "<optional user>",
                aliases: ["bal", "wallet"],
                saying: "Your balance is fine.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const target = msg.mentions.users.first() || msg.author;

            const balEmbed = new msg.embed()
                .setTitle("Balance")
                .addField(target.username, `${this.getBalance(target.id)} :star:s`)
            msg.send(balEmbed);
        }
    };