const { SlashCommandBuilder, EmbedBuilder, Message, GatewayIntentBits, Client } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
        ]});
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help."),
    async execute(interaction, message) {
        const embedreply = new EmbedBuilder()
            .setColor("Aqua")
            .setTitle(":question: | walmart vpacks help")
            .addFields(
                {
                    name: "<:coinn:1130125410483581000> | Main Economy",
                    value: `**/balance:** displays your (or mentioned user's) coin balance.\n**/sell:** sells a card from your inventory for money.\n**/sellext:** same as \`\`/sell\`\` but more card choices\n**/prices:** show prices for cards of same rarity/group.\n**/shop:** displays the shop embed.\n**/pay:** gives the mentioned user coins from your balance.`,
                    inline: true
                },
                {
                    name: ":beginner: | Utility",
                    value: `**/ping:** pings the bot and shows latency.\n**/profile:** shows your (or mentioned user's) profile.\n**/lb:** coins leaderboard;`,
                    inline: true
                },
                {
                    name: ":video_game: | Minigames",
                    value: `**/work:** guranteed way to earn coins *(10s cooldown)*.\n**/bet:** 50/50 chance to either gain 1.5x your bet or lose it`,
                    inline: true
                },
                {
                    name: '😴 | Nothing for now...',
                    value: '💤💤💤'
                }
            )
            .setFooter({ text: 'pre-release beta 👀'})
            .setImage('https://cdn.discordapp.com/attachments/1128996601566871633/1129526914936221878/image.png')
         interaction.reply({
            embeds: [embedreply]
        });

    }

}