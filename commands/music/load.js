const play = require('./play')
module.exports = {
    name: 'load',
    description: 'load saved playlists',
    cooldown: 2,
    cd: "Chill, don't load too many playlists",
    execute(message, args, d) {
        const serverQueue = message.client.queue.get(message.guild.id);
        const savedMusic = await d.music.get(message.author.id);
        let argument = args.join(' ');
        if (!savedMusic) return message.channel.send("You don't have any playlists!");
        if (!savedMusic[argument]) return message.channel.send("Invalid playlist!");
        let music = savedMusic[argument];
        if (serverQueue) { serverQueue.push(...savedMusic[argument]) }
        else {
            const playlistInfo = {
                title: playlist.title.charAt(0).toUpperCase() + playlist.title.slice(1),
                url: null,
                thumbnail: music[0].thumbnail,
                duration: "It's a playlist bro"
            }
            play.announce(playlistInfo, true, true);
            for (song in savedMusic[argument]) {
                play.playSong(song, message, message.member.voice, serverQueue, true)
            }
        }
        const pSave = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(Playlist)
            .setDescription('Saved!')
            .addField('Playlist loaded', '_')
            .setTimestamp()
            .setFooter('DJ Grape');
    }
};
