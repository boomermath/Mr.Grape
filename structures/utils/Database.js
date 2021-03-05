const {
    Users,
    UserItems,
    Items,
    Sequelize: sequelize,
    Ores: { Ores },
    Guilds,
} = require("../../database");

UserItems.belongsTo(Shop, { foreignKey: "item_id", as: "item" });
UserOres.belongsTo(OreStore, { foreignKey: "ore_id", as: "ore" });

module.exports =
    class {

        async loadItems() {
            const items = [Ores, Craftable, Items]
            await Promise.all(items.forEach(store => store.forEach(item => Shop.upsert(item))));
        }

        async init() {
            try {
                await sequelize.authenticate();
                await sequelize.sync({ force: true });
                await this.loadItems();
                await Users.load();
                await Guilds.load();
            } catch (err) { console.error(err); }
        }
    };