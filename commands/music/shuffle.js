module.exports = {
    name: 'shuffle',
    description: 'get lyrics of a song',
    cooldown: 1,
    aliases: ['shf'],
    cd: "Too much shuffle make my head spin",
    execute(message, args, d) {
        const q = message.client.queue.get(message.guild.id);
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        q.songs = shuffle(q.songs);
        message.client.queue.set(message.guild.id, q)
    }
};
