const { Op } = require("sequelize");
const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "craft",
                type: "economy",
                description: "Craft an item using ores!.",
                usage: "<item> <amt>",
                aliases: ["make", "create"],
                saying: "Give yourself a rest.",
                cooldown: 2
            });
        }

        async main(msg) {
            const [item, quantity] = this.getNameAmt(msg);

            const craft = await this.eco.shop.findOne({
                where: {
                    type: "craft",
                    [Op.or]: {
                        name: item,
                        alias: item
                    }
                }
            });

            if (!craft) return msg.send("That item doesn't exist!");

            const itemDescription = this.format(craft.name, quantity)

            for (const [ingredient, amount] of Object.entries(craft.recipe)) {
                const hasPart = await this.eco.ores.getOre(msg.author.id, ingredient, true);

                if (hasPart < amount * quantity) return msg.send(`You don't have enough ${ingredient}s to make ${itemDescription}!`);

                await this.eco.ores.deleteOre(msg.author.id, ingredient, amount * quantity, true);
            }

            await this.eco.items.addItem(msg.author.id, craft, quantity);

            const craftEmbed = new msg.embed()
                .setTitle("Crafting")
                .addField("Success!", `You crafted ${itemDescription}!`);
            msg.send(craftEmbed);
        }
    };
