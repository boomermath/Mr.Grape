const Discord = require('discord.js');
module.exports = {
    name: 'unban',
    description: 'unban ppl',
    cooldown: 0,
    execute(message, args, d) {
        /*
        let unbanUser = unbanUser;
        let boolean = message.member.hasPermission("BAN_MEMBERS");
        if (boolean) {
            if (unbanUser) {
                if (message.author.id === unbanUser) {
                    return message.channel.send('I don\'t think ur banned');
                }
                if (message.client.user.id === unbanUser) {
                    return message.channel.send('Bruh im not banned')
                }
                try {
                    message.guild.members.unban(unbanUser)
                    message.channel.send(" " + unbanUser.displayName + " has been kicked, what a noob lol ");
                } catch {
                    message.channel.send("I don't got permissions (or high enough role) to kick ppl. How about ya give me it?")
                }
            }
        } else if (!unbanUser) {
            message.channel.send('who are we unbanning? (you gotta give me their id bro)');
        } else if (!boolean) {
            message.reply("bruh you dont even have permission to kick people, stop trying smh ");
        } else {
            message.channel.send("Cannot kick " + unbanUser.displayName + " maybe use a valid mention?");
        }
*/
        message.channel.send(args[0].displayName);
    }
};
