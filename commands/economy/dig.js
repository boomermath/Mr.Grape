function randArray(array) {return array[Math.floor(Math.random() * array.length)];}
function randNum(e) {return Math.floor(Math.random() * e) + 1;}
module.exports = {
    name: 'dig',
    description: 'dig to earn stars',
    aliases: ['mine'],
    cooldown: 30,
    async execute(message, args, d) {
        const ores = {
         tier1: ['copper','tin','iron','lead','silver','bronze'],   
         tier2: ['gold','platinum','titanium','obisidan','cobalt','goshine','faslalt','maclantite'], 
         tier3: ['starium','lumionite','hellinite','grapium','heaveninite','erdon','shakerium','kelite','limeinite'] 
        }
        let shovelBreak = Math.floor(Math.random() * 15) + 1;
        let inv = await d.items.get(message.author.id);
        let earn;
        if (!inv || !inv.shovel || inv.shovel === 0) {
            earn = Math.round(Math.random() * 6) + 1;
        } else {
            earn = Math.round(Math.random() * 15) + 5;
        }
        const mine = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s mine`)
            .addFields({
                name: 'You dug up ' + earn + ' :star:s',
                value: '_'
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Enterprises');

        if (!inv) {inv = {};}
        if (!inv.ore) {inv.ore = {};}
        
        if (inv.t1p) {
          if (randNum(4) === 1) {
           const tier1 = randArray(ores.tier1);
           const amount = randNum(3);
           if (!inv.ore[tier1]) {inv.ore[tier1] = amount;}
           else {inv.ore[tier1] += amount}
           mine.addField(`You got ${amount} ${tier1}(s)!`,'_')
          }
           if (randNum(25) === 1) {
            const tier2 = randArray(ores.tier2);
            if (!inv.ore[tier2]) {inv.ore[tier2] = 1}
            else {inv.ore[tier2] += 1}
            mine.addField(`You got a ${tier2}!`,'_')
           }
          await d.items.set(message.author.id, inv);
        }
        
        if (inv && inv.shovel && inv.shovel > 0 && shovelBreak === 1) {
            mine.addFields({
                name: 'Uh oh!',
                value: 'Your shovel broke! If you want a new one, buy it from the shop!'
            });
            inv.shovel += -1;
            await d.items.set(message.author.id, inv);
        }
        
        message.channel.send(mine);
        d.addMoni(message.author.id, earn);

    }
};
