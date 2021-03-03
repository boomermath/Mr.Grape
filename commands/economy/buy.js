const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "buy",
                type: "economy",
                description: "Buy junk.",
                usage: "<item> <number>",
                aliases: ["purchase"],
                saying: "You have enough junk.",
                cooldown: 10
            });
        }

        parseArgs(args) {
            if (args.length === 1) return [args[0], 1];
            const number = args.find(e => +e);
            if (!number) return [false];
            args.splice(args.indexOf(number), 1)
            return [args[0], +number];
        }

        async main(msg, args) {
            const [itemName, number] = this.parseArgs(args);

            if (!itemName) return msg.send("ok karen");

            const item = await this.eco.shop.findOne({ where: { name: itemName } });
            const cost = item.price * number;

            if (!item) return msg.send("That's not a valid item bruh");
            if (cost > this.eco.users.getBalance(msg.author.id)) return msg.send("Ur too broke to buy that");

            await this.eco.items.addItem(msg.author.id, item, number);
            this.eco.users.add(msg.author.id, -cost);

            const receipt = new msg.embed()
                .setTitle("Purchase")
                .addField("Receipt", `You purchased ${number} ${item.name}${number > 1 ? "s" : ""}!`);
            msg.send(receipt)
        }
    };