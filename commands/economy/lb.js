module.exports = {
    name: "lb",
    cooldown: 0,
    async execute(message, args, d) {
        const lbObj = {};
        message.guild.members.cache.forEach(member => {
            async function lb(member) {
                let userBal = await d.users.get(member.id);
                if (!userBal || userBal <= 0) { null; }
                else { lbObj[member.displayName] = userBal }
            }
            lb(member);
        });
        const sort = Object.entries(lbObj).sort((a, b) => b[1] - a[1]);
        message.channel.send(sort);
    }
};
