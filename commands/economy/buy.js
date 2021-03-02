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

        async addItem(id, item, number) {
            const userItem = this.eco.inventories.findOne({
                where: { user_id: id, item_id: item.id },
            });

            if (userItem) {
                userItem.amount += amount;
                if (!userItem.amount) return userItem.destroy();
                return userItem.save();
            }

            return this.eco.inventories.create({ user_id: id, item_id: item.id, amount: amount });
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
            if (cost > this.getBalance(msg.author.id)) return msg.send("Ur too broke to buy that");

            await this.addItem(msg.author.id, item, number);
            this.add(msg.author.id, -cost);

            const receipt = new msg.embed()
                .setTitle("Purchase")
                .addField("Receipt", `You purchased ${number} ${item.name}${number > 1 ? "s" : ""}!`);
            msg.send(receipt)
        }
    };