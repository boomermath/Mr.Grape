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

        getNameAmt({ params }) {
            if (params.length === 1) return [params[0], 1];
            const number = params.find(e => Number.isInteger(e));
            if (!number) return [false];
            params.splice(params.indexOf(number), 1);
            return [params[0], +number];
        }

        format(name, amount) {
            return `${amount} ${name}${amount > 1 ? "s" : ""}`;
        }
    };