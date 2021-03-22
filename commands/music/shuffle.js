const { MusicCommand } = require("../../structures");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "shuffle",
                type: "music",
                description: "Shuffle the queue.",
                usage: "No arguments required.",
                aliases: ["sh"],
                saying: "You're scrambling my brain.",
                cooldown: 2
            });
        }

        shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        async main(msg) {
            const { queue } = this.musicQueues.get(msg.guild.id);
            if (queue.songs.length <= 2) return msg.send("Queue's kinda too small to shuffle.");
            
            queue.shuffle();
            
            const shuffleMsg = await msg.send("Shuffled!");
            shuffleMsg.react("🔀");
        }
    };