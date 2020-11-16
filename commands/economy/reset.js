module.exports = {
    name: 'reset',
    description: 'buy stuff from the shop',
    cooldown: 2,
    async execute(message, args, d) {
        const e = {};
        await d.items.set(message.author.id, e)
    }
};
