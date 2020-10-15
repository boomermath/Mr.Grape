
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {
    namespace: 'users'
});

async function addMoni(who, howmuch) {
    let rightnow = await users.get(who);
    if (rightnow === undefined) {
        await users.set(who, 0)
    }
    await users.set((rightnow+howmuch), moremoni)
}

module.exports.addMoni = addMoni;
