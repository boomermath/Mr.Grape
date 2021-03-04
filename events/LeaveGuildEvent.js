const Event = require("./ReadyEvent");

module.exports =
    class extends Event {
        constructor(client) {
            super(client, "guildDelete");
        }

        main() {
            this.updatePresence();
        }
    };