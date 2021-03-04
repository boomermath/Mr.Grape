const { ModerationCommand } = require("../../structures");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "unban",
                type: "moderation",
                aliases: ["unhammer"],
                description: "Unban people.",
                usage: "<mention|userID>",
                cooldown: 1,
                saying: "Don't spam this command.",
                requiredPermissions: ["BAN_MEMBERS"]
            })
        }

        main(msg, args) {
            if (!args[0] || msg.mentions.members.first()) return msg.send("Who should I unban? (give me an id)");
            
            if (msg.author.id === args[0]) return msg.send("I don't think you are banned.");
            else if (this.client.user.id === args[0]) return msg.send("Bruh I'm not banned.")
            
            try {
                await msg.guild.members.unban(args[0]);
                msg.send("User unbanned!.")
            } catch {
                msg.send("Something went wrong. I probably don't have a high enough role to unban that person, or they aren't banned.")
            }
        }
    }