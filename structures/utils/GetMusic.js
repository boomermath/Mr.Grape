const { Util: { escapeMarkdown } } = require("discord.js");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
/* eslint-disable no-useless-escape */
const [ytRegex, plRegex] = [/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi, /^.*(list=)([^#\&\?]*).*/gi];

class Song {
    constructor(title, url, duration, thumbnail, author) {
        this.title = title;
        this.url = url;
        this.duration = duration;
        this.thumbnail = thumbnail;
        this.author = author;
    }
}

class SongResponse {
    constructor({ title, songs, thumbnail }) {
        this.title = title;
        this.songs = songs;
        this.thumbnail = thumbnail;
    }
}

async function getSongs(input, author) {
    let response;

    if (ytRegex.test(input)) {
        if (plRegex.test(input)) response = await ytpl(input);
        else response = await ytsr(input, { limit: 1 });
    }

    else response = await ytsr(`https://www.youtube.com/results?search_query=${encodeURIComponent(input)}&sp=EgIQAQ%253D%253D`, { limit: 1 });

    const isPlaylist = response.items.length > 1;

    return new SongResponse({
        title: isPlaylist ? `**${response.items.length} tracks** from **[${escapeMarkdown(response.title)}](${response.url})**` :
            `**[${escapeMarkdown(response.items[0].title)}](${response.items[0].url})**`,
        songs: response.items.map(song => new Song(song.title, song.url, song.duration, song.bestThumbnail.url, author)),
        thumbnail: isPlaylist ? response.bestThumbnail.url : response.items[0].bestThumbnail.url,
    });
}

module.exports = getSongs;