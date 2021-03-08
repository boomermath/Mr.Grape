const { Util: { escapeMarkdown } } = require("discord.js");
const { MusicCommand } = require("../../structures");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "queue",
                type: "music",
                description: "Get music queue.",
                usage: "No arguments required.",
                aliases: ["q"],
                saying: "I just showed it to you!",
                cooldown: 2
            });
        }

        createEntry(pos, { title, url, duration, author }) {
            return ["\u200b", `**${pos}) [${escapeMarkdown(title)}](${url})\n\`${duration}\`| ${author}**`];
        }

        main(msg) {
            const { currentSong: { title, url }, queue: { songs } } = this.musicQueues.get(msg.guild.id);
            const entries = songs.map(s => this.createEntry(songs.indexOf(s) + 1, s));
            msg.paginate({ title: "Queue", description: `**__Now playing:__** **[${escapeMarkdown(title)}](${url})**` }, entries, 10);
        }
    };