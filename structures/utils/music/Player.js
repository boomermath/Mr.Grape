const { Util: { escapeMarkdown } } = require("discord.js");
const { Embed } = require("../../extensions/Embed");
const ytdl = require("ytdl-core");
const getSongs = require("./GetMusic");
const Queue = require("./Queue");

module.exports =
    class {
        constructor(message) {
            this._connection = null;
            this._console = message.client.console;
            this._evoked = true;
            this._msg = message;
            this.settings = {
                volume: 42,
                repeatMode: 0
            };
            this.queue = new Queue(this);
        }

        get playing() {
            return !this._connection.dispatcher.paused;
        }

        get playTime() {
            return (this._connection.dispatcher.streamTime - this._connection.dispatcher.pausedTime) / 1000;
        }

        set volume(vol) {
            this.settings.volume = vol;
            this._connection.dispatcher.setVolumeLogarithmic(vol / 100);
        }

        async _connect() {
            try {
                this._connection = await this._msg.member.voice.channel.join();
            } catch (error) {
                this.disconnect();
                this._console.error(error);
                this._msg.send("Made an oopsie while trying to connect!");
            }
        }

        _stream(song) {
            const stream = ytdl(song.url, {
                filter: "audioonly",
                quality: "highestaudio",
                highWaterMark: 1 << 25
            });

            const player = this._connection.play(stream)
                .on("start", () => {
                    const embed = new Embed()
                        .setTitle("Now Playing")
                        .setDescription(`**[${escapeMarkdown(song.title)}](${song.url})**`)
                        .setThumbnail(song.thumbnail);
                    this._msg.send(embed);
                })
                .on("finish", () => { this.queue.shift(); })
                .on("error", (err) => { this._console.error(err); });

            player.setVolumeLogarithmic(this.settings.volume / 100);
        }

        async _loadQueue(msg) {
            const res = await getSongs(msg.params.join(" "), msg.author);
            const embed = new Embed()
                .setTitle("Queued")
                .setDescription(res.title)
                .setThumbnail(res.thumbnail);
            msg.send(embed);

            this.queue.songs = res.songs;
        }

        async play(msg) {
            await this._loadQueue(msg);
            if (this._evoked) {
                this._evoked = false;
                await this._connect();
                this._stream(this.queue.currentSong);
            }
        }

        async disconnect() {
            await this._connection.disconnect();
            this.queue.reset();
            this._connection = null;
        }

        pause() {
            this._connection.dispatcher.pause(true);
        }

        resume() {
            this._connection.dispatcher.resume();
        }
    };