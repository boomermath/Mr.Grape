const { Collection } = require("discord.js");

module.exports =
    class {
        constructor() {
            this.cooldowns = new Collection();
        }

        calculateCooldown(now, fans, { cooldown }) {
            const multiplier = Math.pow(0.03, fans) * cooldown;
            console.log(multiplier);
            return multiplier < 1.5 ? now + 1500 : now + (multiplier * 1000);
        }

        format(time) {
            let string = "";
            const units = ["hour", "minute", "second"];
            const times = new Date(time).toISOString().substr(11, 8).split(":");

            for (const unit of times) {
                if (!(unit > 0)) continue;
                string += `\n**${+unit} ${units[times.indexOf(unit)]}${unit > 1 ? "s" : ""}**`;
            }

            return string;
        }

        main(command, { id, fans }) {
            if (!this.cooldowns.has(command.name)) this.cooldowns.set(command.name, new Collection());

            const now = Date.now();
            const cooldowns = this.cooldowns.get(command.name);
            const cooldown = cooldowns.get(id);

            const setCooldown = command.fan ? this.calculateCooldown(now, fans, command) : now + command.cooldown * 1000;

            if (!cooldown) cooldowns.set(id, setCooldown);

            else if (cooldown > now) return cooldown - now;

            else cooldowns.delete(id);
        }
    };