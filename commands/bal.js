
const Discord = require('discord.js');
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {
    namespace: 'users'
});
module.exports = {
	name: 'bal',
	description: 'check ur balance',
	execute(message, args) {
let person;
let personName;
let argu = args[0];
if (argu === undefined) {
    person = message.author;
    personName = message.author.username;
}
else if (argu.includes("<@")) {
    person = targets;
    personName = targets.displayName;
}
else {message.channel.send('Use a valid mention!');}

  async function bal() {    
        if (await users.get(person.id) === null) {
            users.set(person.id, 0);
            const balsolooEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(personName + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: '0 :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
            message.channel.send(balsolooEmbed);
        } else {
            const balsoloEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(personName + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value:  `${await users.get(person.id)}` + ' :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
            message.channel.send(balsoloEmbed);
        }

    }
bal();
	
	}
};
