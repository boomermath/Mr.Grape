const { Users, UserItems, Items, OreStore, UserOres } = require("../../database");
const Command = require("./Command");

module.exports =
    class extends Command {
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
            const number = params.find(e => Number.isInteger(+e));
            if (!number) return [false];
            return [params.filter(i => i !== number).join(" "), +number];
        }

        format(name, amount) {
            return `${amount} ${name}${amount > 1 ? "s" : ""}`;
        }
    };