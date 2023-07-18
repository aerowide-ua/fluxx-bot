const { SlashCommandBuilder, EmbedBuilder, Client, Collection, GatewayIntentBits } = require("discord.js");
const profileModel = require("../models/profileSchema");
const { workMin, workMax } = require("../val.json")
const cooldowns = new Collection();
const cooldownTime = 10;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("Makes you do work for some money."),
    async execute(interaction, profileData) {
        const { coins, level } = profileData;
        const userid = interaction.user.id;
        let randomamount = Math.round(
            Math.random() * (((100 * (1 + level)) - (10 * (1 + level)) + 1) + (10 * (1 + level)))
        ); 

        const timeleft = 10 + Math.round((cooldownTime - (Date.now() - cooldowns.get(userid)))/1000);
        const cooldownreply = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Cooldown!")
            .setDescription(`Please wait ${timeleft} seconds before using this command again.`)

        const works = [
            'jayx stream manager',
            'jayx stream helper',
            'jayx stream mod',
            'VPacks developer',
            'VPacks bug finder',
            'walmart developer',
            'walmart tester',
            'walmart vpacks developer',
            'walmart vpacks tester',
            'puta :face_with_raised_eyebrow:',
            'average american cop',
            'VPacks card designer',
            'shebeel producer',
            'thief',
            'VPS lawyer',
            'VPS president',
            'VPS vice president',
            'bombre',
            'irrelevant employee',
            'depressed shop clerk'
        ];

        const worksrand = Math.floor(Math.random() * works.length);
        const worksrandom = works[worksrand].slice(0, 50);

        if (cooldowns.has(userid)) {
            interaction.reply({ ephemeral: true, embeds: [cooldownreply] });
            return;
        }

        try {
            await profileModel.findOneAndUpdate(
                {userId: userid},
                {
                    $inc: {
                        coins: + randomamount,
                    },
                }
            )
        } catch (error) {
            console.log(error);
        }

        const embedreply = new EmbedBuilder()
            .setColor("Yellow")
            .setAuthor({
                name: 'money 🤑',
                iconURL: interaction.user.avatarURL(),
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
            })
            .setThumbnail(interaction.user.avatarURL())
            .setDescription(
                `<@${userid}> You worked as a **${worksrandom}** and earned ${randomamount}<:coinn:1130125410483581000>`
            )
            .setTimestamp()
            .setFooter({ text: `Balance: ${coins+randomamount} coins`})
        interaction.reply({
            embeds: [embedreply]
        });

        cooldowns.set(userid, Date.now());

        setTimeout(() => {
            cooldowns.delete(userid);
        }, cooldownTime * 1000);
        
    }

}