const { ModerationCommand } = require("../../structures");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "prefix",
                type: "utility",
                description: "Set the bot's prefix.",
                usage: "<prefix>",
                saying: "Don't prefix.",
                cooldown: 2,
                requiredPermissions: ["MANAGE_SERVER"]
            });
        }

        async main(msg) {
            const prefix = msg.params[0];

            if (!prefix) return msg.send("Give me a prefix."); 

            msg.guild.setPrefix(prefix);

            const prefixEmbed = new msg.embed()
                .setTitle("Prefix")
                .addField("Set to", prefix);
            msg.send(prefixEmbed);
        }
    };