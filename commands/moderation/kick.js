const { ModerationCommand } = require("../../structures");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "kick",
                type: "moderation",
                aliases: ["boot"],
                description: "Kick people.",
                usage: "<mention|userID>",
                cooldown: 1,
                saying: "Don't spam this command.",
                requiredPermissions: ["KICK_MEMBERS"]
            });
        }

        async main(msg) {
            if (!msg.params[0]) return msg.send("Who should I kick?");
            const target = msg.mentions.members.first() || await msg.guild.members.fetch(msg.params[0]);
            
            if (!target) return msg.send("That's not a valid user!");
            else if (msg.author.id === target.id) return msg.send("Bruh imagine kicking yourself.");
            else if (this.client.user.id === target.id) return msg.send("Woah there, I'm too cool to get the boot.");
            
            try {
                await target.kick();
                msg.send(`:wave: ${target.displayName} has been kicked. What a noob lol`);
            } catch {
                msg.send("Something went wrong. I probably don't have a high enough role to kick that person, try again later.");
            }
        }
    };