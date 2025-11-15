require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once("ready", () => {
    console.log("Bot is online!");
});

const PREFIX = ".ek";
const EVENT_ROLE = 125087036256

client.on("messageCreate", async (msg) => {

    if (msg.author.bot) return;

    // Prefix check
    if (!msg.content.startsWith(PREFIX)) return;

    const args = msg.content.slice(PREFIX.length).trim().split(/\s+/);
    const sub = args[0]; // command like: color, icon, remove, equip

    const eventRole = msg.guild.roles.cache.get(EVENT_ROLE);
    if (!eventRole) return msg.reply("❌ Event role not found!");

    // -------- color command --------
    if (sub === "color") {
        const color = args[1];
        if (!color) return msg.reply("Please provide a hex color like: #ff0000");

        await eventRole.setColor(color);
        return msg.reply(`🎨 Event role color updated to **${color}**`);
    }

    // -------- icon command --------
    if (sub === "icon") {
        const emoji = args[1];
        if (!emoji) return msg.reply("Please provide an emoji!");

        await eventRole.setIcon(emoji);
        return msg.reply("🔵 Event role icon updated!");
    }

    // -------- remove role command --------
    if (sub === "remove") {
        await msg.member.roles.remove(EVENT_ROLE);
        return msg.reply("❌ Event Winner role removed.");
    }

    // -------- equip role command --------
    if (sub === "equip") {
        await msg.member.roles.add(EVENT_ROLE);
        return msg.reply("✅ Event Winner role given!");
    }

    return msg.reply("❌ Invalid command!");
});

client.login(process.env.TOKEN);
