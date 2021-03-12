const chalk = require("chalk");
const { inspect } = require("util");
const { Console } = require("console");

const logging = {
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

            for (const method of Object.keys(logging)) {
                this[method] = function (args) { this.write(args, method); };
            }
        }

        get timestamp() {
            return new Date().toLocaleTimeString();
        }

        write(content, type = "log") {
            content = this._format(content);
            const colors = opts[type];
            super[type === "error" ? "error" : "log"](chalk[colors](`${content} | ${this.timestamp}`));
        }

        _format(data) {
            if (typeof data === "object") {
                const isArray = Array.isArray(data);
                if (isArray && data.every(e => typeof e === "string")) return data.join("\n");
                return data.stack || data.message || inspect(data);
            }
            return String(data);
        }
    };