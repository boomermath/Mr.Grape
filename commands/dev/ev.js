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

        async main(msg) {
                
            let raw;

            try {
                raw = eval(msg.params.join(" ").replace("process.env"));
            } catch (err) {
                raw = err;
            }

            const output = require("util").inspect(raw).replace(this.client.token, "[redacted]");

            msg.send(output, { code: true, split: true });
        }
    };