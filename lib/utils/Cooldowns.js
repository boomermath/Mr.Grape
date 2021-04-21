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
            const timeMap = ["hour", "minute", "second"];
            const timeArr = new Date(time).toISOString().substr(11, 8).split(":");

            let string = "";

            for (const unit in timeArr) {
                const value = +timeArr[unit];
                if (value === 0 && unit !== 2) continue;
                string += `${unit === 2 ? value.toFixed(10) : value} ${timeMap[unit]}${value > 1 ? "s" : ""} `;
            }

            return string.length ? string : "1 second";
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