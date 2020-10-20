module.exports = {
	name: 'bal',
	aliases: ['balance', 'wallet'],
	description: 'check ur balance',
	execute(message, args, d) {
let target = message.mentions.members.first();
let person;
let personName;
let argu = args[0];
if (argu === undefined) {
    person = message.author;
    personName = message.author.username;
}
else if (argu.includes("<@")) {
    person = target;
    personName = target.displayName;
}
else {message.channel.send('Use a valid mention!');}

  async function bal() {    
        if (await d.users.get(person.id) === null) {
            d.users.set(person.id, 0);
            const balsolooEmbed = new d.Discord.MessageEmbed()
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
            const balsoloEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(personName + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value:  `${await d.users.get(person.id)}` + ' :star:s'
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
