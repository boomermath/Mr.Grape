require("dotenv").config();

const { Client, Database } = require("./structures");

const client = new Client();
const database = new Database();

try {
    database.init();
    client.console.success("Successfully loaded database!");
} catch (err) { client.console.error(err); }

client.login();