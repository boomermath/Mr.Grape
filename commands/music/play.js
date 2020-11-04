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
		 function formatDuration(durationObj) {
		    const duration = `${durationObj.hours ? durationObj.hours + ':' : ''}${
		      durationObj.minutes ? durationObj.minutes : '00'
		    }:${
		      durationObj.seconds < 10
			? '0' + durationObj.seconds
			: durationObj.seconds
			? durationObj.seconds
			: '00'
		    }`;
		    return duration;
		  }
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
	    	if (tubeRegex.test(argument)) {
			songInfo = await getVid.getVideo(argument);
			songInfo.url = argument;
		}
		else {
		let theTube = await getVid.searchVideos(argument, 1)
	    	let url = theTube[0].url;
		songInfo = await getVid.getVideo(url);
		songInfo.url = url
		}
		const song = {
			title: songInfo.title,
			url: songInfo.url,
			duration: songInfo.duration,
			thumbnail: songInfo.thumbnails.high.url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			const added = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle(song.title)
			.setURL(song.url)
			.setDescription(`Duration: ${song.duration}`)
			.setThumbnail(song.thumbnail)
			.addField('Added to the queue!', '_')
			.setTimestamp()
			.setFooter('DJ Grape');
			return message.channel.send(added);
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
		 	const started = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle(song.title)
			.setURL(song.url)
			.setDescription(`Duration: ${song.duration}`)
			.setThumbnail(song.thumbnail)
			.addField('Groovin to the tunes!', '_')
			.setTimestamp()
			.setFooter('DJ Grape');
			queue.textChannel.send(started);
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
