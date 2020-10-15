
const depend = require('../app.js')
module.exports = {
	name: 'steal',
	description: "steal stars from the bot's infinite stash",
	cooldown: 5,
	execute(message, args) {
	 let output;
	 let val;
	 let caught = Math.floor(Math.random() * 99) + 1;
     let randSteal = Math.floor(Math.random() * 19) + 1;
	 const stealArr = [
	 ["Theft", "you stole" + randSteal + " :star:s"]
	 ["You got caught!", "you ended up paying" + randSteal + " :star:s\nThat's karma for ya."]
	 ];
        if (caught >= 70) {
			output = stealArr[0][0]
			val = stealArr[0][1]
            addMoni(message.author.id, randSteal);

        } else if (caught <= 30) { 
		    output = stealArr[1][0]
			val = stealArr[1][1]
			addMoni(message.author.id, -randSteal);
		}

            const stealEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + "'s robbery")
                .addFields({
                    name: 'You got caught!',
                    value: 'You ended up paying ' + randSteal + " :star:s\nThat's karma for ya."
                }, )
                .setTimestamp()
                .setFooter('Shady Grape Org');

            message.channel.send(stealEmbed);

	}
};
