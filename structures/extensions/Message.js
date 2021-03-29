const { Structures } = require("discord.js");
const { Embed, PaginatedEmbed } = require("./Embed");
const emojis = require("../../config/emojis");

Structures.extend("Message", Message => {
    return class extends Message {
        constructor(...args) {
            super(...args);
            this.emojis = emojis;
            this.embed = Embed;
        }

        get _parsed() {
            if (!this.content.startsWith(this.prefix)) return;
            return this.content.slice(this.prefix.length).trim().split(/ +/);
        }

        get command() {
            if (!this._parsed) return;
            const command = this.client.commands.get(this._parsed[0].toLowerCase());
            return command ? command : null;
        }

        get params() {
            return this._parsed ? this._parsed.slice(1) : null;
        }

        get prefix() {
            return this.guild.settings?.prefix || this.client.config.prefix;
        }

        send(...opts) {
            return this.channel.send(...opts);
        }

        paginate(opts, entries, pageLength) {
            return new PaginatedEmbed(this, opts, entries, pageLength);
        }
    };
});