const { MusicCommand } = require("../../structures");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "repeat",
                type: "music",
                description: "Loop music.",
                usage: "<song, queue, or off>\nIf you want to view settings, leave this field",
                aliases: ["loop", "rp"],
                saying: "Don't go loopy.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            const mode = ["Off", "Song", "Queue"];
            switch (msg.params[0]) {
            case undefined:
                const loopEmbed = new msg.embed()
                    .setTitle(`**Current loop mode: ${mode[musicPlayer.repeatMode]}**`);
                return msg.send(loopEmbed);
            case "o":
            case "off":
                musicPlayer.repeatMode = 0;
                break;
            case "s":
            case "song":
                musicPlayer.repeatMode = 1;
                break;
            case "q":
            case "queue":
                musicPlayer.repeatMode = 2;
                break;
            default:
                const settingsEmbed = new msg.embed()
                    .setTitle(`**Valid settings are: ${mode.join(", ")}**`);
                return msg.send(settingsEmbed);
            }
            const settingsEmbed = new msg.embed()
                .setTitle(`**Looping set to: ${mode[musicPlayer.repeatMode]}**`);
            return msg.send(settingsEmbed);
        }
    };