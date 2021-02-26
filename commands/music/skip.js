const { MusicCommand } = require("../../structures");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "skip",
                type: "music",
                description: "Skip tracks.",
                usage: "No arguments required.",
                aliases: ["s"],
                saying: "Skipping is annoying.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            let number = +args[0] - 1 || 1;
            if (musicPlayer.playing === false) musicPlayer.resume();
            if (musicPlayer.repeatMode === 1) musicPlayer.setRepeatMode(0);
            musicPlayer.shiftQueue(number);
        }
    };