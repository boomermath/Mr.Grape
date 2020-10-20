const fs = require('fs');
const Discord = require('discord.js');
const config  = require('../config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {
    namespace: 'users'
});
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const addMoni = async function (who, howmuch) {
    let rightnow = await users.get(who);
    if (rightnow === undefined) {
        await users.set(who, 0)
    }
    await users.set(who, (rightnow + howmuch))
}
const d = {
	"Discord":Discord, 
	"config":config,
	"client":client,
	"Keyv":Keyv,
	"users":users,
	"addMoni":addMoni
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();


users.on('error', err => console.error('Keyv connection error:', err));


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === 'dm') return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = command.cooldown  * 1000;

	
	let target = message.mentions.members.first();

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, d);
	} catch (error) {
		console.error(error);
		message.channel.send('made an oopsie tryna do that command');
	}
	
});

client.login(process.env.BOT_TOKEN);
