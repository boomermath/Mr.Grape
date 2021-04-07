const { Event } = require("../../structures");

module.exports =
    class extends Event {
        constructor(...args) {
            super(...args, {
                name: "guildDelete",
            });
        }

        main(guild) {
            this.client.console.log(`I left ${guild.name}.`);
            this.updatePresence();
        }
    };