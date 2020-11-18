module.exports = {
    name: "lb",
    cooldown: 0,
    execute(message, args, d) {
        const guild = message.guild.id;
        const lbObj = {};
        guild.members.fetch().forEach(member => {
            async function lb() {
                let userBal = await d.users.get(member.id);
                if (userBal === 0 || !userBal) { null; }
                else {
                    lbObj[member.id] = userBal;
                }
            }
            lb();
        });
        const sort = Object.entries(lbObj).sort((a, b) => a[1] - b[1]);
        message.channel.send(sort);
    }
};
