module.exports = {
	name: 'loop',
	description: 'get see what song is currently playin',
	cooldown: 2,
  aliases: ['repeat'],
	execute(message, args, d) {
  const serverQueue = message.client.queue.get(message.guild.id);;
  if (!serverQueue) return message.channel.send('There\'s nothin playin!');
  if (serverQueue.repeatMode === 0) {
  serverQueue.repeatMode = 1;
  message.channel.send('Now looping through the **queue**')
    }
  }
};
