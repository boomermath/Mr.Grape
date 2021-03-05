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
    data: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.type === "craft") {
                const recipe = Recipes[this.name];
                if (!recipe) throw new Error(`${this.name} doesn't have a recipe!`)
                return recipe;
            }
            else return null;
        },
    }
});

module.exports = Items;