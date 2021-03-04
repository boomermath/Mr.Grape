const { Event } = require("../structures");

module.exports =
    class extends Event {
        constructor(client, name = "ready") {
            super(name, client);
        }

        main() {
            console.log("Ready!");
            this.updatePresence();
        }

        updatePresence() {
            this.client.user.setPresence({
                activity: {
                    name: `${this.client.config.prefix}help in ${this.client.guilds.cache.size} servers`,
                    type: "STREAMING",
                    url: "https://twitch.tv/adsf",
                },
            });
        }
    };

