const { DataTypes } = require("sequelize");
const { Recipes } = require("../assets");
const Model = require("../Model");

class Items extends Model { }

Items.init({
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ["shop", "craft"]
    },
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    alias: DataTypes.STRING,
    data: {
        type: DataTypes.VIRTUAL,
        get() {
            return Recipes[this.name] || null;
        }
    }
});

module.exports = Items;