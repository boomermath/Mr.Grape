const { Command } = require("../../structures");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "invite",
                type: "utility",
                description: "Invite link for Mr.Grape.",
                usage: "No arguments required",
                saying: "I just gave it to you!",
                cooldown: 2
            });
        }

        main(msg, args) {
            const invite = new msg.embed()
                .setTitle("Invite")
                .setURL(`https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=0`)
            msg.send(invite);
        }
    };