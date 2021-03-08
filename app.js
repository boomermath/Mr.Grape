require("dotenv").config();

const { Client, Database } = require("./structures");

const client = new Client();
const database = new Database();

try {
    database.init();
} catch (err) { client.console.error(err) }

client.login();