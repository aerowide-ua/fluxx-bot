const { SlashCommandBuilder, EmbedBuilder, Collection } = require("discord.js");
const profileModel = require("../models/profileSchema");
const cooldowns = new Collection();
const cooldownTime = 5;

module.exports = {

    data: new SlashCommandBuilder()
        .setName("bet")
        .setDescription("50/50 chance either you lose or double your coins")
        .addIntegerOption(option => option
            .setName('bet')
            .setDescription('Your bet amount.')
            .setRequired(true)
        ),

    async execute(interaction, profileData) {
        const { coins } = profileData;
        const username = interaction.user.username;
        const userid = interaction.user.id;
        const bet = interaction.options.getInteger('bet');
        let betreply = '';
        const timeleft = 5 + Math.round((cooldownTime - (Date.now() - cooldowns.get(userid)))/1000);
        const cooldownreply = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Cooldown!")
            .setDescription(`Please wait ${timeleft} seconds before using this command again.`)
        const failreply = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`Oops!`)
            .setDescription('Not enough coins. Minimal bet is **100**<:coinn:1130125410483581000>')
        if (cooldowns.has(userid)) {
            interaction.reply({ ephemeral: true, embeds: [cooldownreply] });
            return;
        }

        if (bet > coins || bet < 100) {
            interaction.reply({embed: [failreply], ephemeral: true});
            return;
        }

        fiftyfifty = Math.round(Math.random())
        betwin = bet * 1.5
        if (fiftyfifty == 0) {
            await profileModel.findOneAndUpdate(
                {userId: userid},
                {
                    $inc: {
                         coins: - bet,
                    },
                }
            )

            betreply = `You lost ${bet}<:coinn:1130125410483581000> ! Congrats'nt!`
        } else if (fiftyfifty == 1) {
            await profileModel.findOneAndUpdate(
                    {userId: userid},
                    {
                        $inc: {
                            coins: + betwin,
                        },
                    }
                )
            betreply = `You won ${bet*1.5}<:coinn:1130125410483581000> ! Congrats!`
        }
        const embedreply = new EmbedBuilder()
            .setColor(fiftyfifty == 1 ? "Green" : "Red")
            .setTitle(`${username}'s Bet`)
            .setDescription(betreply)
            .setTimestamp()

        interaction.reply({ embeds: [embedreply]});

        cooldowns.set(userid, Date.now());

        setTimeout(() => {
            cooldowns.delete(userid);
        }, cooldownTime * 1000);
    }

}