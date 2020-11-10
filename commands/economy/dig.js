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
        
        function pick(ore, amount) {
           if (!inv.ore[ore]) {inv.ore[ore] = amount;}
           else {inv.ore[ore] += amount}
           mine.addField(`You got ${amount} ${ore}(s)!`,'_')
        }
        
        if (inv.t3p) {
           if (randNum(2) === 1) {pick(randArray(ores.tier1), randNum(7));}
           if (randNum(3) === 1) {pick(randArray(ores.tier2), randNum(4));}
           if (randNum(7) === 1) {pick(randArray(ores.tier3), randNum(3));}
          await d.items.set(message.author.id, inv);
        }
        else if (inv.t2p) {
           if (randNum(3) === 1) {pick(randArray(ores.tier1), randNum(5));}
           if (randNum(5) === 1) {pick(randArray(ores.tier2), randNum(3));}
           if (randNum(35) === 1) {pick(randArray(ores.tier3), 1);}
          await d.items.set(message.author.id, inv);
        }
        else if (inv.t1p) {
           if (randNum(4) === 1) {pick(randArray(ores.tier1), randNum(3));}
           if (randNum(25) === 1) {pick(randArray(ores.tier2), 1);}
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
