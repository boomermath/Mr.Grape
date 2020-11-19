module.exports = {
    name: 'reset',
    description: 'check ur balance',
    async execute(message, args, d) {
        await d.users.set(message.author.id, 0);
    }
};
