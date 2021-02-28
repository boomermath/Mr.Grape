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

            msg.guild.setPrefix(args[0]);

            const prefixEmbed = new msg.embed()
                .setTitle("Prefix")
                .addField("Set to", args[0])
            msg.send(prefixEmbed);
        }
    };