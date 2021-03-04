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

        randomize(num) {
            return Math.floor(Math.random() * num) + 1;
        }

        wait(seconds) {
            return new Promise(resolve => setTimeout(resolve, seconds * 1000));
        }

        async main(msg, args) {
            const balance = this.eco.users.getBalance(msg.author.id);
            const number = args[0] === "all" ? balance : +args[0];

            if (!number || number < 0 || number > balance) return msg.send("That's not a valid number of stars to bet.");

            if (number === balance) {
                try {
                    msg.send("Are you sure you wanna do that?");

                    const collected = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                        max: 1,
                        time: 8000,
                        errors: ["time"]
                    });

                    const message = collected.first().content.toLowerCase();

                    if (message === "y" || message === "yes") null;
                    else if (message === "n" || message === "no") return msg.send("ok then");
                    else return msg.send("bruh its yes/no");
                } catch {
                    return msg.send("ok ig not");
                }
            }

            const dice = this.randomize(6);
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
                this.eco.users.add(msg.author.id, number);
            }
            else {
                gambleMsg.edit(gambleEmbed.addField(`Rip, you lost your ${number} :star:s.`, "\u200b"));
                this.eco.users.add(msg.author.id, -number);
            }
        }
    };