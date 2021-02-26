const { Client } = require("discord.js");
const { CommandStore, EventStore } = require("./stores");
const { Database } = require("./utils");

require("./extensions");

module.exports = class extends Client {
    constructor(...opts) {

        super(...opts)

        this.config = require("../config/client")

        this.commands = new CommandStore({
            client: this,
            directory: "./commands"
        });

        this.events = new EventStore({
            client: this,
            directory: "./events"
        });

        this.database = new Database();
    }

    async login() {
        await this.database.init()
        this.events.init();
        this.commands.init();
        super.login();
    }
}