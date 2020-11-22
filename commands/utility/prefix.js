module.exports = {
    name: 'prefix',
    description: 'set prefix',
    cooldown: 2,
    async execute(message, args, d) {
        let guilds = await d.guilds.get(message.guild.id);
        if (!guilds) { guilds = {}; }
        if (!args[0]) { return message.channel.send('What do you want me to set the prefix to?') }
        guilds.prefix = args[0];
        await d.guilds.set(message.guild.id);
        return message.channel.send(`Set prefix to ${args[0]}!`)
    }
}; 
