const { KSoftClient } = require('@ksoft/api');
const ksoft = new KSoftClient(process.env.KSOFT);
module.exports = {
    name: 'lyrics',
    description: 'get lyrics of a song',
    cooldown: 1,
    aliases: ['lyr'],
    async execute(message, args, d) {
        let e = await ksoft.lyrics.get('Billie Eyelash - the bald guy', { textOnly: true });
        console.log(process.env.KSOFT);
        console.log(e);

    }
};