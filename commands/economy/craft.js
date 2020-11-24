const recipe = require('./utils/recipes');
module.exports = {
    name: "craft",
    cooldown: 0,
    async execute(message, args, d) {
        let argument = args.join(' ');
        let inv = await d.items.get(message.author.id);
        if (Object.keys(recipe).some(e => argument.includes(e))) {
            let craft = Object.keys(recipe).find(e => argument.includes(e));
            for (const key in recipe[craft]) {
                if (key === 'createditem') { continue; }
                if (!inv.ore[key] || inv.ore[key] < recipe[craft][key]) {
                    return message.channel.send('you dont have the stuff');
                }
                inv.ore[key] -= recipe[craft][key];
            }
            if (!inv[recipe[craft].createditem]) { inv[recipe[craft].createditem] = 1 }
            else { inv[recipe[craft].createditem] += 1 }
            await d.items.set(message.author.id, inv);
        }
        else { message.channel.send('idk bro') }
    }
};
