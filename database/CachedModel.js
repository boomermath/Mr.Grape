const { Collection } = require("discord.js")
const Model = require("./Model")

module.exports =
    class extends Model {
        static async load() {
            this.cache = new Collection()

            const entries = await this.findAll();
            for (const entry of entries) this.cache.set(entry.id, entry);
        }
    }