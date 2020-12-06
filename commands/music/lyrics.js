const { KSoftClient } = require('@ksoft/api');
const ksoft = new KSoftClient(process.env.KSOFT);
module.exports = {
    name: 'lyrics',
    description: 'get lyrics of a song',
    cooldown: 1,
    aliases: ['lyr'],
    async execute(message, args, d) {
        const { KSoftClient } = require('@ksoft/api');
        const ksoft = new KSoftClient(process.env.KSOFT);
        let e = await ksoft.lyrics.get('Billie Eilish - Bad Guy');
        console.log(e);
    }
};
