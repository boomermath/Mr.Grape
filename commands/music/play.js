const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const YoutubeAPI = require('simple-youtube-api');
const youtube = new YoutubeAPI(process.env.YOUTUBE);
module.exports = {
	name: 'play',
	description: 'play music',
	cooldown: 0,
	async execute(message, args, d) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if (!permissions.has('SPEAK')) return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		
		const ytRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
		const serverQueue = message.client.queue.get(message.guild.id);
		const argument = args.join(' ');
		let songInfo;
		if (ytRegex.test(argument)) {
		songInfo = await youtube.getVideo(argument);
		songInfo.url = argument
		}
		else {
		let video = await youtube.searchVideos(argument);
		songInfo = await youtube.getVideo(video[0].url);
		return message.channel.send(songInfo)
		}
		let title = songInfo.title;
		let url = songInfo.url;
		let duration = songInfo.duration;
		let thumbnail = songInfo.thumbnails.high.url;	
		const song = {
			title: title,
			url: url,
			duration: duration, 
			thumbnail: thumbnail
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
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

			const dispatcher = queue.connection.play(ytdl(song.url, {filter: 'audioonly'}))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			queue.textChannel.send(`🎶 Start playing: **${song.title}**`);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	}
};
