const chalk = require("chalk")
const { Console } = require("console")

const opts = {
    warn: "bgYellow",
    log: ["bgWhite"]["black"],
    success: "bgGreen",
    error: "bgRed"
}

module.exports =
    class extends Console {
        constructor() {
            super(process.stdout, process.stderr)
        }

        get timestamp() {
            return new Date().toLocaleTimeString();
        }

        write(content, type = "log") {
            content = this._flatten(content);
            const colors = opts[type];
            super[type === "error" ? "error" : "log"](chalk[colors](`${content} | ${this.timestamp}`))
        }

        warn(args) {
            return this.write(args, "warn")
        }

        log(args) {
            return this.write(args, "log")
        }

        success(args) {
            return this.write(args, "success")
        }

        error(args) {
            return this.write(args, "error")
        }

        _flatten(data) {
            if (typeof data === "object") {
                const isArray = data instanceof Array;
                if (isArray && data.every(e => typeof e === "string")) return data.join("\n");
                return data.stack || data.message;
            }
            return String(data)
        }
    }