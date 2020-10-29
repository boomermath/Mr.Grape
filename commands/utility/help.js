const fs = require('fs')
module.exports = {
    name: 'help',
    description: 'help command bro',
    execute(message, args, d) {
		const data = [];
		const { commands } = message.client;
	    	function getDirectories(path) {
  		return fs.readdirSync(path).filter(function (file) {
    		return fs.statSync(path+'/'+file).isDirectory();
  		});
		}
		if (!args.length) {
		const helpEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Help')
                .addFields(
				{name: 'Commands', value: getDirectories('../commands')}, 
				{name: 'Command Help', value: `For help on a specific category/command, do ${d.config.prefix}help [category/command]`}, 
				)
                .setTimestamp()
                .setFooter('Grape Databases');
            message.channel.send(helpEmbed);
		return;
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.channel.send("That command doesn't exist!");
		}
		
		if (!command.aliases) {alias = 'None.'}
		else {alias = command.aliases.join(', ')}
		const helpCommandEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(command.name.charAt(0).toUpperCase() + command.name.slice(1))
                .addFields(
				{name: 'Description', value: command.description}, 
				{name: 'Aliases', value: alias}, 
				)
                .setTimestamp()
                .setFooter('Grape Databases');
            message.channel.send(helpCommandEmbed);
		
    }
};
