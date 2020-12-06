const { KSoftClient } = require('@ksoft/api');
const ksoft = new KSoftClient(process.env.KSOFT);
module.exports = {
    name: 'lyrics',
    description: 'get lyrics of a song',
    cooldown: 1,
    aliases: ['lyr'],
    async execute(message, args, d) {
        let e = await ksoft.lyrics.search(args.join(' '), { limit: 5 });
        console.log(e);
    }
};
