const { Command } = require("../../structures");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "info",
                type: "utility",
                description: "Basic info about the bot.",
                usage: "No arguments required.",
                aliases: ["i"],
                saying: "It's not like the info is interesting.",
                cooldown: 2
            });
        }

        main(msg, args) {

            let uptime = this.client.uptime / 1000;
            let unit = "second(s)";
            if (uptime > 59 && unit === "second(s)") {
                uptime /= 60;
                unit = "minute(s)";
            }
            if (uptime > 59 && unit === "minute(s)") {
                uptime /= 60;
                unit = "hour(s)";
            }
            if (uptime > 23 && unit === "hour(s)") {
                uptime /= 24;
                unit = "day(s)";
            }

            const info = new msg.embed()
                .setTitle("Info")
                .addFields(
                    { name: "Version", value: this.client.config.version },
                    { name: "Uptime", value: `${Math.floor(uptime)} ${unit}` },
                    { name: "Todo List", value: this.client.config.todo.join("\n") },
                    { name: "Recent Update", value: "Database corruption lead to data wipe, actively working on solution to fix data, +meme command added." },
                    { name: "Credits", value: "Kinglalu, DAONE, and LinuxTerm | Goobermeister: graphics/emojis | MikeLime and CompactCow: Bugfixes/minor improvements | Originally by Horsey4 and Airplane Bong." },
                    { name: "Number of servers", value: this.client.guilds.cache.size },
                    { name: "Number of Users", value: this.client.users.cache.size }
                );
            msg.send(info);
        }
    };