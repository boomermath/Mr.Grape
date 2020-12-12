module.exports = {
    name: "work",
    aliases: ["job"],
    description: "do honest work to get stars",
    cooldown: 30,
    cd: "Don't be a workaholic",
	fan: true,
    async execute(message, args, d) {
        const inv = await d.items.get(message.author.id);
        let earn = Math.round(Math.random() * 7) + 1;
        const chooseWork = Math.round(Math.random() * 2);
        const ifEarn = [1, 0];

        if (chooseWork === 0 && inv && inv.orangedetector) {
            for (let i = 0; i < inv.orangedetector; i++) {
                ifEarn.push(1);
            }
        } else if (chooseWork === 1 && inv && inv.mangodetector) {
            for (let i = 0; i < inv.mangodetector; i++) {
                ifEarn.push(1);
            }
        } else if (chooseWork === 2 && inv && inv.carrotdetector) {
            for (let i = 0; i < inv.carrotdetector; i++) {
                ifEarn.push(1);
            }
        }

        const earnJob = Math.floor(Math.random() * ifEarn.length);

        if (inv && inv.starmagnet && inv.starmagnet > 0) {
            earn = Math.round(earn * (1 + (0.06 * inv.starmagnet)));
        }

        const situation = [
            ["orange", "Help Mr.Grape find his orange!", "will you help me find my orange?\nit fell in a bush full of bananas over there, but i could not find it.\nPlease go there and find my orange.", "That's not my orange, that's a banana! Try again later."],
            ["mango", "Help Mr.Grape catch his mango!", "I am trying to catch a flying mango, but it keeps disappearing.\nSo will you catch it and bring it to me?", "You didn't catch my mango? Too bad, try again next time"],
            ["rabbit", "Help Mr.Grape find his rabbit.", "my pet rabbit has escaped!\nhe really like carrots\ncan you help lure him home?", "Sorry, I was asking for a carrot, not a lime."]
        ];

        const chosen = situation[chooseWork];

        if (ifEarn[earnJob] === 1) {
            outcome = chosen[2];
            d.addMoni(message.author.id, earn);
        } else {
            outcome = chosen[3];
        }

        const job = new d.Discord.MessageEmbed()
            .setColor("#dd2de0")
            .setTitle(`${message.author.username}"s job`)
            .addFields({
                name: chosen[1],
                value: chosen[2]
            }, {
                name: ifEarn[earnJob] ? `Yay, you found my ${chosen[0]}! Here, take ${earn} :star:s!` : chosen[3],
                value: "_"
            })
            .setThumbnail("https://i.imgur.com/JXfpgdXh.jpg")
            .setTimestamp()
            .setFooter("Grape Enterprises");

        message.channel.send(job);
    }
};
