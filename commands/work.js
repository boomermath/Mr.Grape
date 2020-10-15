
const depend = require('../app.js')
module.exports = {
	name: 'work',
	description: 'do honest work to get stars',
	cooldown: 20,
	execute(message, args) {
	let earn = Math.round(Math.random() * 7) + 1;
        let chooseWork = Math.round(Math.random() * 2);
        let ifEarn = Math.round(Math.random() * 1) + 1
        const situation = [
            ['Help Mr.Grape find his orange!', 'will you help me find my orange?\nit fell in a bush full of bananas over there, but i could not find it.\nPlease go there and find my orange.', 'Yay, you found my orange! Here, take ' + earn + ' :star:s!', "That's not my orange, that's a banana! Try again later."],
            ['Help Mr.Grape catch his mango!', 'I am trying to catch a flying mango, but it keeps disappearing.\nSo will you catch it and bring it to me?', 'Yay, you found my mango! Here, take ' + earn + ' :star:s!', "You didn't catch my mango? Too bad, try again next time"],
            ['Help Mr.Grape find his rabbit.', 'my pet rabbit has escaped!\nhe really like carrots\ncan you help lure him home?', 'Yay, you found my rabbit! Here, take ' + earn + ' :star:s!', "Sorry, I was asking for a carrot, not a lime."]
        ];

        description = situation[chooseWork][0];
        background = situation[chooseWork][1];
        if (ifEarn === 1) {
            outcome = situation[chooseWork][2];
            addMoni(message.author.id, earn);
        } else {
            outcome = situation[chooseWork][3];
        }

        const job = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s job`)
            .addFields({
                name: description,
                value: background
            }, {
                name: outcome,
                value: "_"
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Enterprises');

        message.channel.send(job);
	}
};
