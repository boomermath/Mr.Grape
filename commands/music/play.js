const { MusicCommand, Player } = require("../../structures");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "play",
                type: "music",
                description: "Play music!",
                usage: "<yt link or query>",
                aliases: ["p", "add"],
                saying: "Your musical taste is equivalent to that of a hairball.",
                cooldown: 2
            });
        }

        createPlayer(msg) {
            const player = new Player(msg);
            this.musicQueues.set(msg.guild.id, player);
            return player;
        }

        async main(msg) {
            const musicPlayer = this.musicQueues.get(msg.guild.id) || this.createPlayer(msg);

            if (!msg.params && musicPlayer.playing === false) {
                musicPlayer.resume();
                return msg.send("Resumed music!");
            }

            if (!msg.params) return msg.send("What should I play?");
            
            await musicPlayer.play(msg, msg.params.join(" "));

            musicPlayer._connection.on("disconnect", () => this.musicQueues.delete(msg.guild.id));
        }
    };