const { DataTypes } = require("sequelize");
const Model = require("../Model");

class Guilds extends Model { }

Guilds.init({
    guild_id: DataTypes.STRING,
    prefix: DataTypes.STRING
})

module.exports = Guilds;