const { Client } = require("discord.js");
const { CommandStore, EventStore } = require("./stores");
const { Console } = require("./utils");

require("./extensions");

module.exports = class extends Client {
    constructor(...opts) {

        super(...opts);

        this._registry = [];

        this.config = require("../config");

        this.console = new Console();

        this.commands = new CommandStore(this, {
            directory: "./commands"
        });

        this.events = new EventStore(this, {
            directory: "./events"
        });

        this.register("commands")
        this.register("events")
    }

    register(store) {
        return this._registry.push(store);
    }

    async login() {
        try {
            this._registry.forEach(store => {
                this.console.success(`Loaded ${this[store].init().size} modules from ${store}!`);
            })
        } catch (err) {
            this.console.error(err)
        }

        super.login();
    }
};