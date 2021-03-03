const { DataTypes } = require("sequelize");
const Shop = require("./Shop");
const Model = require("../Model");

class UserItems extends Model {

    async addItem(id, itemObj, amt) {
        const userItem = await this.findOne({
            where: { user_id: id, item_id: itemObj.id }
        });

        if (userItem) {
            userItem.amount += amt;
            if (!userItem.amount) return userItem.destroy();
            return userItem.save()
        }

        return await this.create({ user_id: id, item_id: item.id, amount: amt });
    }

    async getItem(id, itemName) {
        const item = await Shop.findOne({ where: { name: itemName } });

        if (!item) throw new Error("Invalid item!");

        const userItems = await this.findOne({
            where: { user_id: id, item_id: item.id }
        })

        return userItems ? userItems.amount : 0;
    }
}

UserItems.init({
    user_id: DataTypes.STRING,
    item_id: DataTypes.STRING,
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

module.exports = UserItems;