module.exports = {
    name: 'test',
    description: 'check ur balance',
    async execute(message, args, d) {
        let e = await d.items.get(message.author.id)
        message.channel.send(Object.keys(e.ore));

    }
};
