const Util = require("discord.js");
const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api');
const getVid = new Youtube(process.env.YOUTUBE);
module.exports = {
	name: 'play',
	description: 'play music from youtube',
  	aliases: ['p'],
	cooldown: 2,
	async execute(message, args, d) {
    		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('bruh your not even in a voice channel how about you join one?');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Bruh I cant connect to voice channel, no perms');
		if (!permissions.has('SPEAK')) return message.channel.send('Bruh I cant play music without speak perms');
		if (!args[0]) return message.channel.send('Whaddya want me to play?');
	    	const tubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
		const serverQueue = message.client.queue.get(message.guild.id);
	    	const argument = args.join(' ');
	    	let songInfo;
	    	if (tubeRegex.test(argument)) {songInfo = await ytdl.getInfo(argument.replace(/<(.+)>/g, '$1'))}
		else {
		let theTube = await getVid.searchVideos(argument, 1)
	    	songInfo = await ytdl.getInfo(theTube[0].url);
		}
		const song = {
			id: songInfo.videoDetails.video_id,
			title: Util.escapeMarkdown(songInfo.videoDetails.title),
			url: songInfo.videoDetails.video_url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			return message.channel.send(`Added **${song.title}** to da queue!`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
			queue.voiceChannel.leave();
        		message.client.queue.delete(message.guild.id);
        		return;
        	}

			const dispatcher = queue.connection.play(ytdl(song.url, { filter: "audioonly" }))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			queue.textChannel.send(`Groovin to: **${song.title}**`);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`Couldn't join voice channel: ${error} big oof.`);
		}
	}
};
