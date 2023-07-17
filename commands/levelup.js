const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("levelup")
        .setDescription("Levels you up if you have enough exp."),
    async execute(interaction, profileData) {

        let levelcontent = ''
        const { coins, xp, level, xpgoal  } = profileData;
        let embedreply = new EmbedBuilder();
        const userid = interaction.user.id;
        username = interaction.user.username; 
        const failreply = new EmbedBuilder().setColor("Red").setTitle("nope").setDescription(`Not enough xp! *(${xp}/${xpgoal})*`);

        if (xp >= xpgoal) {
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {xp : - xpgoal} });
            let newxpgoal = Math.floor(xpgoal * 1.3);
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {xpgoal : + newxpgoal} });
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {level : + 1} });
            let coingain = Math.ceil(xpgoal * 1.4);
            await profileModel.findOneAndUpdate({userId: interaction.user.id}, {$inc: {coins : + coingain}});
            levelcontent += `<:otherarrow:1130114545596239905> **+ ${coingain}** <:coinn:1130125410483581000>\n<:otherarrow:1130114545596239905> **${1 + ((level + 0.75))}x** work money!`;
            const levelreply = new EmbedBuilder().setColor("Green").setTitle(":sparkles: Level up!").setDescription(`<:arrowright:1129868776708509836> You are now **level ${level + 1}!**\n` + levelcontent).setAuthor({name: username,iconURL: interaction.user.avatarURL(),url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
            interaction.followUp({ embeds: [levelreply]})
        
         interaction.reply({
            embeds: [embedreply]
        
             })
        } else {
            interaction.reply({embeds: [failreply], ephemeral: true})
        }



        

    }
}