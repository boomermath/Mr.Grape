module.exports = {
    name: 'question',
    description: 'get many questions answered using wolfram alpha',
    aliases: ['q'],
    cooldown: 3,
    async execute(message, args, d) {
        if (!args[0]) {return message.channel.send('whaddya want me to look up?');}
        let key = process.env.WOLFRAM;
        let wolfapi = `https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(args.join(' '))}&appid=${key}`;
        let answer = await d.r2(wolfapi).text;
        if (answer === 'No short answer available') {return message.channel.send('This shows that I can parse if it says no avail');}
        message.channel.send(answer);
    }
};
