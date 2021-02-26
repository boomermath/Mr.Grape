const { Collection } = require("discord.js");
const {
    Users,
    UserItems,
    UserOres,
    Shop,
    Sequelize,
    Items,
    Ores: { Ores },
    OreStore,
    Guilds
} = require("../../database");

module.exports =
    class {
        constructor() {
            this.users = Users;
            this.userItems = UserItems;
            this.shop = Shop;
            this.guilds = Guilds;
            this.cache = {
                users: new Collection(),
                guilds: new Collection()
            }
        }

        async init() {
            UserItems.belongsTo(Shop, { foreignKey: "item_id", as: "item" });
            UserOres.belongsTo(OreStore, { foreignKey: "ore_id", as: "ore" })
            try {
                await Sequelize.authenticate();
                await Sequelize.sync({ alter: true });
                await Promise.all(Items.map(item => Shop.upsert(item)));
                await Promise.all(Ores.map(ore => OreStore.upsert(ore)));
                await this.loadGuildPrefixes();
                await this.loadUsers();
            } catch (err) { console.error(err); }
        }

        async loadUsers() {
            const balances = await Users.findAll()
            for (const balance of balances) this.cache.users.set(balance.user_id, balance);
        }

        async loadGuildPrefixes() {
            const prefixes = await Guilds.findAll()
            for (const prefix of prefixes) this.cache.guilds.set(prefix.guild_id, prefix);
        }
    }