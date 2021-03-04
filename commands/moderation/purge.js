const { ModerationCommand } = require("../../structures");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "purge",
                type: "moderation",
                aliases: ["prune", "clean"],
                description: "Purge messages from a channel.",
                usage: "<number>",
                cooldown: 1,
                saying: "Don't spam this command.",
                requiredPermissions: ["MANAGE_MESSAGES"]
            });
        }

        async main(msg, args) {
            if (!args[0]) return msg.send("Bruh how many messages should I purge?");
            const number = parseInt(args[0]);
            if (!number) return msg.send("Give me a valid number!");
            const [iterations, leftover] = [~~(number / 100), number % 100];
            for (let i = 0; i < iterations; i++) await msg.channel.bulkDelete(100);
            if (leftover > 0) await msg.channel.bulkDelete(leftover);
            const confirm = await msg.send("Purged messages!");
            setTimeout(() => { confirm.delete(); }, 2000);
        }
    };