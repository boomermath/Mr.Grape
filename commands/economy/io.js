const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "invore",
                type: "economy",
                description: "See your ore inventory.",
                usage: "<optional user>",
                aliases: ["io"],
                saying: "Your ore inventory is fine.",
                cooldown: 2
            });
        }


        async main(msg) {
            const target = msg.mentions.users.first() || msg.author;

            if (target.bot) return msg.send("No other bots (except me, cus im cool)");

            const inventory = await this.eco.ores.findAll({
                where: { user_id: target.id },
                include: "ore"
            });

            const items = inventory.map(ore => [this.format(ore.ore.name, ore.amount), ore.amount]);

            const entries = items.length ? items : [["nothing but cobwebs and pebbles m8", "\u200b"]];

            msg.paginate({ title: `${target.username}'s inventory` }, entries, 5);
        }
    };