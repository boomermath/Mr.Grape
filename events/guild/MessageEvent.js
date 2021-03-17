const { Cooldowns, Event } = require("../../structures");

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

            if (message.author.bot || !message.command || !message.guild || this.client.config.blacklisted.has(message.author.id)) return;

            const command = message.command;
            const cooldown = this.cooldownManager.main(command, { id: message.author.id, fans: 0 });

            if (typeof cooldown === "number") {
                const cooldownEmbed = new message.embed()
                    .setTitle("Chill out!")
                    .addField(command.saying, `Wait ${this.cooldownManager.format(cooldown)}`)
                return message.send(cooldownEmbed)
            }

            if (command.type === "moderation") {
                if (!message.member.hasPermission(command.requiredPermissions)) {
                    return message.send("You don't have permission to run this command!");
                }
                else if (!message.guild.me.hasPermission(command.botPermissions)) {
                    return message.send("I don't have permission to execute that command!");
                }
            }

            else if (command.type === "music" && command.name !== "lyrics") {
                const { channel } = message.member.voice;
                const { channel: myChannel } = message.guild.me.voice;
                if (!command.musicQueues.has(message.guild.id) && command.name !== "play") {
                    return message.send("There is nothing playing!");
                }
                else if (!channel && myChannel && myChannel !== channel && command.name !== "queue") {
                    return message.send("You have to be in my voice channel!");
                }
            }

            try {
                command.main(message);
                this.client.emit("commandRun", command, message.author);
            } catch (err) {
                message.send("Made an oopsie! If this persists, please let us know!");
                this.client.emit("commandError", command, err);
            }
        }
    };