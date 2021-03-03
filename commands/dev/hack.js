const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "hack",
                type: "dev",
                description: "Devs get free money!",
                usage: "<number>",
                aliases: ["hk"],
                saying: "N/A.",
                cooldown: 0
            });
        }

        main(msg, args) {
            if (!this.client.config.owners.has(msg.author.id)) return msg.send("Back off! Devs only!");

            if (args[0] === "reset") {
                this.add(msg.author.id, -this.getBalance(msg.author.id));
                return msg.send("Reset Balance!");
            }
            if (!+args[0]) return msg.send("That's not a valid number!");

            if (+args[0] > 100000) return msg.send("That's more than enough");

            this.eco.users.add(msg.author.id, +args[0]);

            msg.send("Done!");
        }
    };