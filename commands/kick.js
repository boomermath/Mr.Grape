
const Discord = require('discord.js');
const target = message.mentions.members.first();
module.exports = {
	name: 'kick noobs from your server',
	description: 'fortune telling is cool',
	cooldown: 0,
	execute(message, args) {
	let boolean = message.member.hasPermission("KICK_MEMBERS");
if (boolean) {
    if (target) {
        try {
             targets.kick();
            message.channel.send(":wave: " + target.displayName + " has been kicked, what a noob lol ");
        } catch {
            message.reply("I don't got permissions to kick people, how about you give me it? ");
    } 
    }
}
    else if (!boolean) {
        message.reply("bruh you dont even have permission to kick people, stop trying smh ");
}
    else {message.channel.send("Cannot kick "+targets.displayName);}
	
	}
};
