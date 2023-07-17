const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lb")
        .setDescription("Shows the leaderboard."),
    async execute(interaction, profileData) {
        await interaction.deferReply();
        const { username, id } = interaction.user
        const { coins } = profileData


        let lbembed = new EmbedBuilder()
            .setColor("LightGrey")
            .setTitle("The richest 💰")
            .setTimestamp();
        
        let topten = []
        let desc = '';

        const members = await profileModel.find().sort({ coins: -1 }).catch(err => console.log(err))

        topten = members.slice(0, 10);
        for (let i = 0; i < topten.length; i++) {
            let { user } = await interaction.guild.members.fetch(topten[i].userId) 
            if (!user) return;
            let userbal = topten[i].coins;
            desc += `**#${i + 1}. <@${user.id}>:**  ${userbal} <:coinn:1130125410483581000>\n\n`
        }
        if (desc != '') {
            lbembed.setDescription(desc)
        
        }
        interaction.editReply({
            embeds: [lbembed]
        });
    }

}