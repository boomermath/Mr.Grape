
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {
    namespace: 'users'
});
async function addMoni(who, howmuch) {
    let rightnow = await users.get(who);
    if (rightnow === undefined) {
        await users.set(who, 0)
    }
    let moremoni = rightnow + howmuch;
    await users.set(who, moremoni)
}

module.exports.addMoni = addMoni;
