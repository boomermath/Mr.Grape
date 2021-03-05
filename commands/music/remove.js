const { MusicCommand } = require("../../structures");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "remove",
                type: "music",
                description: "Remove a song from the queue.",
                usage: "<index of song>.",
                aliases: ["rm"],
                saying: "You might be removed if you don't stop removing.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            const { queue: { songs, position } } = musicPlayer
            const index = (+args[0] || songs.length) - 1;
            const removedSong = songs[index];
            songs.splice(index, 1);
            const removeEmbed = new msg.embed()
                .setTitle(`Removed [${removedSong.title}] from the queue!`);
            msg.send(removeEmbed);
            if (index === position) musicPlayer.shiftQueue();
        }
    };