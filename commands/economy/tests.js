module.exports = {
      name: "test",
      cooldown: 0,
      execute(message, args, d) {
            const gambleEmbed = new d.Discord.MessageEmbed()
                  .setColor('#dd2de0')
                  .setTitle(message.author.username + `'s gambling table`)
                  .addFields({
                        name: '--------------',
                        value: 'ok, if you roll an even number you win, if you roll an odd number, you lose'
                  })
                  .setTimestamp()
                  .setFooter('Grape Gambling Club.');
            message.channel.send(gambleEmbed)
                  .then((msg) => {
                        setTimeout(function () {
                              msg.edit(gambleEmbed.addField('--------------', 'you rolled a . . .')).then((msg) => {
                                    setTimeout(function () {
                                          msg.edit(gambleEmbed.addField('--------------', '<insert number here>'));
                                    }, 2000)
                              });
                        }, 2000)
                  })
      },
};
