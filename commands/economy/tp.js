module.exports = {
name:"tp",
cooldown:0,
async execute (message,args,d) {
      if (parseInt(message.author.id) === 329331044828446722 || parseInt(message.author.id) === 705433506230304849) {
        let e = await d.items.get(message.author.id);
        if (args[0] === 1) {e.t1p = 1}
        else if (args[0] === 2) {e.t2p = 1}
        else if (args[0] === 3) {e.t3p = 1}
        else {message.channel.send('specify');}
        await d.items.set(message.author.id, e);
        message.channel.send('done');
      }
      
      else {return message.channel.send('back off!');}
       }
};
