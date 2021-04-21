const { Event } = require("../../structures");

module.exports =
    class extends Event {
        constructor(...args) {
            super(...args, {
                name: "guildCreate",
            });
        }

        main(guild) {
            this.client.console.log(`I joined ${guild.name}!`);
            super.updatePresence();
        }
    };