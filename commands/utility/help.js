const fileReader = require('filehound')
module.exports = {
    name: 'help',
    description: 'help command bro',
    cooldown: 1,
    cd: "Don't spam help cmd",
    execute(message, args, d) {
        try {
            let alias;
            if (message.content.toLowerCase().includes('nsfw')) { return message.channel.send('Begone thot \:cross:'); }
            const toTitleCase = (thingy) => {
                return thingy
                    .toLowerCase()
                    .split('\n')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join('\n');
            };
            const { commands } = message.client;
            function format(obj, titleCase) {
                let initial = obj.toString().split(',')
                let arr = [];
                for (dir in initial) {
                    let name = initial[dir].split('/').pop().replace('.js', '');
                    if (titleCase) { arr.push(toTitleCase(name)) }
                    else { arr.push(name) }
                }
                return arr;
            }
            const fileCategory = fileReader.create()
                .path("./commands")
                .directory()
                .findSync();
            let categories = format(fileCategory, true).join('\n')
            if (!args.length) {
                const helpEmbed = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle('Help')
                    .addFields({
                        name: 'Command Categories',
                        value: categories
                    }, {
                        name: 'Help',
                        value: `For help on a specific command or category, do ${d.prefix}help [category/command]`
                    })
                    .setTimestamp()
                    .setFooter('Grape Databases');
                message.channel.send(helpEmbed);
                return;
            }

            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (categories.includes(name)) {
                const file = fileReader.create()
                    .paths(`./commands/${name}`)
                    .ext('js')
                    .findSync();
                const helpCommandEmbed = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(toTitleCase(name))
                    .addFields({
                        name: 'Commands',
                        value: format(file, false).join(', ')
                    }, {
                        name: 'Help',
                        value: `For more help on a specific command, do ${d.prefix}help [command]`
                    })
                    .setTimestamp()
                    .setFooter('Grape Databases');
                message.channel.send(helpCommandEmbed);
            } else if (command) {
                if (!command.aliases) {
                    alias = 'None.'
                } else {
                    alias = command.aliases.join(', ')
                }
                const helpCommandEmbed = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(command.name.charAt(0).toUpperCase() + command.name.slice(1))
                    .addFields({
                        name: 'Description',
                        value: command.description
                    }, {
                        name: 'Aliases',
                        value: alias
                    })
                    .setTimestamp()
                    .setFooter('Grape Databases');
                message.channel.send(helpCommandEmbed);
            } else {
                message.channel.send('That category or command aint here')
            }
        } catch (e) {
            message.channel.send('That category or command aint here')
            console.log(e)
        }
    }
};
