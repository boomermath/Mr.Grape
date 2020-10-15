
async function addMoni(who, howmuch) {
    let rightnow = await users.get(who);
    if (rightnow === undefined) {
        await users.set(who, 0)
    }
    let moremoni = rightnow + howmuch;
    await users.set(who, moremoni)
}

let target = message.mentions.members.first();

module.exports.addMoni = addMoni;
module.exports.target = target;
