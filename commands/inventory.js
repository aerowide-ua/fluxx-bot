const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const val = require("../val.json");
const profileModel = require("../models/profileSchema");
const cardModel = require("../models/cardSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("Checks your profile with your balance and other things.")
        .addStringOption(option => 
            option.setName('type')
            .setDescription('Select a pack you want to open.')
            .setRequired(true)
            .addChoices(
                {name: 'silvercard', value: 'silver'},
                {name: 'goldcard', value: 'gold'}
            ))
        .addUserOption(option => option
            .setName('user')
            .setDescription('User whos profile to check.')),
    async execute(interaction, profileData, cardData) {
        const type = interaction.options.getString('type');
        const custuser = interaction.options.getUser('user');
        const { coins, packsopened, xp, level, xpgoal } = profileData;
      const { silvercards, goldcards } = cardData
      let totalcards = 0;
      let silvercard = 0;
      let goldcard = 0;
      let profileText = ``;
      let typetext = '';
      let username = interaction.user.username;
      let userid = interaction.user.id;
      let useravatar = interaction.user.avatarURL(); 

        if (custuser == null) {
         username = interaction.user.username; 
         useravatar = interaction.user.avatarURL(); 
         profiledat = profileData;
         carddat = cardData
      }
        else {
         username = custuser.username;
         profileData = await profileModel.findOne({ userId: custuser.id })
         cardData = await cardModel.findOne({ userId: custuser.id })
         useravatar = custuser.displayAvatarURL(); 
         profiledat = profileData;
         carddat = cardData
      }
      

      async function carddisp(card, icon, rar) {
         if (cardData[card] > 0) {
            profileText += `${val[icon]} **${val[card].name}** - ${val[card].rarity} **(x${cardData[card]})** \n`;
            totalcards = totalcards + 1;
            if (rar == 's') {
                silvercard++
            } else if (rar == 'g') {
                goldcard++
            }
         }
      }
      if (type == 'gold') {
      carddisp('darkgold', 'goldicon', 'g'); carddisp('vultragold', 'goldicon', 'g');carddisp('vehmicgold', 'goldicon', 'g'); carddisp('jayxgold', 'goldicon', 'g');
      carddisp('blazengold', 'goldicon', 'g'); carddisp('coldgold', 'goldicon', 'g');carddisp('farosegold', 'goldicon', 'g'); carddisp('ralseigold', 'goldicon', 'g');
      carddisp('alekirlgold', 'goldicon', 'g'); carddisp('xdissgold', 'goldicon', 'g');carddisp('aerowidegold', 'goldicon', 'g');
      carddisp('zakaigold', 'goldicon', 'g'); carddisp('xdiimgold', 'goldicon', 'g'); carddisp('epicbroomgold', 'goldicon', 'g'); carddisp('lacleygold', 'goldicon', 'g');
      carddisp('nightfalcongold', 'goldicon', 'g'); carddisp('krystalgold', 'goldicon', 'g');carddisp('heylogold', 'goldicon', 'g'); carddisp('noobseogold', 'goldicon', 'g');
      carddisp('catiogold', 'goldicon', 'g'); carddisp('mirkgold', 'goldicon', 'g');carddisp('stretchogold', 'goldicon', 'g'); carddisp('ranifgold', 'goldicon', 'g');
      carddisp('xendergold', 'goldicon', 'g'); carddisp('valkyriegold', 'goldicon', 'g');
      typetext = `${val.goldicon} **Gold Cards (${goldcard}/25)**\n\n`; embcolor = "Gold"
      await cardModel.findOneAndUpdate({userId: interaction.user.id},{$set: {goldcards : goldcard} })
      } else if (type == 'silver') {
      carddisp('alphasilver', 'silvericon', 's'); carddisp('dtlsilver', 'silvericon', 's');
      carddisp('sirfilosilver', 'silvericon'), 's'; carddisp('vehmicsilver', 'silvericon', 's');
      carddisp('harmsilver', 'silvericon', 's'); carddisp('ralseisilver', 'silvericon', 's');
      carddisp('contrasilver', 'silvericon', 's'); carddisp('xdiimsilver', 'silvericon', 's');
      carddisp('nextsilver', 'silvericon', 's'); carddisp('sythsilver', 'silvericon', 's');
      carddisp('cirilicsilver', 'silvericon', 's'); carddisp('mrtoastysilver', 'silvericon', 's');
      carddisp('epicbroomsilver', 'silvericon', 's'); carddisp('kamtesilver', 'silvericon', 's');
      carddisp('smirkysilver', 'silvericon', 's'); carddisp('panzersilver', 'silvericon', 's');
      carddisp('hexerionsilver', 'silvericon', 's'); carddisp('okiepsilver', 'silvericon', 's');
      carddisp('irongirlssilver', 'silvericon', 's'); carddisp('shebeelsilver', 'silvericon', 's');
      typetext = `${val.silvericon} **Silver Cards (${silvercard}/20)**\n\n`; embcolor = "Grey"
      await cardModel.findOneAndUpdate({userId: interaction.user.id},{$set: {silvercards : silvercard} })
      }
        const embedreply = new EmbedBuilder()
            .setColor(embcolor)
            .setAuthor({name: 'Profile',iconURL: useravatar,url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
            .setThumbnail(useravatar)
            .setTitle(`${username}'s inventory`)
            .setDescription(typetext + profileText)
            .setTimestamp()
        interaction.reply({
            embeds: [embedreply]
        });
    }

}