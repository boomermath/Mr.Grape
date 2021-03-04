const centra = require("centra");
const Command = require("./Command");

module.exports =
    class extends Command {
        constructor(client, { url, params, ...args }) {
            super(client, args);
            this.url = url;
            this.params = params;
        }

        async request(opts) {
            const res = await centra(this.url).query({ ...this.params, ...opts }).send();
            return await res.json();
        }
    };