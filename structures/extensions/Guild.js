const { Structures } = require("discord.js");
const { prefix } = require("../../config/main");
const { Guilds: guilds } = require("../../database");

Structures.extend("Guild", Guild => {
    return class extends Guild {

        async setPrefix(newPrefix) {
            const entry = guilds.cache.get(this.id)

            if (newPrefix === prefix) {
                if (entry) {
                    entry.destroy();
                    guilds.cache.delete(this.id)
                }
                else return;
            }

            else if (!entry) {
                const guildEntry = await guilds.create({ id: this.id, prefix: newPrefix })
                guilds.cache.set(guildEntry.id, guildEntry);
            }
            
            else {
                entry.prefix = newPrefix;
                entry.save();
            }
        }

        get prefix() {
            return guilds.cache.get(this.id)?.prefix;
        }
    }
})