module.exports = {
    name: 'sell',
    description: 'give items for a price to people',
    cooldown: 5,
    cd: "Buddy this ain't a bazaar",
    fan: true,
    async execute(message, args, d) {
        let argument = args.join('').toLowerCase();
        const regex = /\d+/g;
        let numberOfItems = 3;
        return;
    }
};