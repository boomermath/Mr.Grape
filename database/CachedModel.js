const { Collection } = require("discord.js");
const Model = require("./Model");
const chalk = require("chalk")
module.exports =
    class extends Model {
        static async load() {
            this.cache = new Collection();

            const entries = await this.findAll();
            entries.forEach(entry => this.cache.set(entry.id, entry));
        }
    };