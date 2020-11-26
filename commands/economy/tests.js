const gamble = require("./gamble");

module.exports = {
      name: "test",
      cooldown: 0,
      async execute(message, args, d) {
            function animateEmbed(diceRoll, bet) {
                  const gambleEmbed = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + `'s gambling table` + '\n___')
                        .addField('Ok, if you roll an even number you win, if you roll an odd number, you lose.', '_')
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
                                                                  msg.edit(gambleEmbed.addField(`Rip, you lost your ${bet} :star:s.`, '_'));
                                                                  return false;
                                                            }
                                                      }, 1700)
                                                });
                                          }, 3500)
                                    });
                              }, 1700)
                        })
            }
            async function decideFate(bet) {
                  let finalNumber;
                  let inv = await d.items.get(message.author.id);
                  if (inv && inv["rigged dice"]) {
                        const riggedArray = [2, 2, 2, 2, 5, 5]
                        finalNumber = riggedArray[Math.floor(Math.random() * riggedArray.length)];
                  }
                  else { finalNumber = Math.floor(Math.random() * 6) + 1; }
                  let e = animateEmbed(finalNumber, bet)
                  message.channel.send(e)
                  if (e) { d.addMoni(message.author.id, bet); }
                  else { d.addMoni(message.author.id, -bet) }
            }
            let userBal = await d.users.get(message.author.id);
            if (args[0] === 'all') {
                  message.channel.send("Are you sure you wanna do that?")
                  let filter = m => m.author.id === message.author.id
                  message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 3500,
                        errors: ['time']
                  })
                        .then(message => {
                              message = message.first()
                              if (message.content.toLowerCase() === 'yes' || message.content.toLowerCase() === 'y') {
                                    decideFate(userBal);
                              } else if (message.content.toLowerCase() === 'no' || message.content.toLowerCase() === 'n') {
                                    message.channel.send('ok then')
                              }
                              else { message.channel.send('Bruh its yes/no') }
                        })
                        .catch(collected => {
                              message.channel.send('ig not')
                        });
            }
            else if (!isNaN(parseInt(args[0])) && parseInt(args[0]) > 1 && parseInt(args[0]) <= userBal) { decideFate(parseInt(args[0])) }
            else { message.channel.send('Bruh that\'s not a valid number of stars to bet') }
      },
};
