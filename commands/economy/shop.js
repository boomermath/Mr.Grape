const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "shop",
                type: "economy",
                description: "Display the shop.",
                usage: "No arguments required.",
                aliases: ["mall", "imadivaandiloveshopping"],
                saying: "Your balance is fine.",
                cooldown: 2
            });
        }

        async main(msg) {
            const shop = await this.eco.shop.findAll({ where: { type: "shop" } });

            const shopEntry = shop
                .sort((a, b) => a.price - b.price)
                .map(item => [item.name, item.description, item.price]);

            const shopEmbed = new msg.embed()
                .setTitle("Shop")
                .setDescription(`Buy an item by using ${msg.prefix}buy <itemname>!`);

            for (const [name, description, price] of shopEntry) {
                shopEmbed.addField(`${name.charAt(0).toUpperCase()}${name.slice(1)}`,
                    `${description}\nCost: **${price}:star:s**`
                );
            }

            msg.send(shopEmbed);
        }
    };