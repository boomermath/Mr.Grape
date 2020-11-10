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
        
        if (inv.t3p) {
        let getTierOne = Math.floor(Math.random() * 2) + 1;  
        let getTierTwo = Math.floor(Math.random() * 4) + 1;
        let getTierThree = Math.floor(Math.random() * 8) + 1;
        if (getTierOne === 1) {
        let tierOneOre = ores.tier1[Math.floor(Math.random() * ores.tier1.length)];
        if (!inv.ore[tierOneOre]) {inv.ore[tierOneOre] = 0}            
        inv.ore[tierOneOre] += Math.floor(Math.random() * 3) + 1;
        mine.addField(`You got ${inv.ore[tierOneOre]} ${tierOneOre}(s)!`,'_')
        }
        if (getTierTwo === 1) {
        let tierTwoOre = ores.tier2[Math.floor(Math.random() * ores.tier2.length)];
        if (!inv.ore[tierTwoOre]) {inv.ore[tierTwoOre] = 0}
        inv.ore[tierTwoOre] += Math.floor(Math.random() * 2) + 1;
        mine.addField(`You got ${inv.ore[tierTwoOre]} ${tierTwoOre}(s)!`,'_')
        }
        if (getTierThree === 1) {
        let tierThree = ores.tier3[Math.floor(Math.random() * ores.tier3.length)];
        if (!inv.ore[tierThree]) {inv.ore[tierThree] = 0}
        inv.ore[tierThree] += Math.floor(Math.random() * 1) + 1;;
         mine.addField(`You got ${inv.ore[tierThree]} ${tierThree}(s)!`,'_')
        }
            await d.items.set(message.author.id, inv);
        }
        else if (inv.t2p) {
        let getTierOne = Math.floor(Math.random() * 3) + 1;  
        let getTierTwo = Math.floor(Math.random() * 5) + 1;
        let getTierThree = Math.floor(Math.random() * 30) + 1;
        if (getTierOne === 1) {
        let tierOne = ores.tier1[Math.floor(Math.random() * ores.tier1.length)];
        if (!inv.ore[tierOne]) {inv.ore[tierOne] = 0}
        inv.ore[tierOne] += Math.floor(Math.random() * 3) + 1;
         mine.addField(`You got ${inv.ore[tierOne]} ${tierOne}(s)!`,'_')
        }
        if (getTierTwo === 1) {
        let tierTwo = ores.tier2[Math.floor(Math.random() * ores.tier2.length)];
        if (!inv.ore[tierTwo]) {inv.ore[tierTwo] = 0}
        inv.ore[tierTwo] += Math.floor(Math.random() * 1) + 1;;
         mine.addField(`You got ${inv.ore[tierTwo]} ${tierTwo}(s)!`,'_')
        }     
        if (getTierThree === 1) {
        let tierThree = ores.tier3[Math.floor(Math.random() * ores.tier3.length)];
        if (!inv.ore[tierThree]) {inv.ore[tierThree] = 0}
        inv.ore[tierThree] += Math.floor(Math.random() * 1) + 1;;
         mine.addField(`You got ${inv.ore[tierThree]} ${tierThree}(s)!`,'_')
        }     
            await d.items.set(message.author.id, inv);
        }
        else if (inv.t1p) {
         let rand = Math.floor(Math.random() * 4) + 1;  
         let secondTier = Math.floor(Math.random() * 25) + 1;
         if (rand === 1) {
             let ore = ores.tier1[Math.floor(Math.random() * ores.tier1.length)];
             if (!inv.ore[ore]) {inv.ore[ore] = 0}
             inv.ore[ore] += Math.floor(Math.random() * 3) + 1;
             mine.addField('You got an ore!', ore);
         }
           if (secondTier === 1) {
             let Twoore = ores.tier2[Math.floor(Math.random() * ores.tier2.length)];
             if (!inv.ore[ore]) {inv.ore[ore] = 0}
             inv.ore[Twoore] += 1
             mine.addField('You got a tier 2 ore!', ore);
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
