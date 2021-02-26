const { DataTypes } = require("sequelize");
const Model = require("../Model");

class Users extends Model { }

Users.init({
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
})

module.exports = Users;