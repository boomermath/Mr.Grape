module.exports = {
    name: "task",
    description: "unscramble a word for $$$",
    cooldown: 0,
    execute(message, args, d) {
        const fruitArray = [
            'apple', 'apricot', 'avocado', 'banana', 'berry', 'blackberry', 'orange', 'blueberry', 'boysenberry', 'breadfruit', 'cantaloupe', 'cherry', 'citron', 'citrus', 'coconut', 'crabapple', 'cranberry', 'currant', 'date', 'durian', 'elderberry', 'fig', 'grape', 'grapefruit', 'guava', 'honeydew', 'jackfruit', 'kiwi', 'kumquat', 'lemon', 'lime', 'lingonberry', 'loquat', 'lychee', 'mandarin', 'mango', 'melon', 'mulberry', 'nectarine', 'papaya', 'peach', 'pear', 'persimmon', 'pineapple', 'plantain', 'plum', 'pluot', 'pomegranate', 'pomelo', 'prune', 'quince', 'raisin', 'raspberry', 'strawberry', 'tangelo', 'tangerine', 'watermelon'
        ]
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array.join('');
        }
        let word = Math.floor(Math.random() * fruitArray.length);
        let scrambledWord = shuffle(word.split(''));
        const scrambleEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s task`)
            .addField('Unscramble', ```${word}```)
            .setTimestamp()
            .setFooter('Grape Enterprises');
        message.channel.send(scrambleEmbed);
        let filter = m => m.author.id === message.author.id
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 9000,
            errors: ['time']
        })
            .then(async message => {
                message = message.first()
                if (message.content.toLowerCase() === word) {
                    message.channel.send(`Yay! You guessed the word correctly! You get some :star:s`)
                } else {
                    message.channel.send(`bruh ur bad, the word was ${word} duh`)
                }
            })
            .catch(collected => {
                message.channel.send(`cmon slowpoke, its not that hard, it was ${word}`);
            });


    }
};
