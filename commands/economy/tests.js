module.exports = {
      name: "test",
      cooldown: 0,
      execute(message, args, d) {
            const mine = new d.Discord.MessageEmbed()
                  .setColor('#dd2de0')
                  .setTitle('test')
                  .addField('field 1', '_')
                  .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                  .setTimestamp()
                  .setFooter('Grape Mining Guild');
            message.channel.send(mine).then((m) =>
                  m.edit(mine.addField('field 2', '_')))
      },
};
