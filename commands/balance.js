const { SlashCommandBuilder, EmbedBuilder, Client, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Checks your coin balance.")
        .addUserOption(option => 
            option.setName("user").setDescription("User whos balance to check.")),

    async execute(interaction, profileData) {
        const custuser = interaction.options.getUser('user');
        if (custuser != null) {
            profileData = await profileModel.findOne({ userId: custuser.id })
            username = custuser.username;
            userid = custuser.id;
            useravatar = custuser.displayAvatarURL(); 
        } else {
            username = interaction.user.username;
            userid = interaction.user.id;
            useravatar = interaction.user.avatarURL();
        }
        const { coins } = profileData;
        

        const embedreply = new EmbedBuilder()
            .setColor("Yellow")
            .setAuthor({
                name: `${username}'s balance`,
                iconURL: useravatar,
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
            })
            .setDescription(`<@${userid}> currently has ${coins}<:coinn:1130125410483581000>`)
            .setTimestamp()
            .setThumbnail(useravatar)

        interaction.reply({ embeds: [embedreply]});

    }

}