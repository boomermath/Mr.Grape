const { Command } = require("../../structures");
//Something kinglalu can copy and paste to make a command
module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "server",
                type: "utility",
                description: "Get basic server info.",
                usage: "No arguments required.",
                aliases: ["guild"],
                saying: "Server.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const guildEmbed = new msg.embed()
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .setThumbnail(msg.guild.iconURL())
                .addFields(
                    { name: "Members", value: msg.guild.memberCount, inline: true },
                    { name: "Number of Roles", value: msg.guild.roles.cache.size, inline: true },
                    { name: "Emojis", value: msg.guild.emojis.cache.size, inline: true },
                    { name: "Owner", value: msg.guild.owner },
                    { name: "Region", value: msg.guild.region },
                    { name: "ID", value: msg.guild.id }
                );
            msg.send(guildEmbed);
        }
    };