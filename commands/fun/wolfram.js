module.exports = {
    name: 'wolfram',
    description: 'get info from wolfram alpha',
    aliases: ['wolf'],
    cooldown: 3,
    async execute(message, args, d) {
        if (!args[0]) {return message.channel.send('whaddya want me to look up?');}
        let key = process.env.WOLFRAM;
        let wolfapi = `https://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(args.join(' '))}&output=json&podindex=1`;
        let output = await d.r2(wolfapi).json;
        message.channel.send(output); 
    }
};
