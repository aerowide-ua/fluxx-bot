require('dotenv').config();
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");

const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Collection} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
        ]});
        
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.on(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(
            `command at ${filePath} is missing smth idk man`
        )
    }
}

mongoose.connect(
    process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

}).then(() => {
    console.log("Connected to database! ✅ [IIIIIIIIII] 100%");
})
.catch((err) => {
    console.log(err);
});

client.login(process.env.TOKEN);