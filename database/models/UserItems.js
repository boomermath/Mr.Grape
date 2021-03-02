const { DataTypes } = require("sequelize");
const Model = require("../Model");

class UserItems extends Model { }

UserItems.init({
    user_id: DataTypes.STRING,
    item_id: DataTypes.STRING,
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})

module.exports = UserItems;