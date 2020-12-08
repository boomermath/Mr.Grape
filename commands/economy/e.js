module.exports = {
    name: 'e',
    cooldown: 0,
    execute(message, args, d) {
        const guild = message.client.guilds.cache.get(message.guild.id);
        const obj = {};
        guild.members.cache.each(member => {
            message.channel.send(member.id)
        });
        /*
        const lb = Object.entries(obj)
            .sort(([, a], [, b]) => a - b)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

        message.channel.send(Object.entries(lb))
        */
    }
};