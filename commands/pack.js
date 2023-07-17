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
                {name: 'goldpack', value: 'goldpack'}
            )
        ),

    async execute(interaction, profileData) {

        const val = require("../val.json");
        const username = interaction.user.username;
        const userid = interaction.user.id;
        const { coins, xp, level, xpgoal  } = profileData;
        const perc = Math.round(Math.random() * 100);
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
            let newxpgoal = Math.floor(xpgoal * 1.75);
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {xpgoal : + (newxpgoal - xpgoal)} });
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {level : + 1} });
            let coingain = Math.ceil(xpgoal * 1.4);
            await profileModel.findOneAndUpdate({userId: interaction.user.id}, {$inc: {coins : + coingain}});
            levelcontent += `<:otherarrow:1130114545596239905> **+ ${coingain}** <:coinn:1130125410483581000>\n<:otherarrow:1130114545596239905> **${1 + ((level * 0.75))}x** work money!`;
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
      addCard('vehmicsilver', 'silvericon', 100, 95); addCard('nextsilver', 'silvericon', 95, 90);
      addCard('alphasilver', 'silvericon', 90, 85); addCard('irongirlssilver', 'silvericon', 85, 80);
      addCard('sythsilver', 'silvericon', 80, 75); addCard('panzersilver', 'silvericon', 75, 70);
      addCard('cirilicsilver', 'silvericon', 70, 65); addCard('harmsilver', 'silvericon', 65, 60);
      addCard('dtlsilver', 'silvericon', 60, 55); addCard('mrtoastysilver', 'silvericon', 55, 50);
      addCard('shebeelsilver', 'silvericon', 50, 45); addCard('contrasilver', 'silvericon', 45, 40);
      addCard('hexerionsilver', 'silvericon', 40, 35); addCard('sirfilosilver', 'silvericon', 35, 30);
      addCard('kamtesilver', 'silvericon', 30, 25); addCard('epicbroomsilver', 'silvericon', 25, 20);
      addCard('okiepsilver', 'silvericon', 20, 15); addCard('smirkysilver', 'silvericon', 15, 10);
      addCard('xdiimsilver', 'silvericon', 10, 5); addCard('ralseisilver', 'silvericon', 5, -1);

      await cardModel.findOneAndUpdate({userId: userid},{$inc: {[cardname] : + 1} });
      await profileModel.findOneAndUpdate({userId: userid},{$inc: {xp : + xpgain} });
      levelUp()

      let newreply = new EmbedBuilder().setColor("Grey").setAuthor({name: username,iconURL: interaction.user.avatarURL(),url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }).setTitle(":fire: | PACKED!").setDescription(`You packed:\n\n${packcard}\n*+${xpgain}XP! (${xp}/${xpgoal})*`).setImage(cardimg).setFooter({text: `Packed by ${username}`}).setTimestamp();
      setTimeout(() => {interaction.editReply({embeds: [newreply] });}, 2000);

    } else if (pack == 'goldpack' && coins >= 1000) { // GOLD PACK --------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
         if (level > 1) {
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {packsopened: + 1,},})
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {coins: -1000,},});
            const xpgain = randomXP(12, 45)
            let openingreply = new EmbedBuilder().setColor("Yellow").setTitle(`:beginner: | Unpacking **Gold Pack**...`)
            await interaction.reply({
               embeds: [openingreply]
            });
            await profileModel.findOneAndUpdate({userId: userid},{$inc: {xp : + xpgain} });
            // loot table
            addCard('darkgold', 'goldicon', 100, 96); addCard('vultragold', 'goldicon', 96, 92);
            addCard('vehmicgold', 'goldicon', 92, 88); addCard('jayxgold', 'goldicon', 88, 84);
            addCard('blazengold', 'goldicon', 84, 80); addCard('coldgold', 'goldicon', 80, 76);
            addCard('farosegold', 'goldicon', 76, 72); addCard('ralseigold', 'goldicon', 72, 68);
            addCard('alekirlgold', 'goldicon', 68, 64); addCard('xdissgold', 'goldicon', 64, 60);
            addCard('zakaigold', 'goldicon', 60, 56); addCard('xdiimgold', 'goldicon', 56, 52);
            addCard('epicbroomgold', 'goldicon', 52, 48); addCard('lacleygold', 'goldicon', 48, 44);
            addCard('nightfalcongold', 'goldicon', 44, 40); addCard('krystalgold', 'goldicon', 40, 36);
            addCard('heylogold', 'goldicon', 36, 32); addCard('noobseogold', 'goldicon', 32, 28);
            addCard('catiogold', 'goldicon', 28, 24); addCard('mirkgold', 'goldicon', 24, 20);
            addCard('stretchogold', 'goldicon', 20, 16); addCard('ranifgold', 'goldicon', 16, 12);
            addCard('xendergold', 'goldicon', 12, 8); addCard('valkyriegold', 'goldicon', 8, 4);
            addCard('aerowidegold', 'goldicon', 4, -1);

            await cardModel.findOneAndUpdate({userId: userid},{$inc: {[cardname] : + 1} });
            levelUp()
            let newreply = new EmbedBuilder().setColor("Yellow").setAuthor({name: username,iconURL: interaction.user.avatarURL(),url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }).setTitle(":fire: | PACKED!").setDescription(`You packed:\n\n${packcard}\n*+${xpgain}XP! (${xp}/${xpgoal})*`).setImage(cardimg).setFooter({text: `Packed by ${username}`}).setTimestamp();
      
      
            setTimeout(() => {interaction.editReply({embeds: [newreply] });}, 2000);
         } else {
            levelfail(1)
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