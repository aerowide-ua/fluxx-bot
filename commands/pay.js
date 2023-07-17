const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pay")
        .setDescription("Pay coins to chosen user.")
        .addUserOption(option => 
            option.setName("user").setDescription("User who to pay.").setRequired(true))
        .addIntegerOption(option =>
            option.setName("coins").setDescription('Amount of coins to pay.').setRequired(true)),
            
    async execute(interaction, profileData) {
        const user = interaction.options.getUser('user');
        const coin = interaction.options.getInteger('coins');
        const { coins } = profileData
        let embedreply = new EmbedBuilder().setColor("Green").setTitle("Success!").setDescription(`Successfully gave <@${user.id}> ${coin} <:coinn:1130125410483581000>!`)

        if (coin <= coins && coin >= 0) {
            await profileModel.findOneAndUpdate({userId: interaction.user.id}, {$inc: {coins: - coin}})
            await profileModel.findOneAndUpdate({userId: user.id}, {$inc: {coins: + coin}})
            interaction.reply({
                embeds: [embedreply]
            });
        } else {
            embedreply.setColor("Red").setTitle("brokie").setDescription(`get yo bread up`);
            interaction.reply({
                embeds: [embedreply], ephemeral: true
            });
            
        }

        

    }

}
