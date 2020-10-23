const fs = require('fs');
const DisTube = require("distube")
const Discord = require('discord.js');
const config  = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {namespace: 'users'});
const items = new Keyv(process.env.DATABASE_URL, {namespace: 'items'});
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
	"distube": new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true }),
	"users":users,
	"addMoni":addMoni,
	"items":items
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();


users.on('error', err => console.error('Keyv connection error:', err));
d.distube.on("error", (message, err) => message.channel.send(`An error encountered: ${err}`));

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
	async function cooldown() {
	let inv = await d.items.get(message.author.id);
	if (inv.fan === undefined || inv.fan === null) {inv.fan = 0; await items.set(message.author.id, inv);}
	const cooldownAmountinFunc = (1 - (0.03 * inv.fan)) * (command.cooldown  * 1000);
	return cooldownAmountinFunc;
	}
	let cooldownAmount = cooldown();

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const cool = new Discord.MessageEmbed()
            			.setColor('#dd2de0')
            			.setTitle('ayo chill man')
            			.addFields({
				 name: `${command.name.charAt(0).toUpperCase() + command.name.slice(1)}`,
                		 value: `${timeLeft.toFixed(1)}` + " second(s) left"
            			  }, )
		                .setTimestamp()
            			.setFooter('Grape Bank Inc.');
			return message.channel.send(cool);
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
