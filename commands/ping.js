const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pings the bot."),
    async execute(interaction, message) {
        const ping = new Date() - interaction.createdAt;
        const embedreply = new EmbedBuilder()
            .setColor(ping <= 400 ? "Green" : ping >= 1000 ? "Red" : "Yellow")
            .setTitle("Pong!")
            .setDescription(` Latency is ${ping}ms.`)
         interaction.reply({
            embeds: [embedreply]
        });

    }

}



// const channel = client.channels.cache.get('1093971619829006361');