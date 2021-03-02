const { Users, UserItems, Shop, OreStore, UserOres } = require("../../database");
const Command = require("./Command")

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args);
        }

        get eco() {
            return {
                users: Users, 
                inventories: UserItems, 
                shop: Shop, 
                ores: OreStore, 
                userOres: UserOres
            }
        }

        async add(id, amount) {
            const user = Users.cache.get(id)
            if (user) {
                user.balance += amount;
                return user.save();
            }
            const newPerson = await Users.create({ id: id, balance: amount });
            Users.cache.set(id, newPerson);
            return newPerson;
        }

        getBalance(id) {
            const user = Users.cache.get(id);
            return user ? user.balance : 0;
        }

        get [Symbol.species]() {
            return Command;
        }
    }