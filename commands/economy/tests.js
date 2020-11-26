const gamble = require("./gamble");

module.exports = {
      name: "test",
      cooldown: 0,
      async execute(message, args, d) {
            function animateEmbed(diceRoll, bet) {
                  const gambleEmbed = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + `'s gambling table`)
                        .addFields('Ok, if you roll an even number you win, if you roll an odd number, you lose.', '_')
                        .setTimestamp()
                        .setFooter('Grape Gambling Club.');
                  message.channel.send(gambleEmbed)
                        .then((msg) => {
                              setTimeout(function () {
                                    msg.edit(gambleEmbed.addField('You rolled a . . .', '_')).then((msg) => {
                                          setTimeout(function () {
                                                msg.edit(gambleEmbed.addField(diceRoll, '_')).then((msg) => {
                                                      setTimeout(function () {
                                                            if (diceRoll % 2 === 0) {
                                                                  msg.edit(gambleEmbed.addField(`Congrats, you get ${bet} :star:s!`, '_'));
                                                                  return true;
                                                            }
                                                            else {
                                                                  msg.edit(gambleEmbed.addField('Rip, you lost your :star:s.', '_'));
                                                                  return false;
                                                            }
                                                      }, 2000)
                                                });
                                          }, 4000)
                                    });
                              }, 2000)
                        })
            }
            animateEmbed((Math.floor(Math.random() * 6) + 1), 50)
      },
};
