const chalk = require("chalk");
const { Console } = require("console");

const opts = {
    warn: "bgYellow",
    log: "inverse",
    success: "bgGreen",
    error: "bgRed",
    debug: "bgMagenta"
};

module.exports =
    class extends Console {
        constructor() {
            super(process.stdout, process.stderr);

            for (const method of Object.keys(opts)) {
                this[method] = function (args) { this.write(args, method); };
            }
        }

        get timestamp() {
            return new Date().toLocaleTimeString();
        }

        write(content, type = "log") {
            content = this._flatten(content);
            const colors = opts[type];
            super[type === "error" ? "error" : "log"](chalk[colors](`${content} | ${this.timestamp}`));
        }

        _flatten(data) {
            if (typeof data === "object") {
                const isArray = data instanceof Array;
                if (isArray && data.every(e => typeof e === "string")) return data.join("\n");
                return data.stack || data.message;
            }
            return String(data);
        }
    };