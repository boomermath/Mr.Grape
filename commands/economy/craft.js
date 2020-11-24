const recipe = require('../../utils/recipes');
module.exports = {
    name: "craft",
    cooldown: 0,
    async execute(message, args, d) {
        let argument = args.join(' ');
        let numberMatch = /\d+/g;
        let inv = await d.items.get(message.author.id);
        if (Object.keys(recipe).some(e => argument.includes(e))) {
            let craft = Object.keys(recipe).find(e => argument.includes(e));
            let numItems = parseInt(numberMatch.match(argument));
            if (numItems === 0) { return message.channel.send('ur not funny'); }
            if (isNaN(numItems) || numItems < 1) { numItems = 1; }
            for (const key in recipe[craft]) {
                if (key === 'createditem') { continue; }
                if (!inv.ore[key] || inv.ore[key] < recipe[craft][key] * numItems) {
                    return message.channel.send('you dont have the stuff');
                }
                inv.ore[key] -= recipe[craft][key] * numItems;
            }
            if (!inv[recipe[craft].createditem]) { inv[recipe[craft].createditem] = numItems }
            else { inv[recipe[craft].createditem] += numItems }
            await d.items.set(message.author.id, inv);
            message.channel.send('successfully crafted')
        }
        else { message.channel.send('idk bro') }
    }
};
