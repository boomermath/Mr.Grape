module.exports = {
    name: 'wolfram',
    description: 'get info from wolfram alpha',
    aliases: ['wolf'],
    cooldown: 3,
    async execute(message, args, d) {
        if (!args[0]) {return message.channel.send('whaddya want me to look up?');}
        let key = process.env.WOLFRAM;
        let wolfapi = `https://api.wolframalpha.com/v1/simple?i=${encodeURIComponent(args.join(' '))}&appid=${key}`;
        message.channel.send(wolfapi); 
    }
};
