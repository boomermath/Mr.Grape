const { DataTypes } = require("sequelize");
const Model = require("../Model");

class UserOres extends Model {}

UserOres.init({
    user_id: DataTypes.STRING,
    ore_id: DataTypes.INTEGER,
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    refined: DataTypes.BOOLEAN
});

module.exports = UserOres;