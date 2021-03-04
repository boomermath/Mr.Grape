const Event = require("./ReadyEvent");

module.exports =
    class extends Event {
        constructor(client) {
            super(client, "guildCreate");
        }

        main() {
            this.updatePresence();
        }
    };