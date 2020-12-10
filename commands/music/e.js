const ytdl = require('ytdl-core');
module.exports = {
    name: 'e',
    description: 'get see what song is currently playin',
    cooldown: 0,
    async execute(message, args, d) {
        let e = await ytdl.getInfo(args.join(' '));
        console.log(e)
    }     
};
