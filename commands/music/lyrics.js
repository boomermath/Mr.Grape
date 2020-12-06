const { KSoftClient } = require('@ksoft/api');
const ksoft = new KSoftClient(process.env.KSOFT);
module.exports = {
    name: 'lyrics',
    description: 'get lyrics of a song',
    cooldown: 1,
    aliases: ['lyr'],
    async execute(message, args, d) {
        const q = message.client.queue.get(message.guild.id);
        if (!args.length && !q) { return message.channel.send('Give me something to search up bruh') }
        let argument = args.join(' ')
        if (!argument) { argument = q.songs[0].title; }
        let lyrics = await ksoft.lyrics.get(argument);
        const lyricEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2ed0')
            .setTitle(argument.charAt(0).toUpperCase() + argument.slice(1))
            .setThumbnail(lyrics.artwork)
            .setDescription('**Lyrics**\n' + lyrics.lyrics)
        message.channel.send(lyricEmbed);
    }
};
