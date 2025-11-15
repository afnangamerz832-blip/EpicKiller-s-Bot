
const { Client, GatewayIntentBits, Partials, PermissionsBitField } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Channel]
});

// -------------------- CONFIG --------------------
const ACCESS_ROLE = "1439233827733110915";
const EVENT_ROLE = "1250870362565251123";
// ------------------------------------------------

client.on("ready", () => {
    console.log(`Bot logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
    if (!msg.guild || msg.author.bot) return;
    if (!msg.member.roles.cache.has(ACCESS_ROLE)) return; // Only access role

    const args = msg.content.split(" ");
    const cmd = args.shift()?.toLowerCase();

    const eventRole = msg.guild.roles.cache.get(EVENT_ROLE);
    if (!eventRole) return msg.reply("Event Winner role not found!");

    if (cmd === ".ek") {
        const sub = args[0];

        // rename
        if (sub === "rename") {
            const newName = args.slice(1).join(" ");
            if (!newName) return msg.reply("Please provide a new name!");
            await eventRole.setName(newName);
            return msg.reply(`✅ Your role has been renamed to **${newName}**`);
        }

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
