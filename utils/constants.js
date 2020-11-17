const querystring = require('querystring');
const r2 = require('r2');
const Discord = require('discord.js');
const message = require('discord.js')
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
    tier2: ['gold', 'platinum', 'titanium', 'obsidian', 'cobalt', 'goshine', 'fasalt', 'maclantite'],
    tier3: ['magmanite', 'rainbonite', 'starium', 'lumionite', 'hellinite', 'grapium', 'heaveninite', 'erdon', 'shakerium', 'kelite', 'limeinite']
}

const oreSell = {
    tier1: 9,
    tier2: 19,
    tier3: 25,
}

const emoji = {
    silver: "<:silver:776578867988267059>",
    titanium: "776587848924135434",
    tin: "776581611193368579",
    starium: "776601907254788107",
    shakerium: "776875604967948293",
    rainbonite: "776596286887165962",
    platinum: "776586722560966666",
    obsidian: "776589898039296021",
    hellinite: "776619917193117728",
    maclantite: "776598697022324769",
    lumionite: "776604908701876267",
    lead: "776579886637776908",
    iron: "776582852065230858",
    magmanite: "776607429034770494",
    heaveninite: "776616949533638657",
    grapium: "776612094929010688",
    goshine: "776592415209029643",
    gold: "776585426689327105",
    fasalt: "776598681218056203",
    erdon: "776623794622038066",
    copper: "776577290506600489",
    cobalt: "776590825412624414",
    bronze: "776581702318424134"
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
    "emoji": emoji
};
