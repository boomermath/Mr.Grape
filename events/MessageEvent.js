const { Cooldowns, Event } = require("../structures");
const blacklistedUsers = require("../config/blacklisted");

module.exports =
    class extends Event {
        constructor(client) {
            super(client, {
                name: "message",
            });

            this.cooldownManager = new Cooldowns();
        }

        async main(message) {

            if (message.content === `<@!${this.client.user.id}>`) {
                const helloEmbed = new message.embed()
                    .setTitle("Hello!")
                    .addField("Sup. I'm Mr. Grape", `**To get started, type ${message.prefix}help.**`);
                message.send(helloEmbed);
            }

            if (message.author.bot || !message.command || !message.guild || blacklistedUsers.has(message.author.id)) return;

            const command = this.client.commands.get(message.command.toLowerCase());

            if (!command) return;

            const cooldownExists = this.cooldownManager.main(command, { id: message.author.id, fans: 0 });

            if (cooldownExists) {
                return message.send("Please wait!");
            }

            if (command.type === "moderation") {
                if (!message.member.hasPermission(command.requiredPermissions)) return message.send("You don't have permission to run this command!");
                if (!message.guild.me.hasPermission(command.requiredPermissions)) return message.send("I don't have permission to execute that command!");
            }

            else if (command.type === "music" && command.name !== "lyrics") {
                const { channel } = message.member.voice;
                const { channel: myChannel } = message.guild.me.voice;
                if (!command.musicQueues.has(message.guild.id) && command.name !== "play") return message.send("There is nothing playing!");
                else if (!channel && myChannel && myChannel !== channel && command.name !== "queue") return message.send("You have to be in my voice channel!");
            }

            try {
                command.main(message, message.args);
            } catch (err) {
                console.error(err);
                message.send("Made an oopsie! If this persists, please let us know!");
            }
        }
    };