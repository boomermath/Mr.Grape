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
else if (argu.startsWith("<@") && argu.endsWith(">")) {
    person = target;
    personName = target.displayName;
}
else {message.channel.send('Use a valid mention!');}

  async function bal() {    
	  let bal = await d.users.get(person.id)
	if (!argu === undefined && target.user.bot) {message.channel.send('No bot in da economy (except me!)'); return;}
        if ( bal === null || bal === undefined) {
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
                    value:  `${bal}` + ' :star:s'
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
