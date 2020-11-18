module.exports = {
    name: "lb",
    cooldown: 0,
    async execute(message, args, d) {
        const lbObj = {};
        const guild = message.client.guilds.cache.get(message.guild.id);
        const members = guild.members.cache.map(member => member.id);
        for (const member in members) {
            let m = members[member];
            const userBal = await d.users.get(m)
            if (!userBal || userBal === 0) { null; }
            else { lbObj[m] = userBal }
        }
        const sort = Object.entries(lbObj).sort((a, b) => b[1] - a[1]);
        message.channel.send(sort);
    }
};
