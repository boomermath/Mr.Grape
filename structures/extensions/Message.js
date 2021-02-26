const { Structures } = require("discord.js");
const { Embed, PaginatedEmbed } = require("./Embed");

Structures.extend("Message", Message => {
    return class extends Message {
        constructor(...args) {
            super(...args)
            this.emojis = require("../../config/emojis");
            this.embed = Embed;
            if (this.content.startsWith(this.prefix)) {
                [this.command, ...this.args] = this.content.slice(this.prefix.length).trim().split(/ +/);
            }
        }

        get prefix() {
            return this.client.database.cache.guilds.get(this.guild.id)?.prefix || this.client.config.prefix;
        }

        send(...opts) {
            return this.channel.send(...opts);
        }

        paginate(opts, entries, pageLength) {
            return new PaginatedEmbed(this, opts, entries, pageLength);
        }
    }
})