module.exports = {
    name: 'loop',
    description: 'get song lyrics',
    cooldown: 1,
    aliases: ['lyr'],
    async execute(message, args, d) {
        let lyricGet;
        if (!args[0]) {
            const q = message.client.queue.get(message.guild.id);
            lyricGet = q.songs[0].title;
        }
        else { lyricGet = args.join(' '); }
        let request = `https://mourits-lyrics.p.rapidapi.com/?song=${encodeURIComponent(lyricGet)}`
        let key = {
            'x-rapidapi-key': 'ff4cff55bbmsh5cd0f578409b0b6p1f9865jsn310671bffb8d',
            'x-rapidapi-host': 'mourits-lyrics.p.rapidapi.com'
        }
        let response = d.r2.get(request, { key }).json;
        message.channel.send(response.lyrics);
    }
};
