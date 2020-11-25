module.exports = {
      name: "test",
      cooldown: 0,
      execute(message, args, d) {
            const mine = new d.Discord.MessageEmbed()
                  .setColor('#dd2de0')
                  .setTitle(message.author.username + `'s mine`)
                  .addField('field 1', '_')
                  .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                  .setTimestamp()
                  .setFooter('Grape Mining Guild');

            message.edit(mine.addField('field 2', '_'))
      }
};
