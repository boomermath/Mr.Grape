const { Command } = require("../../structures");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "avatar",
                type: "utility",
                description: "See a person's avatar.",
                usage: "<optional user>",
                aliases: ["pfp"],
                saying: "I just showed it to you!.",
                cooldown: 2
            });
        }

        async main(msg) {
            const avatar = msg.mentions.users.first() || msg.author;
            const url = avatar.displayAvatarURL().replace(/.jpg$|.png$|.webp$/, "");

            const avatarEmbed = new msg.embed()
                .setTitle(`${avatar.username}'s avatar`)
                .setDescription(`[jpg](${url}.jpg) | [png](${url}.png) | [webp](${url}.webp)`)
                .setImage(avatar.displayAvatarURL());
            msg.send(avatarEmbed);
        }
    };