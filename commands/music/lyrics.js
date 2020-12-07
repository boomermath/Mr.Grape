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
        let res = await ksoft.lyrics.get(argument);
        console.log(res)
        const lyricEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2ed0')
            .setTitle(res.name.charAt(0).toUpperCase() + res.name.slice(1))
            .setThumbnail(res.artwork)
            .setFooter('DJ Grape | Provided by KSoft.Si')
        if (res.lyrics.length > 1024) {
            let arr = res.lyrics.match(/(.|[\r\n]){1,1024}/g);
            for (part in arr) {
                if (part === 0) {
                    lyricEmbed.addField('**Lyrics**', arr[part]);
                    continue;
                }
                lyricEmbed.addField('\u200b', arr[part]);
            }
        }
        else { lyricEmbed.addField('**Lyrics**', res.lyrics) }
        message.channel.send(lyricEmbed);
    }
};
