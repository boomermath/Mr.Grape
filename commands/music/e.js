const ytpl = require('@distube/ytpl')
module.exports = {
    name: 'e',
    description: 'get see what song is currently playin',
    cooldown: 0,
    async execute(message, args, d) {
        let e = await ytpl('https://www.youtube.com/playlist?list=PLAuXvMFaTiZwojnLr7JLOupJCikzwShYH');
        console.log(e)
    }     
};
