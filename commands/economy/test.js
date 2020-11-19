module.exports = {
    name: 'test',
    cooldown: 0,
    execute(message, args, d) {
        message.channel.send('Yes or no?')
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 5000,
            errors: ['time']
        })
            .then(message => {
                message = message.first()
                if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                    message.channel.send('You said yes')
                } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
                    message.channel.send('You said no rip')
                } else {
                    message.channel.send('bruh its yes or no')
                }
            })
            .catch(collected => {
                message.channel.send('ur slow');
            });
    }
};