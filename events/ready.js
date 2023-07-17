const { Events, Activity, ActivityType } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute (client) {
        console.log(`${client.user.username} is ready ✅ [IIIIIooooo] 50%`);
        client.user.setPresence({
            activities: [{ name: `committing war crimes`, type: ActivityType.Competing }],
            status: 'dnd',
          });
    }
}
