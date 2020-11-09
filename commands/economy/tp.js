module.exports = {
name:"tp",
cooldown:0,
async execute (message,args,d) {
      if (parseInt(message.author.id) === 329331044828446722 || parseInt(message.author.id) === 705433506230304849) {
        let e = await d.items.get(message.author.id);
        e.t1p = 1
        await d.items.set(message.author.id, e);
      }
      
      else {return message.channel.send('back off!');}
       }
};
