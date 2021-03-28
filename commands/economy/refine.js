const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "refine",
                type: "economy",
                description: "Get a user's balance.",
                usage: "<optional user>",
                aliases: ["rf"],
                saying: "Chill on the refining.",
                cooldown: 2
            });
        }

        recipt(string, amount, ores) {

        }

        async main(msg) {
            const details = {
                cost: 0,
                ores: ""
            }

            if (msg.params.join(" ") === "all") {
                const ores = await this.eco.ores.findAll({ where: { user_id: msg.author.id, refined: false } });

                details.cost = ores.reduce((acc, cur) => acc + cur.amount * cur.price, 0);

                if (details.cost > this.eco.users.getBalance(msg.author.id)) return msg.send("You don't have the money to refine all of you ores!");

                for (const ore of ores) {
                    ore.refined = true;
                    ore.save();
                }

                details.ores += "all"
            }
            else if (msg.params.find(arg => arg === "all")) {
                msg.params.splice(msg.params.indexOf("all", 1))

                const ore = await this.eco.ores.getOre(msg.author.id, msg.params.join(" "))
                    .catch(() => {
                        throw msg.send("That's not a valid ore to refine!");
                    })

                if (!ore) return msg.send("You don't have that ore!")

                details.cost += ore.price * ore.amount;
                details.ores += ore.name;

                if (details.cost > this.eco.users.getBalance(msg.author.id)) return msg.send(`You can't afford to refined ur ${ore.name} ores`);

                ore.refined = true;
                ore.save();
            }
            else {
                const [item, quantity] = this.getNameAmt(msg);

                try {
                    const rawOre = await this.eco.ores.getOre(msg.author.id, item);
                    const cost = rawOre.amount * quantity;

                    if (rawOre.amount < quantity) return msg.send(`You don't have ${quantity} ${item} ores!`);
                    else if (cost > this.eco.users.getBalance(msg.author.id)) return msg.send("~~ur too broke~~");

                    details.cost += cost;

                    await this.eco.ores.addOre(msg.author.id, rawOre, quantity, true);
                    await this.eco.ores.addOre(msg.author.id, rawOre, -quantity);
                } catch {
                    return msg.send("That's not a valid item")
                }
            }

            if (await this.eco.items.getItem(msg.author.id, "personal refinery")) details.cost = 0;

            const refineEmbed = new msg.embed()
                .setTitle(`${msg.author.username}'s refinement`)
                .addField(
                    `You refined 
                    ${details.ores === "all" ? "all your" : this.format(details.ores, details.cost)} 
                    ores for ${details.cost} :star:s ${details.cost ? "because you have a personal refiner (flexx)" : "!"}`,
                    "\u200b"
                )
            msg.send(refineEmbed)
        }
    };
