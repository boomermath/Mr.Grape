module.exports = {
    name: 'loop',
    description: 'get song lyrics',
    cooldown: 1,
    aliases: ['lyr'],
    async execute(message, args, d) {
        /*
        let lyricGet;
        if (!args[0]) {
            const q = message.client.queue.get(message.guild.id);
            lyricGet = q.songs[0].title;
        }
        else { lyricGet = args.join(' '); }
        let request = `http://tracking.musixmatch.com/matcher.lyrics.get?q_track=${encodeURIComponent(lyricGet)}`
        let key = {
            'apikey': process.env.LYRICS
        }
        let response = d.r2.get(request, { key }).json;
        message.channel.send(response.body.lyrics["lyrics_body"]);
        */
       message.channel.send('work in progress!')
    }
};
