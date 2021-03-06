const { Module } = require("../base");

module.exports =
    class extends Module {
        constructor(client, { name }) {
            super(name, client)
        }
    };