module.exports = {
    name: 'save',
    description: 'save current queue as playlist',
    cooldown: 2,
    cd: "Chill, don't spam playlists",
    async execute(message, args, d) {
        const serverQueue = message.client.queue.get(message.guild.id);
        const savedMusic = await d.music.get(message.author.id);
        if (serverQueue.songs.length > 20) return message.channel.send('The queue is too big to save! (Max 20)');
        if (!args.join(' ')) return message.channel.send('Whaddya wanna save the playlist as?')
        if (!savedMusic) {savedMusic = {};}
        if (Object.keys(savedMusic).length === 3) return message.channel.send('RIP you have max saved playlists (3)');
        savedMusic[args.join(' ')] = [...serverQueue.songs];
        await d.music.set(message.author.id, savedMusic)
        const pSave = new d.Discord.MessageEmbed()
				.setColor('#dd2de0')
				.setTitle(Playlist)
				.setDescription('Saved!')
				.addField(`Playlist saved as: ${args.join(' ')}`, '_')
				.setTimestamp()
				.setFooter('DJ Grape');
    }
};
