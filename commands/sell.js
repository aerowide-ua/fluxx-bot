const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");
const cardModel = require("../models/cardSchema");
const val = require("../val.json");
module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("sell")
        .setDescription("Sell cards.")
        .addStringOption(option => 
            option.setName('card')
            .setDescription('Provide a card to sell.')
            .setRequired(true)
            .addChoices(
                {name: 'vehmic', value: 'vehmic'},{name: 'nextrg', value: 'next'}, {name: 'alphazero', value: 'alpha'},{name: 'irongirls', value: 'irongirls'},{name: 'syth', value: 'syth'},
                {name: 'panzerknight', value: 'panzer'},{name: 'cirilic', value: 'cirilic'}, {name: 'harm', value: 'harm'},{name: 'dtl', value: 'dtl'},{name: 'mrtoasty', value: 'mrtoasty'},
                {name: 'contra', value: 'contra'}, {name: 'hexerion', value: 'hexerion'},{name: 'sirfilo', value: 'sirfilo'},{name: 'kamte', value: 'kamte'},
                {name: 'epicbroom', value: 'epicbroom'}, {name: 'blazen', value: 'blazen'}, {name: 'cold', value: 'cold'}, {name: 'smirkymyjens', value: 'smirky'}, {name: 'catio', value: 'catio'},
                {name: 'krystal', value: 'krystal'}, {name: 'dark', value: 'dark'}, {name: 'vultra', value: 'vultra'}, {name: 'woopey', value: 'woopey'}, {name: 'shebeel', value: 'shebeel'}
            ))
        .addStringOption(option => 
            option.setName("rarity")
            .setDescription('Provide card rarity.')
            .setRequired(true)
            .addChoices(
                {name: 'silver', value: 'silver'}, {name: 'gold', value: 'gold'}
            )
        )
        .addIntegerOption(option =>
            option.setName('amount')
            .setDescription('Amount of cards to sell.')),


    async execute(interaction, profileData, cardData) {
        const card = interaction.options.getString('card');
        const rarity = interaction.options.getString('rarity');
        const fullcard = card + rarity;
        const amountarg = interaction.options.getInteger('amount');
        const val = require("../val.json");
        let amount = 1;
        const username = interaction.user.username;
        const userid = interaction.user.id;
        const failreply = new EmbedBuilder().setColor("Red").setTitle("nope").setDescription(`Not enough cards or non-existent card.`);
if (amountarg) {
    amount = amountarg;
}
let cards = cardData[fullcard]
let query = { [fullcard] : - amount }

if (cards >= amount) {    
    await cardModel.findOneAndUpdate({userId: userid},{$inc: query})
    await profileModel.findOneAndUpdate({userId: userid},{$inc: {coins: val[fullcard].price * amount},});

    const reply = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({
            name: username,
            iconURL: interaction.user.avatarURL(),
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
        })
        .setTitle("Sold!")
        .setDescription(`<@${userid}> You sold ** x${amount} ${val[fullcard].rarity} ${val[fullcard].name}** for ${amount * val[fullcard].price} <:coinn:1130125410483581000>`).setThumbnail(val[fullcard].img).setTimestamp();
    
        interaction.reply({embeds: [reply] });

} else {
     interaction.reply({embeds: [failreply], ephemeral: true})
    }
}
}