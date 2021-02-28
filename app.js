require("dotenv").config();

const { Client, Database } = require("./structures");

const client = new Client();
const database = new Database();

database.init();

client.login();