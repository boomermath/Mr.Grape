const { Command } = require("../../structures");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "reload",
                type: "dev",
                description: "Reload commands.",
                usage: "<command to reload>",
                aliases: ["rel"],
                saying: "N/A.",
                cooldown: 0
            });
        }

        reloadCommand(command) {
            this.client.commands.delete(command.name);
            this.client.commands.load(command.filepath);
        }

        reloadAll() {
            this.client.commands.clear();
            this.client.commands.init();
        }

        getCommands(args) {
            return args.map(c => this.client.commands.get(c)).filter(c => c !== undefined);
        }

        main(msg, args) {
            if (!this.client.config.owners.has(msg.author.id)) return msg.send("Back off! Devs only!")
            if (args[0] === "all") return this.reloadAll()
            else {
                const commands = this.getCommands(args);
                if (!commands) return msg.send("Invalid command!");
                commands.map(c => this.reloadCommand(c));
            }
            msg.send("Successfully reloaded!");
        }
    };