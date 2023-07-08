require('dotenv').config();

const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
        ]});

client.on("ready", () => {
    console.log("The bot is ready.");
    client.user.setActivity("zZZ...");
})

client.on('messageCreate', (message) => {
    if (message.content == 'https://tenor.com/view/tree-gif-16522588208098851292') {
        message.reply('chat is this real');
    }
})
client.login(process.env.TOKEN);