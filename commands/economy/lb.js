module.exports = {
    name: "lb",
    cooldown: 0,
    async execute(message, args, d) {

        message.guild.members.fetch()
            .then(console.log)
            .catch(console.error)

    }
};