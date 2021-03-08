const { Util: { escapeMarkdown } } = require("discord.js");
const ytdl = require("ytdl-core");
const getSongs = require("./GetMusic");

module.exports =
    class {
        constructor(message) {
            this._evoked = true;
            this._connection = null;
            this.msg = message;
            this.console = message.client.console;
            this.settings = {
                volume: 42,
                repeatMode: 0,
                playing: true
            };
            this.queue = {
                songs: [],
                position: 0
            };
        }

        async _connect() {
            try {
                this._connection = await this.msg.member.voice.channel.join();
            } catch (error) {
                this.disconnect();
                this.console.error(error);
                this.msg.send("Made an oopsie while trying to connect!");
            }
        }

        async _stream(song) {
            const play = ytdl(song.url, {
                filter: "audioonly",
                quality: "highestaudio"
            });

            const player = this._connection.play(play)
                .on("start", () => {
                    const embed = new this.msg.embed()
                        .setTitle("Now Playing")
                        .setDescription(`**[${escapeMarkdown(song.title)}](${song.url})**`)
                        .setThumbnail(song.thumbnail);
                    this.msg.send(embed);
                })
                .on("finish", () => { this.shiftQueue(); })
                .on("error", (error) => this.console.error(error));
            player.setVolumeLogarithmic(this.settings.volume / 100);
        }

        async _updateQueue(msg, input) {
            try {
                const songRes = await getSongs(input, msg.author);
                const embed = new msg.embed()
                    .setTitle("Queued")
                    .setDescription(songRes.title)
                    .setThumbnail(songRes.thumbnail);
                msg.send(embed);
                this.queue.songs.push(...songRes.songs);
            } catch (err) {
                this.console.error(err);
                if (this._evoked) this.disconnect();
                return msg.send("No songs found!");
            }
        }

        async shiftQueue(ops) {
            if (ops) { this.queue.position += ops; }
            else {
                if (this.settings.repeatMode !== 1) this.queue.position += 1;
                if (this.settings.repeatMode === 2 && this.queue.songs.length === this.queue.position) this.queue.position = 0;
            }
            const song = this.queue.songs[this.queue.position];
            if (!song) return this.disconnect();
            return await this._stream(song);
        }

        async play(msg, input) {
            console.log(this.settings.repeatMode)
            await this._updateQueue(msg, input);
            if (this._evoked) {
                this._evoked = false;
                await this._connect();
                await this._stream(this.queue.songs[0]);
            }
        }

        async disconnect() {
            await this._connection.disconnect();
            this._connection = null;
            this._evoked = true;
            this.queue.songs = [];
            this.queue.position = 0;
        }

        get playTime() { return (this._connection.dispatcher.streamTime - this._connection.dispatcher.pausedTime) / 1000; }

        get currentSong() { return this.queue.songs[this.queue.position]; }

        set volume(volume) {
            this._connection.dispatcher.setVolumeLogarithmic(volume / 100);
            this.settings.volume = volume;
        }

        pause() {
            this._connection.dispatcher.pause(true);
            this.settings.playing = false;
        }

        resume() {
            this._connection.dispatcher.resume();
            this.settings.playing = true;
        }

    };
