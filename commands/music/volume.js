module.exports = {
    name: 'volume',
    description: 'set volume of the bot',
    aliases: ['vol'],
    execute(message, args, d) {
        let title, number;
        let argument = args.join(' ');
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('Get in a voice channel if you wanna pump it up!')
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send('There ain\'t any music!')
        if (!argument) { title = 'Current Volume'; number = queue.volume }
        else {
            let set = parseInt(argument)
            if (set > 10) return message.channel.send("Let's not earrape ppl ok?")
            queue.volume = set;
            queue.connection.dispatcher.setVolumeLogarithmic(set / 5);
            title = 'Volume set to'
            number = set
        }
        const volumeEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .addField(title, number)
        message.channel.send(volumeEmbed);
    }
};