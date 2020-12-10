const ytdl = require('ytdl-core');
module.exports = {
    name: 'e',
    description: 'get see what song is currently playin',
    cooldown: 0,
    async execute(message, args, d) {
   
        let e = await ytdl.getInfo('https://www.youtube.com/watch?v=D42Cexo75a0')
        let res = e.videoDetails;
        console.log(res.lengthSeconds)
        console.log(res.video_url)
        console.log(res.title)
        console.log(res.thumbnail.thumbnails)
     
    }
};
