const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "leaderboard",
                type: "economy",
                description: "Check out the global leaderboard!.",
                usage: "No arguments",
                aliases: ["lb", "top"],
                saying: "What a scrub.",
                cooldown: 2
            });
        }

        async main(msg) {
            const collection = [...this.eco.users.cache.sort((a, b) => b.balance - a.balance).first(10).values()];
            const leaderboard = new msg.embed().setTitle("Global Leaderboard");

            for (const person of collection) {
                const user = await this.client.users.fetch(person.id);
                leaderboard.addField(`${collection.indexOf(person) + 1}. ${user.tag}: ${person.balance}`, "\u200b");
            }   

            msg.send(leaderboard);
        }
    };
