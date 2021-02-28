const { Users, UserItems, Shop } = require("../../database");
const Command = require("./Command")

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args);
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

        async getInventory(id) {
            return await UserItems.findAll({
                where: { user_id: id },
                include: ['item']
            })
        }

        async addItem(id, item, amount) {
            const userItem = await UserItems.findOne({
                where: { user_id: id, item_id: item.id },
            })

            if (userItem) {
                userItem.amount += amount;
                return userItem.save();
            }

            return UserItems.create({ user_id: id, item_id: item.id, amount: amount });
        }

    }