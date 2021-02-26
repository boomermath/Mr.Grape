const { Collection } = require("discord.js");

module.exports =
    class {
        constructor() {
            this.cooldowns = new Collection();
        }

        calculateCooldown(now, fans, { cooldown }) {
            const multiplier = Math.pow(0.03, fans) * cooldown;
            return multiplier < 1.5 ? now + 1500 : now + ( multiplier * 1000 );
        }

        main(command, { id, fans }) {
            if (!this.cooldowns.has(command.name)) this.cooldowns.set(command.name, new Collection());

            const now = Date.now();
            const cooldowns = this.cooldowns.get(command.name);
            const cooldown = cooldowns.get(id);

            if (!cooldown) cooldowns.set(id, command.fan ? this.calculateCooldown(now, fans, command) : now + command.cooldown)

            else if (cooldown > now) return true;

            else cooldowns.delete(id);
        }
    }