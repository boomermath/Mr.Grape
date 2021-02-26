const { Command } = require("../../structures");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "prefix",
                type: "utility",
                description: "Set the bot's prefix.",
                usage: "<prefix>",
                saying: "Don't prefix.",
                cooldown: 2
            });
        }

        async main(msg, args) {
            if (!args[0]) return msg.send("Give me a prefix.");

            const database = this.client.database;
            const guildPrefix = database.cache.guilds.get(msg.guild.id);
            const isDefaultPrefix = args[0] === this.client.config.prefix;

            if (!guildPrefix) {
                if (isDefaultPrefix) return msg.send("That's already my prefix!");
                const newEntry = await database.guilds.create({ guild_id: msg.guild.id, prefix: args[0] });
                database.cache.guilds.set(msg.guild.id, newEntry);
            }

            else {
                if (isDefaultPrefix) guildPrefix.destroy();
                else {
                    guildPrefix.prefix = args[0];
                    guildPrefix.save();
                }
            }

            const prefixEmbed = new msg.embed()
                .setTitle("Prefix")
                .addField("Set to", args[0])
            msg.send(prefixEmbed);
        }
    };