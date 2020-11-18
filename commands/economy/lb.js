module.exports = {
    name: "lb",
    cooldown: 0,
    async execute(message, args, d) {
        message.channel.send("Downloading leaderboard stuff...").then(message => {
            async function lb() {
                const lbObj = {};
                const members = message.client.guilds.cache.get(message.guild.id);
                for (const member in members) {
                    let m = members[member];
                    const userBal = await d.users.get(m.id)
                    if (!userBal || userBal === 0) { null; }
                    else { lbObj[m.displayName] = userBal }
                }
                const sort = Object.entries(lbObj).sort((a, b) => b[1] - a[1]);
                message.channel.send(sort);
            }
            lb();
        })
    }
};
