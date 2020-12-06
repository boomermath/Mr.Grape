module.exports = {
    name: 'e',
    cooldown: 0,
    execute(message, args, d) {
        const guild = message.client.guilds.cache.get(message.guild.id);
        const obj = {};
        guild.members.cache.each(async member => {
            let bal = await d.users.get(member.id);
            if (!bal || bal <= 0) { null; }
            else {
                obj[member.tag] = bal;
            }
        });
        const lb = Object.entries(obj)
            .sort(([, a], [, b]) => a - b)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

        message.channel.send(lb)
    }
};