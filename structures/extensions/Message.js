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

        get command() {
            if (!this.content.startsWith(this.prefix)) return;
            [this._parsedCommand, ...this.params] = this.content.slice(this.prefix.length).trim().split(/ +/);
            const command = this.client.commands.get(this._parsedCommand.toLowerCase());
            return command;
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