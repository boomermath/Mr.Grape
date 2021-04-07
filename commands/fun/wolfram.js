const { RequestCommand, Embed } = require("../../structures");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "wolfram",
                type: "fun",
                aliases: ["wa", "wolf", "ask", "question", "givethquestion"],
                description: "See pictures of space!",
                usage: "No arguments required",
                cooldown: 5,
                saying: "There's only one NASA pic.",
                url: "https://api.wolframalpha.com/v2/query",
                params: {
                    appid: process.env.WOLFRAM,
                    output: "JSON",
                    format: "plaintext"
                }
            });
        }

        async main(msg) {
            if (!msg.params.length) return msg.send("Give me a question to answer!");

            const queryMsg = await msg.send("Gimme a sec . . .");
            const { queryresult } = await this.request({ input: msg.params.join(" ") });

            if (!queryresult.success) {
                queryMsg.delete();
                return msg.send("Dunno about that one.");
            }

            const answer = queryresult.pods[1].subpods[0].plaintext;

            const wolframEmbed = new Embed()
                .setTitle("Answer")
                .setDescription(answer.endsWith(".") ? answer : `${answer}.`)
                .setFooter("Powered by Wolfram|Alpha");
            queryMsg.delete();
            msg.send(wolframEmbed);
        }
    };