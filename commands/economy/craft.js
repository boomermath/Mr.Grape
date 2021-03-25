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

            const craft = await this.eco.items.findOne({
                where: {
                    type: "craft",
                    [Op.or]: {
                        name: item,
                        alias: item
                    }
                }
            });

            if (!craft) return msg.send("That item doesn't exist!");

            for (const [ingredient, amount] of Object.entries(craft)) {
                const hasPart = await this.eco.ores.getOre(msg.author.id, ingredient, true);

                if (hasPart < amount * quantity) return msg.send(`You don't have enough ${ingredient}s to make ${item}!`);

                await this.eco.ores.addOre(msg.author.id, ingredient, -amount * quantity, true);
            }

            const craftEmbed = new msg.embed()
                .setTitle("Crafting")
                .addField("Success!", `You crafted ${this.format(item, quantity)}!`);
            msg.send(craftEmbed);
        }
    };
