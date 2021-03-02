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
            if (!number) return [0, 0]
            args.splice(args.indexOf(number), 1)
            return [args[0], +number];
        }

        async main(msg, args) {
            const [itemName, number] = this.parseArgs(args);

            if (!itemName) return msg.send("ok karen");

            const item = await this.model.shop.findOne({ where: { name: itemName } });

            if (!item) return msg.send("That's not a valid item bruh");
            if (item.price > this.getBalance(msg.author.id)) return msg.send("Ur too broke to buy that");

            await this.addItem(msg.author.id, item, number);
            this.add(msg.author.id, -item.price);

            const receipt = new msg.embed()
                .setTitle("Purchase")
                .addField("Receipt", `You purchased ${number} ${item.name}${number > 1 ? "s" : ""}!`);
            msg.send(receipt)
        }
    };