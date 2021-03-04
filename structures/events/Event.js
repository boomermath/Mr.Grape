const { Module } = require("../base");

module.exports =
    class extends Module {
        constructor(name, client) {
            super(name, client);
        }
    };