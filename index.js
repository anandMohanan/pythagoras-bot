const { Client, Collection } = require("discord.js");

const client = new Client({
  intents: 32767,
});
module.exports = client;
const { DiscordTogether } = require("discord-together");
require("dotenv").config();

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.config = require("./config.json");

client.discordTogether = new DiscordTogether(client);
// Initializing the project
require("./handler")(client);

client.login(process.env.BOT_TOKEN);
