const { Event } = require("../../structures")

module.exports =
    class extends Event {
        constructor(client) {
            super(client, {
                name: "commandRun"
            })
        }

        main({ name }, { username, id }) {
            this.client.console.log(`Command "${name}" used by ${username} | ID: ${id}`);
        }
    }