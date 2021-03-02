const { join } = require("path");
const { readdirSync, statSync } = require("fs");
const { Collection } = require("discord.js");

module.exports =
    class extends Collection {
        constructor(name, client, directory, holds) {
            super();
            this.name = name;
            this.client = client;
            this.directory = join(process.cwd(), directory);
            this.holds = holds;
        }

        _register(component, dir) {
            if (!(component instanceof this.holds)) throw new Error(`${component.name} isn't a valid component to store in ${this.name}!`);
            if (super.has(component.name)) throw new Error(`${component.name} already exists!`);
            return component.filepath = dir;
        }

        load(dir) {
            const Component = require(dir);
            const component = new Component(this.client);
            this._register(component, dir);
            super.set(component.name, component);
            component.init ? component.init() : null;
            delete require.cache[require.resolve(dir)];
            return component;
        }

        init(path = this.directory, arr = []) {
            const files = readdirSync(path);
            for (const file of files) {
                const filePath = join(path, file);
                if (statSync(filePath).isDirectory()) {
                    this.init(filePath, arr);
                }
                else {
                    this.load(filePath)
                }
            }

            return this;
        }
    }