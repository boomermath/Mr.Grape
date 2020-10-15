
const Discord = require('discord.js');
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {
    namespace: 'users'
});
module.exports = {
	name: 'invite',
	description: 'get invite link for the bot',
	cooldown: 2,
	execute(message, args) {
	message.channel.send('https://discord.com/oauth2/authorize?client_id=743833062265323651&scope=bot&permissions=0');
	}
};
