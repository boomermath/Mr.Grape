const {
    Users,
    UserItems,
    UserOres,
    Shop,
    Items,
    Sequelize: sequelize,
    Ores: { Ores },
    OreStore,
    Guilds
} = require("../../database");

UserItems.belongsTo(Shop, { foreignKey: "item_id", as: "item" });
UserOres.belongsTo(OreStore, { foreignKey: "ore_id", as: "ore" })

module.exports =
    class {

        async loadShops() {
            await Promise.all(Items.map(item => Shop.upsert(item)));
            await Promise.all(Ores.map(ore => OreStore.upsert(ore)))
        }

        async init(opts) {
            try {
                await sequelize.authenticate();
                await sequelize.sync({ alter: true });
                await this.loadShops();
                await Users.load();
                await Guilds.load();
            } catch (err) { console.error(err); }
        }
    }