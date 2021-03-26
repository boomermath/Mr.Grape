const { DataTypes } = require("sequelize");
const Ores = require("./Ores");
const Model = require("../Model");

class UserOres extends Model {
    static async addOre(id, ore, amt, rf = false) {
        const userOre = await this.findOne({
            where: {
                user_id: id,
                ore_id: ore.id,
                refined: rf
            }
        });

        if (userOre) {
            userOre.amount += amt;
            if (!userOre.amount) return userOre.destroy();
            return userOre.save();
        }

        return await this.create({ user_id: id, ore_id: ore.id, amount: amt, refined: rf });
    }

    static async getOre(id, oreName, rf = false) {
        const ore = await Ores.findOne({ where: { name: oreName } });

        if (!ore) throw new Error("Invalid ore!");

        const userOre = await this.findOne({
            where: {
                user_id: id,
                ore_id: ore.id,
                refined: rf
            }
        });

        return userOre ? userOre.amount : 0;
    }

    static async deleteOre(id, oreName, amt = 1, rf = false) {
        const ore = await Ores.findOne({ where: { name: oreName } });

        if (!ore) throw new Error("Invalid ore to delete!");

        this.addOre(id, ore, -amt, rf)
    }
}

UserOres.init({
    user_id: DataTypes.STRING,
    ore_id: DataTypes.INTEGER,
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    refined: DataTypes.BOOLEAN
});

module.exports = UserOres;