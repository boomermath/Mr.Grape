const Event = require("./ReadyEvent");

module.exports =
    class extends Event {
        constructor(client) {
            super(client, {
                name: "guildCreate",
            });
        }

        main() {
            this.updatePresence();
        }
    };