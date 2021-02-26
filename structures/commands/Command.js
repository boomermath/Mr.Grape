const { Module } = require("../base");

module.exports =
    class extends Module {
        constructor(client, { name, description, aliases, cooldown, type, usage, saying, fan = false }) {
            super(name, client);
            this.type = type;
            this.usage = usage;
            this.aliases = aliases;
            this.description = description;
            this.cooldown = cooldown;
            this.saying = saying;
            this.fan = fan;
        }
    }