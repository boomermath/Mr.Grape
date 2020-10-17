const Discord = require('discord.js');
const DisTube = require('distube'),
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 25 });
module.exports = {
	name: 'loop',
  aliases: ['repeat'],
	description: 'check ur balance',
	execute(message, args) {
   distube.setRepeatMode(message, parseInt(args[0]));
   }
};
