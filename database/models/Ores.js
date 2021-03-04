const { DataTypes } = require("sequelize");
const { Ores: { OrePrices } } = require("../items");
const Model = require("../Model");

class Ores extends Model { }

Ores.init({
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    price: {
        type: DataTypes.VIRTUAL,
        get() {
            return OrePrices[this.tier - 1];
        },
        set() {
            throw new Error("If you want to set the price, go to ./database/items/ores!");
        }
    },
    tier: DataTypes.INTEGER
});

module.exports = Ores;