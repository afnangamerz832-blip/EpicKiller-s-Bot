require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
    console.log("Bot is online");
});

client.login(process.env.TOKEN);
        // color
        if (sub === "color") {
            const color = args[1];
            if (!color) return msg.reply("Please provide a hex color (example: #ff0000)");
            await eventRole.setColor(color);
            return msg.reply(`🎨 Your role color has been updated to **${color}**`);
        }

        // icon
        if (sub === "icon") {
            const emoji = args[1];
            if (!emoji) return msg.reply("Please send an emoji!");
            await eventRole.setIcon(emoji);
            return msg.reply(`🔵 Your role icon has been updated!`);
        }

        // remove role
        if (sub === "remove") {
            await msg.member.roles.remove(EVENT_ROLE);
            return msg.reply("❌ Event Winner role removed from you.");
        }

        // equip role
        if (sub === "equip") {
            await msg.member.roles.add(EVENT_ROLE);
            return msg.reply("✅ Event Winner role given to you.");
        }

        return msg.reply("Invalid command!");
    }
});

client.login("PUT_YOUR_TOKEN_HERE");
