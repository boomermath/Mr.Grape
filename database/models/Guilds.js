const { DataTypes } = require("sequelize");
const { prefix } = require("../../config");
const Model = require("../CachedModel");

class Guilds extends Model {
    async setPrefix(newPrefix) {
        if (newPrefix === prefix) {
            if (this.settings) {
                this.settings.destroy();
                this.cache.delete(this.id);
            }
            else return;
        }

        else if (!this.settings) {
            const guildEntry = await guilds.create({ id: this.id, prefix: newPrefix });
            this.cache.set(guildEntry.id, guildEntry);
        }

        else {
            this.settings.prefix = newPrefix;
            this.settings.save();
        }
    }
}

Guilds.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    prefix: DataTypes.STRING
});

module.exports = Guilds;