const Command = require("./Command");

module.exports =
    class extends Command {
        constructor(client, { requiredPermissions, ...args }) {
            super(client, args);
            this.requiredPermissions = requiredPermissions;
        }
    }