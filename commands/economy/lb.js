module.exports = {
    name: "lb",
    cooldown: 0,
    async execute(message, args, d) {
        const lbObj = {};
        const guild = message.client.guilds.cache.get(message.guild.id);
        const members = guild.members.cache.map(member => member.id);
        for (const member in members) {
            const userBal = await d.users.get(member)
            if (member.user.bot || !userBal || userBal === 0) {null;}
            else {lbObj[member] = userBal}
        }
        const sort = Object.entries(lbObj).sort((a, b) => a[1] - b[1]);
        message.channel.send(sort);
    }
};
