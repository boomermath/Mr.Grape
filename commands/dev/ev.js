const { Command } = require("../../structures");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "ev",
                type: "dev",
                description: "Eval js.",
                usage: "<command to reload>",
                aliases: ["eval"],
                saying: "N/A.",
                cooldown: 0
            });
        }

        main(msg) {

            try {
                var raw = eval(msg.params.join(" ").replace("process.env"))
            } catch (err) {
                this.client.console.error(err);
            }

            const output = require("util").inspect(raw);

            msg.send(output, { code: true, split: true });
        }
    };