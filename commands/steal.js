const Discord = require('discord.js');
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {
    namespace: 'users'
});
async function addMoni(who, howmuch) {
    		let rightnow = await users.get(who);
		if (rightnow === undefined) {await users.set(who, 0)}
    		let moremoni = rightnow + howmuch;
    		await users.set(who, moremoni)
		}
module.exports = {
	name: 'steal',
	aliases: ['rob'],
	description: "steal stars from the bot's infinite stash",
	cooldown: 5,
	execute(message, args) {
	 let output;
	 let val;
	 let caught = Math.floor(Math.random() * 99) + 1;
     	 let randSteal = Math.floor(Math.random() * 19) + 2;
	 const stealArr = [
	 ["Theft", "you stole " + randSteal + " :star:s"],
	 ["You got caught!", "you ended up paying " + randSteal + " :star:s\nThat's karma for ya."]
	 ];
        if (caught >= 70) {
			output = stealArr[0][0]
			val = stealArr[0][1]
            addMoni(message.author.id, randSteal);

        } else  { 
		    output = stealArr[1][0]
			val = stealArr[1][1]
			addMoni(message.author.id, -randSteal);
		}

            const stealEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + "'s robbery")
                .addFields({
                    name: output,
                    value: val
                }, )
                .setTimestamp()
                .setFooter('Shady Grape Org');

            message.channel.send(stealEmbed);

	}
};
