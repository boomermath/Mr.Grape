const { Structures } = require("discord.js");
const { prefix } = require("../../config/main");
const { Guilds: guilds } = require("../../database");

Structures.extend("Guild", Guild => {
    return class extends Guild {

        get settings() {
            return guilds.cache.get(this.id);
        }

        async setPrefix(newPrefix) {
            if (newPrefix === prefix) {
                if (this.settings) {
                    this.settings.destroy();
                    guilds.cache.delete(this.id)
                }
                else return;
            }

            else if (!this.settings) {
                const guildEntry = await guilds.create({ id: this.id, prefix: newPrefix })
                guilds.cache.set(guildEntry.id, guildEntry);
            }

            else {
                this.settings.prefix = newPrefix;
                this.settings.save();
            }
        }
    }
})