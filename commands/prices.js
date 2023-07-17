const { SlashCommandBuilder, EmbedBuilder, Message, GatewayIntentBits, Client } = require("discord.js");
const val = require("../val.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("prices")
        .setDescription("Checks prices of cards.")
        .addStringOption(option =>
            option.setName('rarity').setDescription('Select card rarity.').setRequired(true)
            .addChoices({name: "silver", value: "silver"}, {name: "gold", value: "gold"})
            ),
    async execute(interaction) {
        const rar = interaction.options.getString('rarity');
        let content = '';
        let embedcolor = ""
        let title = ``

        function addCard(card, rar) {
            content += `${val[rar]} **${val[card].name}** - ${val[card].price}<:coinn:1130125410483581000>\n`
        }

        if (rar == 'silver') {
            embedcolor = "Grey";
            addCard('alphasilver', 'silvericon'); addCard('dtlsilver', 'silvericon');
            addCard('sirfilosilver', 'silvericon'); addCard('vehmicsilver', 'silvericon');
            addCard('harmsilver', 'silvericon'); addCard('ralseisilver', 'silvericon');
            addCard('contrasilver', 'silvericon'); addCard('xdiimsilver', 'silvericon');
            addCard('nextsilver', 'silvericon'); addCard('sythsilver', 'silvericon');
            addCard('cirilicsilver', 'silvericon'); addCard('mrtoastysilver', 'silvericon');
            addCard('epicbroomsilver', 'silvericon'); addCard('kamtesilver', 'silvericon');
            addCard('smirkysilver', 'silvericon'); addCard('panzersilver', 'silvericon');
            addCard('hexerionsilver', 'silvericon'); addCard('okiepsilver', 'silvericon');
            addCard('irongirlssilver', 'silvericon'); addCard('shebeelsilver', 'silvericon');
            title = val.silvericon + " | Silver cards prices"
        } else if (rar == 'gold') {
            embedcolor = "Yellow";
            addCard('darkgold', 'goldicon'); addCard('vultragold', 'goldicon');
            addCard('vehmicgold', 'goldicon'); addCard('jayxgold', 'goldicon');
            addCard('blazengold', 'goldicon'); addCard('coldgold', 'goldicon');
            addCard('farosegold', 'goldicon'); addCard('ralseigold', 'goldicon');
            addCard('alekirlgold', 'goldicon'); addCard('xdissgold', 'goldicon');addCard('aerowidegold', 'goldicon');
            addCard('zakaigold', 'goldicon'); addCard('xdiimgold', 'goldicon');
            addCard('epicbroomgold', 'goldicon'); addCard('lacleygold', 'goldicon');
            addCard('nightfalcongold', 'goldicon'); addCard('krystalgold', 'goldicon');
            addCard('heylogold', 'goldicon'); addCard('noobseogold', 'goldicon');
            addCard('catiogold', 'goldicon'); addCard('mirkgold', 'goldicon');
            addCard('stretchogold', 'goldicon'); addCard('ranifgold', 'goldicon');
            addCard('xendergold', 'goldicon'); addCard('valkyriegold', 'goldicon');
            
            title = val.goldicon + " | Gold cards prices"
        }

        const embedreply = new EmbedBuilder()
            .setColor(embedcolor)
            .setTitle(title)
            .setDescription(content)
         interaction.reply({
            embeds: [embedreply]
        });

    }

}