const Discord = require('discord.js');
const DisTube = require('distube'),
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 25 });
module.exports = {
	name: 'play',
	description: 'check ur balance',
	execute(message, args) {
    distube.stop(message);
    message.channel.send("Stopped the music!");
   }
};
