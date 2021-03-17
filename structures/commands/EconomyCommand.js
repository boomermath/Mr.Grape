const { Users, UserItems, Items, OreStore, UserOres } = require("../../database");
const Command = require("./Command");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args);
        }

        get eco() {
            return {
                users: Users,
                items: UserItems,
                shop: Items,
                oreStore: OreStore,
                ores: UserOres
            };
        }
    };