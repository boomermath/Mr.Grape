const { DataTypes } = require("sequelize");
const Model = require("../CachedModel");

class Users extends Model { }

Users.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
})

module.exports = Users;