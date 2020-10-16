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
	name: 'give',
	aliases: ['donate'],
	description: 'give stars to people',
	cooldown: 5,
	execute(message, args) {
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	let target = message.mentions.members.first();
	let donation = args.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
        async function donate() {
            let check = await users.get(message.author.id)
	    if (donation === 'all') {donation = await users.get(message.author.id)}
            if (!target) {
                message.channel.send("who u givin golden stars to");
            } else if (!donation || donation < 1 || donation > check || isNaN(donation)) {
                message.channel.send("thats not a valid number of golden stars to give")
            } else if (target.id === message.author.id) {
                message.channel.send("bruh you cant give golden stars to yourself smh")
            } else if (target.user.bot) {
                message.channel.send("bruh you cant give golden stars to a bot smh")
            } else {
		if (await users.get(target.id) === undefined) {await users.set(target.id, 0)}
                addMoni(message.author.id, -donation);
                addMoni(target.id, donation);
                const give = new Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + ` donation to ` + target.displayName)
                    .addFields({
                        name: 'Donation',
                        value: 'you gave ' + `${target.displayName} ` + donation  + ' :star:s'
                    }, )
                    .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                    .setTimestamp()
                    .setFooter('Grape Charity Org.');

                message.channel.send(give);
            }
        }

        donate();
	
	
	}
};
