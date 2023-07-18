const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");
const cardModel = require("../models/cardSchema");
const val = require("../val.json");
module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("sellext")
        .setDescription("Sell more cards.")
        .addStringOption(option => 
            option.setName('card')
            .setDescription('Provide a card to sell.')
            .setRequired(true)
            .addChoices(
            {name: 'okiep', value: 'okiep'},{name: 'ralsei', value: 'ralsei'}, {name: 'jayx', value: 'jayx'}, {name: 'stretcho', value: 'stretcho'},{name: 'valkyrie', value: 'valkyrie'},{name: 'xenderdiamong', value: 'xender'},
            {name: 'xdiim', value: 'xdiim'},{name: 'ranif', value: 'ranif'}, {name: 'xdiss', value: 'xdiss'},{name: 'noobseo', value: 'noobseo'},{name: 'nightfalcon', value: 'nightfalcon'},
            {name: 'aerowide', value: 'aero'}, {name: 'lacley', value: 'lacley'},{name: 'alekirl', value: 'alekirl'},{name: 'senyx', value: 'senyx'},{name: 'realistikdash', value: 'realistik'}, 
            {name: 'blixo', value: 'blixo'}, {name: 'sonicdmk', value: 'dmk'}, {name: 'oakley', value: 'oakley'}, {name: 'farose', value: 'farose'},{name: 'zakai', value: 'zakai'}, 
            {name: 'viber', value: 'viber'}, {name: 'heylo', value: 'heylo'}, {name: 'mirk', value: 'mirk'}, {name: 'greencat', value: 'greencat'}
        ))
        
        .addStringOption(option => 
            option.setName("rarity")
            .setDescription('Provide card rarity.')
            .setRequired(true)
            .addChoices(
                {name: 'silver', value: 'silver'}, {name: 'gold', value: 'gold'}, {name: 'otw', value: 'otw'}, {name: 'bd', value: 'bd'}, {name: 'icon', value: 'icon'}
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
        .setTitle("Sold!").
        setDescription(`<@${userid}> You sold ** x${amount} ${val[fullcard].rarity} ${val[fullcard].name}** for ${amount * val[fullcard].price} <:coinn:1130125410483581000>`).setThumbnail(val[fullcard].img).setTimestamp();
        interaction.reply({embeds: [reply] });
    } else {
        interaction.reply({embeds: [failreply], ephemeral: true})
        }
    }
}