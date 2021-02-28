const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.DATABASE, { logging: false });