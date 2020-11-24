module.exports = {
    name: "craft",
    cooldown: 0,
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        const fakeRecipe = {
            "refined tin": 1,
            "iron": 1,
            createditem: 'rigged dice'
        }
        const recipeCollection = {
            "test": fakeRecipe
        }
        if (Object.keys(recipeCollection).includes(args[0])) {
            let recipe = Object.keys(recipeCollection).find(v => args[0].includes(v));
            for (const key in recipeCollection[recipe]) {
                if (key === 'createditem') {continue;}
                if (!inv[key] || inv[key] < recipeCollection[recipe]) {
                    return message.channel.send('you dont have the sutff');
                }
                inv[key] -= recipeCollection[recipe];
            }
            if (!inv[recipe.createditem]) { inv[recipe.createditem] = 1 }
            else { inv[recipe.createditem] += 1 }
            await d.items.set(message.author.id, inv);
        }
        else { message.channel.send('idk bro') }
    }
};
