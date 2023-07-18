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
                {name: 'goldcard', value: 'gold'},
                {name: 'otwcard', value: 'otw'},
                {name: "bdcard", value: "bd"}, {name: "iconcard", value: "icon"}, {name: "impossiblecard", value: "i"}
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
    let otwcard = 0; let bdcard = 0; let iconcard = 0; let icard = 0;
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
            } else if (rar == 'otw') {
                otwcard++
            } else if (rar == 'bd') {
                bdcard++
            } else if (rar == 'icon') {
                iconcard++
            } else if (rar == 'i') {
                icard++
            }

         }
      }
      if (type == "i") {
        carddisp('coldprime', 'primeicon', 'i'); carddisp('blazenprime', 'primeicon', 'i');
        typetext = `<a:q_:1130818696189857863> **IMPOSSIBLE Cards (${icard}/2)**\n\n`; embcolor = "Default"
      }
      else if (type == "icon") {
        carddisp('blixoicon', 'iconicon', 'icon'); carddisp('faroseicon', 'iconicon', 'icon');
        carddisp('oakleyicon', 'iconicon', 'icon'); carddisp('panzericon', 'iconicon', 'icon');
        carddisp('senyxicon', 'iconicon', 'icon'); carddisp('realistikicon', 'iconicon', 'icon');
        carddisp('sythicon', 'iconicon', 'icon'); carddisp('coldicon', 'iconicon', 'icon');
        carddisp('blazenicon', 'iconicon', 'icon'); 
        typetext = `${val.iconicon} **Icon Cards (${iconcard}/9)**\n\n`; embcolor = "White"
      }
      else if (type == "bd") {
        carddisp('blazenbd', 'bdicon', 'bd'); carddisp('krystalbd', 'bdicon', 'bd');
        carddisp('ralseibd', 'bdicon', 'bd'); carddisp('farosebd', 'bdicon', 'bd');
        typetext = `${val.bdicon} **Birthday Cards (${bdcard}/4)**\n\n`; embcolor = "LuminousVividPink"
      }
      else if (type == 'otw') {
        carddisp('nextotw', 'otwicon', 'otw'); carddisp('dtlotw', 'otwicon', 'otw');carddisp('cirilicotw', 'otwicon', 'otw'); carddisp('krystalotw', 'otwicon', 'otw');
        carddisp('aerowideotw', 'otwicon', 'otw'); carddisp('ralseiotw', 'otwicon', 'otw');carddisp('alekirlotw', 'otwicon', 'otw'); carddisp('sombreotw', 'otwicon', 'otw');
        carddisp('lacleyotw', 'otwicon', 'otw'); carddisp('greencatotw', 'otwicon', 'otw');
        typetext = `${val.otwicon} **OTW Cards (${otwcard}/10)**\n\n`; embcolor = "Purple"
      }
      else if (type == 'gold') {
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
            .setDescription("<:otherarrow:1130114545596239905>" + typetext + profileText)
            .setTimestamp()
        interaction.reply({
            embeds: [embedreply]
        });
    }

}