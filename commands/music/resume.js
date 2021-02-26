const { MusicCommand } = require("../../structures");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "resume",
                type: "music",
                description: "Resume the music.",
                usage: "No arguments required.",
                aliases: ["rs", "cont", "continue"],
                saying: "Don't keep pausing and resuming.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            if (musicPlayer.playing === true) return msg.send("The music is already playing!");
            musicPlayer.resume();
            const resumeEmbed = new msg.embed()
                .setTitle(":white_check_mark: Resumed Music!")
            return msg.send(resumeEmbed);
        }
    };