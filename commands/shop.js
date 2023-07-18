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
                `[<:coinn:1130125410483581000> 1000] | ${val.goldicon} **Gold Pack**\n  <:arrowright:1129868776708509836> Contains 1 Gold Card! (25 cards)\n  <:arrowright:1129868776708509836> \`\`/buypack goldpack\`\`\n<:otherarrow:1130114545596239905> :exclamation: **Needs Level 1**\n\n` +
                `[<:coinn:1130125410483581000> 3000] | <:rarecard:1130787010567749632> **Rare Card Pack**\n  <:arrowright:1129868776708509836> Contains 1 **86+ Rating** Card! (15 cards)\n  <:arrowright:1129868776708509836> \`\`/buypack rarepack\`\`\n<:otherarrow:1130114545596239905> :exclamation: **Needs Level 3**\n\n` +
                `[<:coinn:1130125410483581000> 7500] | ${val.bdicon} **Birthday Pack**\n  <:arrowright:1129868776708509836> Contains 1 Birthday Card! (4 cards)\n  <:arrowright:1129868776708509836> \`\`/buypack bdpack\`\`\n<:otherarrow:1130114545596239905> :exclamation: **Needs Level 5**\n\n` +
                `[<:coinn:1130125410483581000> 20000] | ${val.iconicon} **Icon Pack**\n  <:arrowright:1129868776708509836> Contains 1 Icon or ??? Card! (11 cards)\n  <:arrowright:1129868776708509836> \`\`/buypack iconpack\`\`\n<:otherarrow:1130114545596239905> :exclamation: **Needs Level 8**\n\n`
            )
         interaction.reply({
            embeds: [embedreply]
        });

    }

}