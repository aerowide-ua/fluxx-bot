const { SlashCommandBuilder, EmbedBuilder, Collection, Embed } = require("discord.js");
const profileModel = require("../models/profileSchema");
const cardModel = require("../models/cardSchema");
const val = require("../val.json");
const cooldowns = new Collection();
const cooldownTime = 3;
module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("buypack")
        .setDescription("Pack cards.")
        .addStringOption(option => 
            option.setName('pack')
            .setDescription('Select a pack you want to open.')
            .setRequired(true)
            .addChoices(
                {name: 'starterpack', value: 'starterpack'},
                {name: 'goldpack', value: 'goldpack'},
                {name: 'rarepack', value: 'rarepack'},
                {name: 'bdpack', value: 'bdpack'},
                {name: 'iconpack', value: 'iconpack'}
            )
        ),

    async execute(interaction, profileData) {

        const val = require("../val.json");
        const username = interaction.user.username;
        const userid = interaction.user.id;
        const { coins, xp, level, xpgoal  } = profileData;
        const perc = Math.round(Math.random() * 1000);
        const pack = interaction.options.getString('pack');
        const failreply = new EmbedBuilder().setColor("Red").setTitle("brokie").setDescription(`get yo bread up`);
        let cardname = ''
        let levelcontent = ''

        const timeleft = 3 + Math.round((cooldownTime - (Date.now() - cooldowns.get(userid)))/1000);
        const cooldownreply = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Cooldown!")
            .setDescription(`Please wait ${timeleft} seconds before using this command again.`)
         const levelreply = new EmbedBuilder()
            .setColor("Green")
            .setTitle(":sparkles: Level up!")
            .setDescription(`<:arrowright:1129868776708509836><:arrowright:1129868776708509836><:arrowright:1129868776708509836> You are now **level ${level}!**` + levelcontent)
            .setAuthor({
               name: username,
               iconURL: interaction.user.avatarURL(),
               url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
           })
         

        function addCard(card, rar, high, low) {
         q = {[card] : + 1}
         if (perc <= high && perc > low) {
            cardname = card
            packcard = `${val[rar]} **${val[card].name}**`;cardimg = val[card].img;
            cardModel.findOneAndUpdate({userId: userid},{$inc: {[card] : + 1} });
        }}

        function randomXP(n, x) {
         n = Math.floor(n)
         x = Math.ceil(x)
         return Math.round(Math.random() * (x - n + 1)) + n;
        }

        async function levelUp() {
         xpp = await profileData.xp
         if (xpp >= xpgoal) {
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {xp : - xpgoal} });
            let newxpgoal = Math.floor(xpgoal * 1.3);
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {xpgoal : + (newxpgoal - xpgoal)} });
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {level : + 1} });
            let coingain = Math.ceil(xpgoal * 2.5);
            await profileModel.findOneAndUpdate({userId: interaction.user.id}, {$inc: {coins : + coingain}});
            levelcontent += `<:otherarrow:1130114545596239905> **+ ${coingain}** <:coinn:1130125410483581000>\n<:otherarrow:1130114545596239905> **${1 + ((level + 1))}x** work money!`;
            const levelreply = new EmbedBuilder().setColor("Green").setTitle(":sparkles: Level up!").setDescription(`<:arrowright:1129868776708509836> You are now **level ${level + 1}!**\n` + levelcontent).setAuthor({name: username,iconURL: interaction.user.avatarURL(),url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
            interaction.followUp({ embeds: [levelreply]})}
        }

        function levelfail(num) {
         let freply = new EmbedBuilder().setColor("Red").setTitle("Nope.").setDescription(`You need at least **Level ${num}** to do that`);
         interaction.reply({embeds: [freply], ephemeral: true})
        }

        if (cooldowns.has(userid)) {
         interaction.reply({ ephemeral: true, embeds: [cooldownreply] });
         return;
     }
if (pack == 'starterpack' && coins >= 100) { // STARTER PACK --------------------------------------------------------->>>>>>>>>>>>>
        await profileModel.findOneAndUpdate({userId: userid},{$inc: {packsopened: + 1,},}); await profileModel.findOneAndUpdate({userId: userid},{$inc: {coins: -100,},});
         const xpgain = randomXP(5, 20)
        let openingreply = new EmbedBuilder().setColor("Grey").setTitle(`:beginner: | Unpacking **Starter Pack**...`); await interaction.reply({embeds: [openingreply]});
      // loot table
      addCard('vehmicsilver', 'silvericon', 1000, 950); addCard('nextsilver', 'silvericon', 950, 900);
      addCard('alphasilver', 'silvericon', 900, 850); addCard('irongirlssilver', 'silvericon', 850, 800);
      addCard('sythsilver', 'silvericon', 800, 750); addCard('panzersilver', 'silvericon', 750, 700);
      addCard('cirilicsilver', 'silvericon', 700, 650); addCard('harmsilver', 'silvericon', 650, 600);
      addCard('dtlsilver', 'silvericon', 600, 550); addCard('mrtoastysilver', 'silvericon', 550, 500);
      addCard('shebeelsilver', 'silvericon', 500, 450); addCard('contrasilver', 'silvericon', 450, 400);
      addCard('hexerionsilver', 'silvericon', 400, 350); addCard('sirfilosilver', 'silvericon', 350, 300);
      addCard('kamtesilver', 'silvericon', 300, 250); addCard('epicbroomsilver', 'silvericon', 250, 200);
      addCard('okiepsilver', 'silvericon', 200, 150); addCard('smirkysilver', 'silvericon', 150, 100);
      addCard('xdiimsilver', 'silvericon', 100, 50); addCard('ralseisilver', 'silvericon', 50, -1);

      await cardModel.findOneAndUpdate({userId: userid},{$inc: {[cardname] : + 1} });
      await profileModel.findOneAndUpdate({userId: userid},{$inc: {xp : + xpgain} });
      levelUp()

      let newreply = new EmbedBuilder().setColor("Grey").setAuthor({name: username,iconURL: interaction.user.avatarURL(),url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }).setTitle(":fire: | PACKED!").setDescription(`You packed:\n\n${packcard}\n*+${xpgain}XP! (${xp}/${xpgoal})*`).setImage(cardimg).setFooter({text: `Packed by ${username}`}).setTimestamp();
      setTimeout(() => {interaction.editReply({embeds: [newreply] });}, 2000);

    } else if (pack == 'goldpack' && coins >= 1000) { // GOLD PACK --------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
         if (level > 0) {
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {packsopened: + 1,},})
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {coins: -1000,},});
            const xpgain = randomXP(12, 60)
            let openingreply = new EmbedBuilder().setColor("Gold").setTitle(`:beginner: | Unpacking **Gold Pack**...`)
            await interaction.reply({
               embeds: [openingreply]
            });
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {xp : + xpgain} });
            // loot table
            addCard('darkgold', 'goldicon', 1000, 960); addCard('vultragold', 'goldicon', 960, 920);
            addCard('vehmicgold', 'goldicon', 920, 880); addCard('jayxgold', 'goldicon', 880, 840);
            addCard('blazengold', 'goldicon', 840, 800); addCard('coldgold', 'goldicon', 800, 760);
            addCard('farosegold', 'goldicon', 760, 720); addCard('ralseigold', 'goldicon', 720, 680);
            addCard('alekirlgold', 'goldicon', 680, 640); addCard('xdissgold', 'goldicon', 640, 600);
            addCard('zakaigold', 'goldicon', 600, 560); addCard('xdiimgold', 'goldicon', 560, 520);
            addCard('epicbroomgold', 'goldicon', 520, 480); addCard('lacleygold', 'goldicon', 480, 440);
            addCard('nightfalcongold', 'goldicon', 440, 400); addCard('krystalgold', 'goldicon', 400, 360);
            addCard('heylogold', 'goldicon', 360, 320); addCard('noobseogold', 'goldicon', 320, 280);
            addCard('catiogold', 'goldicon', 280, 240); addCard('mirkgold', 'goldicon', 240, 200);
            addCard('stretchogold', 'goldicon', 200, 160); addCard('ranifgold', 'goldicon', 160, 120);
            addCard('xendergold', 'goldicon', 120, 80); addCard('valkyriegold', 'goldicon', 80, 40);
            addCard('aerowidegold', 'goldicon', 40, -1);

            await cardModel.findOneAndUpdate({userId: userid},{$inc: {[cardname] : + 1} });
            levelUp()
            let newreply = new EmbedBuilder().setColor("Yellow").setAuthor({name: username,iconURL: interaction.user.avatarURL(),url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }).setTitle(":fire: | PACKED!").setDescription(`You packed:\n\n${packcard}\n*+${xpgain}XP! (${xp}/${xpgoal})*`).setImage(cardimg).setFooter({text: `Packed by ${username}`}).setTimestamp();
      
      
            setTimeout(() => {interaction.editReply({embeds: [newreply] });}, 2000);
         } else {
            levelfail(1)
         }
    } else if (pack == 'rarepack' && coins >= 3000) { // RARECARD PACK --------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      if (level > 2) {
         await profileModel.findOneAndUpdate({userId: userid},{$inc: {packsopened: + 1,},})
         await profileModel.findOneAndUpdate({userId: userid},{$inc: {coins: -3000,},});
         const xpgain = randomXP(17, 100)
         let openingreply = new EmbedBuilder().setColor("Purple").setTitle(`:beginner: | Unpacking **Rare Card Pack**...`)
         await interaction.reply({
            embeds: [openingreply]
         });
         await profileModel.findOneAndUpdate({userId: userid},{$inc: {xp : + xpgain} });
         // loot table
         addCard('nextotw', 'otwicon', 1000, 940); addCard('dtlotw', 'otwicon', 940, 880);
         addCard('cirilicotw', 'otwicon', 880, 820); addCard('krystalotw', 'otwicon', 820, 760);
         addCard('aerowideotw', 'otwicon', 760, 700); addCard('ralseiotw', 'otwicon', 700, 640);
         addCard('alekirlotw', 'otwicon', 640, 580); addCard('sombreotw', 'otwicon', 580, 520);
         addCard('lacleyotw', 'otwicon', 520, 460); addCard('greencatotw', 'otwicon', 460, 400);
         addCard('darkgold', 'goldicon', 400, 320); addCard('vultragold', 'goldicon', 320, 240);
         addCard('vehmicgold', 'goldicon', 240, 160); addCard('blazengold', 'goldicon', 160, 80); addCard('coldgold', 'goldicon', 80, -1);

         await cardModel.findOneAndUpdate({userId: userid},{$inc: {[cardname] : + 1} });
         levelUp()
         let newreply = new EmbedBuilder().setColor("Purple").setAuthor({name: username,iconURL: interaction.user.avatarURL(),url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }).setTitle(":fire: | PACKED!").setDescription(`You packed:\n\n${packcard}\n*+${xpgain}XP! (${xp}/${xpgoal})*`).setImage(cardimg).setFooter({text: `Packed by ${username}`}).setTimestamp();
   
   
         setTimeout(() => {interaction.editReply({embeds: [newreply] });}, 2000);
      } else {
         levelfail(3)
      }
      } else if (pack == 'bdpack' && coins >= 7500) { // BD PACK --------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
         if (level > 4) {
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {packsopened: + 1,},})
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {coins: -7500,},});
            const xpgain = randomXP(25, 175)
            let openingreply = new EmbedBuilder().setColor("LuminousVividPink").setTitle(`:beginner: | Unpacking **Birthday Pack**...`)
            await interaction.reply({
               embeds: [openingreply]
            });
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {xp : + xpgain} });
            // loot table
            addCard('blazenbd', 'bdicon', 1000, 700); addCard('krystalbd', 'bdicon', 700, 400);
            addCard('ralseibd', 'bdicon', 400, 20); addCard('farosebd', 'bdicon', 200, -1);
   
            await cardModel.findOneAndUpdate({userId: userid},{$inc: {[cardname] : + 1} });
            levelUp()
            let newreply = new EmbedBuilder().setColor("LuminousVividPink").setAuthor({name: username,iconURL: interaction.user.avatarURL(),url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }).setTitle(":fire: | PACKED!").setDescription(`You packed:\n\n${packcard}\n*+${xpgain}XP! (${xp}/${xpgoal})*`).setImage(cardimg).setFooter({text: `Packed by ${username}`}).setTimestamp();
      
      
            setTimeout(() => {interaction.editReply({embeds: [newreply] });}, 2000);
         } else {
            levelfail(5)
         }
         } else if (pack == 'iconpack' && coins >= 20000) { // ICON PACK --------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            if (level > 7) {
               await profileModel.findOneAndUpdate({userId: userid},{$inc: {packsopened: + 1,},})
               await profileModel.findOneAndUpdate({userId: userid},{$inc: {coins: -20000,},});
               const xpgain = randomXP(25, 250)
               let openingreply = new EmbedBuilder().setColor("White").setTitle(`:beginner: | Unpacking **Icon Pack**...`)
               await interaction.reply({
                  embeds: [openingreply]
               });
               await profileModel.findOneAndUpdate({userId: userid},{$inc: {xp : + xpgain} });
               // loot table
               addCard('blixoicon', 'iconicon', 1000, 850); addCard('faroseicon', 'iconicon', 850, 700);
               addCard('oakleyicon', 'iconicon', 700, 600); addCard('panzericon', 'iconicon', 600, 500);
               addCard('senyxicon', 'iconicon', 500, 400); addCard('realistikicon', 'iconicon', 400, 300);
               addCard('sythicon', 'iconicon', 300, 200); addCard('coldicon', 'iconicon', 200, 105);
               addCard('blazenicon', 'iconicon', 105, 10); addCard('coldprime', 'primeicon', 10, 5);
               addCard('blazenprime', 'primeicon', 5, -1);
      
               await cardModel.findOneAndUpdate({userId: userid},{$inc: {[cardname] : + 1} });
               levelUp()
               let newreply = new EmbedBuilder().setColor("White").setAuthor({name: username,iconURL: interaction.user.avatarURL(),url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }).setTitle(":fire: | PACKED!").setDescription(`You packed:\n\n${packcard}\n*+${xpgain}XP! (${xp}/${xpgoal})*`).setImage(cardimg).setFooter({text: `Packed by ${username}`}).setTimestamp();
         
         
               setTimeout(() => {interaction.editReply({embeds: [newreply] });}, 2000);
            } else {
               levelfail(8)
            }
            } else {
      interaction.reply({embeds: [failreply], ephemeral: true})
    }




cooldowns.set(userid, Date.now());

        setTimeout(() => {
            cooldowns.delete(userid);
        }, cooldownTime * 1000);
        

    }
}