const { UserItems } = require("../../database");
const Command = require("./Command")

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args);
            this.users = this.client.database.users
            this.usersBals = this.client.database.cache.users;
            this.userItems = this.client.database.useritems;
            this.shop = this.client.database.shop;
            this.items = this.client.database.items;
        }

        async add(id, amount) {
            const user = this.usersBals.get(id)
            if (user) {
                user.balance += amount;
                return user.save();
            }
            const newPerson = await this.users.create({ user_id: id, balance: amount });
            this.usersBals.set(id, newPerson);
            return newPerson;
        }

        getBalance(id) {
            const user = this.usersBals.get(id);
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