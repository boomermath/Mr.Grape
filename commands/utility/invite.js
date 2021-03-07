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

        main(msg) {
            const invite = new msg.embed()
                .setTitle("Invites")
                .addFields(
                    {
                        name: "Bot", value: `
                        [Add it to your server!](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=0)`,
                        inline: true
                    },
                    {
                        name: "Server", value: `
                        [Mr.Grape Community](https://invite.com)`,
                        inline: true
                    }
                );
            msg.send(invite);
        }
    };           