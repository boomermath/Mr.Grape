module.exports = {
    name: "lb",
    cooldown: 0,
    execute(message, args, d) {
        const lbObj = {};
        message.guild.members.fetch().then(member => {
            message.channel.send(member);
        });
        const sort = Object.entries(lbObj).sort((a, b) => a[1] - b[1]);
        message.channel.send(sort);
    }
};
/*
                async function lb() {
                    let userBal = await d.users.get(member.id);
                    if (member.user.bot || userBal === 0 || !userBal) { null; }
                    else {
                        lbObj[member.id] = userBal;
                    }
                }
                lb();


*/