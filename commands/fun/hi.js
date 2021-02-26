const { Command } = require("../../structures");

const greetings = [
    'hi', 'hello', 'yo', 'whats poppin', 'was upp', 'greetings', 'hey'
]

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "hi",
                type: "fun",
                aliases: ["hello"],
                description: "It's rude not to say hello.",
                usage: "No arguments required",
                cooldown: 2,
                saying: "Do you have amnesia?",
            })
        }

        main(msg, args) {
            msg.send(greetings[Math.floor(Math.random() * greetings.length)]);
        }
    }