const { EconomyCommand } = require("../../structures");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "gamble",
                type: "economy",
                description: "50/50 chance of losing, or getting the amount you bet.",
                usage: "<number of :star:s>",
                aliases: ["bet"],
                saying: "If you have a gambling problem, call 1-800-522-4700.",
                cooldown: 2
            });
        }

        randomize(num, rigged) {
            const riggedArr = [1, 2, 3, 4, 4, 6];
            return rigged ? riggedArr[Math.floor(Math.random() * riggedArr.length)] : Math.floor(Math.random() * num) + 1;
        }

        wait(seconds) {
            return new Promise(resolve => setTimeout(resolve, seconds * 1000));
        }

        async verify(msg) {
            const collector = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, time: 7000 });
            const message = collector.first().content.toLowerCase();

            if (message === "y" || message === "yes") return true;
            else return false;
        }

        async main(msg) {
            let rigged = false;
            const balance = this.eco.users.getBalance(msg.author.id);
            const number = msg.params[0] === "all" || msg.params[0] === "max" ? balance : +msg.params[0];

            if (!number || number < 0 || number > balance) return msg.send("That's not a valid number of stars to bet.");

            if (await this.eco.items.getItem(msg.author.id, "rigged die")) {
                msg.send("Do you want to use your rigged die?");

                const rig = await this.verify(msg);
                if (rig) rigged = true;
            }

            if (number === balance) {
                msg.send("Are you sure you wanna do that?");

                const gamble = await this.verify(msg);
                if (!gamble) return msg.send("I thought so.");
            }

            const dice = this.randomize(6, rigged);
            const gambleEmbed = new msg.embed()
                .setTitle(`${msg.author.username}'s gambling table`)
                .addField("Ok, if you roll an even number you win, if you roll an odd number, you lose.", "\u200b");

            const gambleMsg = await msg.send(gambleEmbed);
            await this.wait(1.7);
            gambleMsg.edit(gambleEmbed.addField("You rolled a . . .", "\u200b"));
            await this.wait(3.5);
            gambleMsg.edit(gambleEmbed.addField(dice, "\u200b"));
            await this.wait(1.7);

            if (dice % 2 === 0) {
                gambleMsg.edit(gambleEmbed.addField(`Congrats, you get ${number} :star:s!`, "\u200b"));
                if (rigged) {
                    const caught = this.randomize(25);
                    if (caught === 1) {
                        await this.wait(1.7);
                        gambleMsg.edit(gambleEmbed.addField(`Uh oh! You were looking sus, so you got busted and lost your ${number} :star:s!`, "\u200b"));
                        return this.eco.users.add(msg.author.id, -number);
                    }
                    this.eco.users.add(msg.author.id, number);
                }
            }
            else {
                gambleMsg.edit(gambleEmbed.addField(`Rip, you lost your ${number} :star:s.`, "\u200b"));
                this.eco.users.add(msg.author.id, -number);
            }
        }
    };