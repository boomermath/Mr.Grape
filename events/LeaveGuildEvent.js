const Event = require("./ReadyEvent");

module.exports =
    class extends Event {
        constructor(client) {
            super(client, {
                name: "guildDelete",
            });
        }

        main() {
            this.updatePresence();
        }
    };