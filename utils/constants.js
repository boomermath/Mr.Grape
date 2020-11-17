const querystring = require('querystring');
const r2 = require('r2');
const Discord = require('discord.js');
const config = require('../config.json');
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, { namespace: 'users' });
const items = new Keyv(process.env.DATABASE_URL, { namespace: 'items' });
const addMoni = async function (who, add) {
    let current = await users.get(who);
    if (current === undefined) { await users.set(who, add); }
    else { await users.set(who, (current + add)) }
}
const itemShop = {
    fan: 100,
    orangedetector: 100,
    mangodetector: 50,
    carrotdetector: 50,
    starmagnet: 100,
    shovel: 100,
    starmill: 400,
    tieronepick: 500,
    tiertwopick: 650,
    tierthreepick: 750
}
const ores = {
    tier1: ['copper', 'tin', 'iron', 'lead', 'silver', 'bronze'],
    tier2: ['gold', 'platinum', 'titanium', 'obisidan', 'cobalt', 'goshine', 'faslalt', 'maclantite'],
    tier3: ['rainbonite', 'starium', 'lumionite', 'hellinite', 'grapium', 'heaveninite', 'erdon', 'shakerium', 'kelite', 'limeinite']
}

const oreSell = {
    tier1: 9,
    tier2: 19,
    tier3: 25,
}
module.exports = {
    "Discord": Discord,
    "config": config,
    "users": users,
    "addMoni": addMoni,
    "items": items,
    "itemShop": itemShop,
    "querystring": querystring,
    "r2": r2,
    "ores": ores,
    "oreSell": oreSell,
    "guilds": guilds
};
