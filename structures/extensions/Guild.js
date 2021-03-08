const { Structures } = require("discord.js");
const { Guilds: guilds } = require("../../database");

Structures.extend("Guild", Guild => {
    return class extends Guild {
        get settings() {
            return guilds.cache.get(this.id);
        }
    };
});