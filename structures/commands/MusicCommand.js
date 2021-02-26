const { Collection } = require("discord.js");
const Queues = new Collection();
const Command = require("./Command");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args);
            this.musicQueues = Queues;
        }
    }