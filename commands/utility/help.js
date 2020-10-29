const fileh = require('filehound')
module.exports = {
    name: 'help',
    description: 'help command bro',
    execute(message, args, d) {
		const data = [];
		const { commands } = message.client;
		if (!args.length) {
		const subdirectories = fileh.create()
  		.path("./commands")
  		.directory()
  		.findSync();
		const sub = subdirectories.replace('commands/','');
		const toTitleCase = (sub) => {
  		return sub
    		.toLowerCase()
    		.split('\n')
    		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    		.join('\n');
		};
		const helpEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Help')
                .addFields(
				{name: 'Command Categories', value: sub}, 
				{name: 'Command Help', value: `For help on a specific command, do ${d.config.prefix}help [command]`}, 
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
