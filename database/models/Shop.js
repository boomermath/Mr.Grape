const { DataTypes } = require("sequelize");
const Model = require("../Model");

class Shop extends Model { }

Shop.init({
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    price: DataTypes.INTEGER
})

module.exports = Shop;