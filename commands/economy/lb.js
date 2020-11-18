module.exports = {
    name: "lb",
    cooldown: 0,
    execute(message, args, d) {
        const lbObj = {};
        message.guild.fetch().then(member => {
            message.channel.send(member.username);
        });
        const sort = Object.entries(lbObj).sort((a, b) => a[1] - b[1]);
        message.channel.send(sort);
    }
};
