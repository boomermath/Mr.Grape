module.exports = {
    name: 'e',
    cooldown: 0,
    execute(message, args, d) {
        const guild = message.client.guilds.cache.get(message.guild.id);
        guild.members.cache.each(member => {
            message.channel.send(member.id)
        });
    }
};