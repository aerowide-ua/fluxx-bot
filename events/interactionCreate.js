const { Events } = require("discord.js");
const profileModel = require("../models/profileSchema");
const cardModel = require("../models/cardSchema");
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!interaction.isChatInputCommand()) {return;}
        let profileData;
        let cardData;
        let levelData;
            profileData = await profileModel.findOne({ userId: interaction.user.id })
            try {
            if (!profileData) {
                profileData = await profileModel.create({
                    userId: interaction.user.id,
                    serverId: interaction.guild.id,
                })
            }
            cardData = await cardModel.findOne({ userId: interaction.user.id })
            if (!cardData) {
                cardData = await cardModel.create({
                    userId: interaction.user.id,
                })}
            } catch (err) {
                console.log(err);
            }
 
        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }
 
        try {
            await command.execute(interaction, profileData, cardData);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};