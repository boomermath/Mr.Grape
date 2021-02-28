const { Client } = require("discord.js");
const { CommandStore, EventStore } = require("./stores");
const { Database } = require("./utils");

require("./extensions");

module.exports = class extends Client {
    constructor(...opts) {

        super(...opts)

        this.config = require("../config/main");

        this.commands = new CommandStore(this, {
            directory: "./commands"
        });

        this.events = new EventStore(this, {
            directory: "./events"
        });
    }

    async login() {
        this.events.init();
        this.commands.init();
        super.login();
    }
}