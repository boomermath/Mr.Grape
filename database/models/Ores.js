const { DataTypes } = require("sequelize");
const { Ores: { Ores, OrePrices } } = require("../assets")
const Model = require("../Model");

class Ores extends Model {}

Ores.init({
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    tier: DataTypes.INTEGER,
    price: {
        type: DataTypes.VIRTUAL,
        get() {
            return OrePrices[this.tier - 1];
        }
    }
})

module.exports = Ores;