const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "give",
                type: "economy",
                description: "Give :star:s to a user!",
                usage: "<optional user>",
                aliases: ["gift", "donate"],
                saying: "Chill on the genorosity.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const target = msg.mentions.users.first();
            const balance = this.eco.users.getBalance(msg.author.id);

            if (!balance) return msg.send("~~You're too broke.~~");

            if (!target) return msg.send("Who's gettin the :star:s?");
            else if (target.bot) return msg.send("No other bots (except me, cus im cool)");
            else if (target.id === msg.author.id) return msg.send("bruh you cant give golden stars to yourself smh");

            const number = args.find(e => e === "all") ? balance : +args.find(n => +n);

            if (!number || number < 0 || number > balance) return msg.send("that's not a valid amount smh");

            this.eco.users.add(target.id, number);
            this.eco.users.add(msg.author.id, -number);

            const giveEmbed = new msg.embed()
                .setTitle("Donation")
                .addField(`${msg.author.username}`, `gave ${number} :star:s to ${target.username}`);
            msg.send(giveEmbed);
        }
    };