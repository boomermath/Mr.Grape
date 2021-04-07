const { Event } = require("../../structures");

module.exports =
    class extends Event {
        constructor(client) {
            super(client, {
                name: "commandError"
            });
        }

        main(name, err) {
            this.client.console.error(`Command "${name}" failed.\n${err.stack}`);
        }
    };