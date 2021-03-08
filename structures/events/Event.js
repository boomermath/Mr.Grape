const { Module } = require("../base");

module.exports =
    class extends Module {
        constructor(client, { name, once = false }) {
            super(name, client);
            this.once = once;
        }
    };