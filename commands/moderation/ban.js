const { ModerationCommand } = require("../../structures");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "ban",
                type: "moderation",
                aliases: ["hammer"],
                description: "Ban people.",
                usage: "<mention|userID>",
                cooldown: 1,
                saying: "Don't spam this command.",
                requiredPermissions: ["BAN_MEMBERS"]
            })
        }

        async main(msg, args) {
            if (!args[0]) return msg.send("Who should I ban?");
            const target = msg.mentions.members.first() || await msg.guild.members.fetch(args[0]);
            if (msg.author.id === target.id) return msg.send("Imagine banning yourself.");
            else if (this.client.user.id === target.id) return msg.send("Woah there, I'm too cool to ban.")
            try {
                target.ban();
                msg.send(`:hammer: ${target.displayName} has been banned with an iron fist.`)
            } catch {
                msg.send("Something went wrong. I probably don't have a high enough role to ban that person. Try again.")
            }
        }
    }