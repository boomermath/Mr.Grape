module.exports = {
	name: 'question',
	description: 'get many questions answered using wolfram alpha',
	aliases: ['ask'],
	cooldown: 3,
	cd: 'Just google it urself, nerd',
	async execute(message, args, d) {
		let finalAnswer;
		if (!args[0]) { return message.channel.send('whaddya want me to look up?'); }
		const key = process.env.WOLFRAM;
		const wolfapi = `https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(args.join(' '))}&appid=${key}`;
		const answer = await d.r2.get(wolfapi).text;
		if (answer === 'No short answer available') {
			const simpleWolf = `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(args.join(' '))}&format=plaintext&output=JSON&appid=${key}&podindex=2`;
			let ans = await d.r2.get(simpleWolf).json;
			if (!ans.queryresult.pods[0].subpods[0].plaintext || ans.queryresult.pods[0].subpods[0].plaintext === '(data not available)') { ans = "Can't find that."; }
			finalAnswer = ans.queryresult.pods[0].subpods[0].plaintext;
		} else { finalAnswer = answer; }
		const answerEmbed = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle('Answer')
			.setDescription('Powered by Wolfram-Alpha')
			.addField(finalAnswer.charAt(0).toUpperCase() + finalAnswer.slice(1), '_')
			.setTimestamp()
			.setFooter('DJ Grape');
		message.channel.send(answerEmbed);
	}
};
