const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const val = require("../val.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Pings the bot."),
    async execute(interaction, message) {
        const embedreply = new EmbedBuilder()
            .setColor("Grey")
            .setTitle(":moneybag: | walmart vpacks shop")
            .setDescription(
                `[<:coinn:1130125410483581000> 100] | ${val.silvericon} **Starter Pack**\n  <:arrowright:1129868776708509836> Contains 1 Silver Card! (20 cards)\n  <:arrowright:1129868776708509836> \`\`/buypack starterpack\`\`\n\n` +
                `[<:coinn:1130125410483581000> 1000] | ${val.goldicon} **Gold Pack**\n  <:arrowright:1129868776708509836> Contains 1 Gold Card! (25 cards)\n  <:arrowright:1129868776708509836> \`\`/buypack goldpack\`\`\n<:otherarrow:1130114545596239905> :exclamation: **Needs Level 2**\n\n`
            )
         interaction.reply({
            embeds: [embedreply]
        });

    }

}