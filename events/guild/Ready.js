const { Event } = require("../../structures");

module.exports =
    class extends Event {
        constructor(...args) {
            super(...args, {
                name: "ready",
                once: true
            });
        }

        main() {
            this.client.console.log("Ready!");
            super.updatePresence();
        }
    };

