const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const val = require("../val.json");
const profileModel = require("../models/profileSchema");
const cardModel = require("../models/cardSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Checks your profile with your balance and other things.")
        .addUserOption(option => option
         .setName('user')
         .setDescription('User whos profile to check.')),
    async execute(interaction, profileData, cardData) {
      const custuser = interaction.options.getUser('user');

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
      const { coins, packsopened, xp, level, xpgoal } = profiledat;
      const {silvercards, goldcards} = carddat
      let totalcards = silvercards + goldcards;
      let silvercard = 0; let goldcard = 0;
      
      let leveluptext = ''
      async function carddisp(card, icon, rar) {
        if (cardData[card] > 0) {
           totalcards = totalcards + 1;
           if (rar == 's') {
               silvercard++
           } else if (rar == 'g') {
               goldcard++
           }
        }
     }

      if (xp >= xpgoal) {
        leveluptext = ':small_blue_diamond: ``/levelup``'
      }
      carddisp('darkgold', 'goldicon', 'g'); carddisp('vultragold', 'goldicon', 'g');carddisp('vehmicgold', 'goldicon', 'g'); carddisp('jayxgold', 'goldicon', 'g');
      carddisp('blazengold', 'goldicon', 'g'); carddisp('coldgold', 'goldicon', 'g');carddisp('farosegold', 'goldicon', 'g'); carddisp('ralseigold', 'goldicon', 'g');
      carddisp('alekirlgold', 'goldicon', 'g'); carddisp('xdissgold', 'goldicon', 'g');carddisp('aerowidegold', 'goldicon', 'g');
      carddisp('zakaigold', 'goldicon', 'g'); carddisp('xdiimgold', 'goldicon', 'g'); carddisp('epicbroomgold', 'goldicon', 'g'); carddisp('lacleygold', 'goldicon', 'g');
      carddisp('nightfalcongold', 'goldicon', 'g'); carddisp('krystalgold', 'goldicon', 'g');carddisp('heylogold', 'goldicon', 'g'); carddisp('noobseogold', 'goldicon', 'g');
      carddisp('catiogold', 'goldicon', 'g'); carddisp('mirkgold', 'goldicon', 'g');carddisp('stretchogold', 'goldicon', 'g'); carddisp('ranifgold', 'goldicon', 'g');
      carddisp('xendergold', 'goldicon', 'g'); carddisp('valkyriegold', 'goldicon', 'g');
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

      await cardModel.findOneAndUpdate({userId: interaction.user.id},{$set: {goldcards : goldcard} })
      await cardModel.findOneAndUpdate({userId: interaction.user.id},{$set: {silvercards : silvercard} })
      totalcard = silvercard + goldcard;
      let profileText = `<:arrowright:1129868776708509836> ${val.silvericon} **Silver Cards: (${silvercard}/20)**\n\`\`/inventory silvercard\`\`\n<:arrowright:1129868776708509836> ${val.goldicon} **Gold Cards: (${goldcard}/25)**\n\`\`/inventory goldcard\`\``;
        const embedreply = new EmbedBuilder()
            .setColor("Yellow")
            .setAuthor({name: 'Profile',iconURL: useravatar,url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
            .setThumbnail(useravatar)
            .setTitle(`${username}'s profile`)
            .setDescription(`:sparkles: Level: ${level} *(${xp}/${xpgoal})* ${leveluptext}\n\n:moneybag: Balance: <:coinn:1130125410483581000>${coins}\n\n<:packs:1129079603529531472> Packs opened: ${packsopened}\n\n:black_joker: Card inventory **(${totalcard}/45)**:\n\n` + profileText)
            .setTimestamp()
        interaction.reply({
            embeds: [embedreply]
        });
    }

}