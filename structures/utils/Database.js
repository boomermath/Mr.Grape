const {
    Sequelize: sequelize,
    Users,
    UserItems,
    UserOres,
    Items,
    OreStore,
    Guilds,
    Craftable,
    ShopItems,
    Ores
} = require("../../database");

UserItems.belongsTo(Shop, { foreignKey: "item_id", as: "item" });
UserOres.belongsTo(OreStore, { foreignKey: "ore_id", as: "ore" });

module.exports =
    class {

        async _loadItems() {
            const promises = [
                ...ShopItems.map(item => Items.upsert(item)),
                ...Craftable.map(craft => Items.upsert(craft)),
                ...Ores.map(ore => OreStore.upsert(ore))
            ]

            await Promise.all(promises);
        }

        async init() {
            try {
                await sequelize.authenticate();
                await sequelize.sync({ force: true });
                await this._loadItems();
                await Users.load();
                await Guilds.load();
            } catch (err) { console.error(err); }
        }
    };