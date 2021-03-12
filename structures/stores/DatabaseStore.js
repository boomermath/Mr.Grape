const { Model } = require("sequelize")
const { Store } = require("../base");

module.exports =
    class extends Store {
        constructor(client, { directory }) {
            super("database", client, directory, Model)
        }

        init() {
            
        }
    }