/**
 * NumeroSage Discord Bot — FIXED VERSION
 * Correct Gateway Intents + Message Commands + Slash Commands
 */

const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes, SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");
const levels = require("./spy_levels.json");

const DISCORD_TOKEN    = process.env.DISCORD_TOKEN;
const CHANNEL_ID       = process.env.DISCORD_CHANNEL_ID;
const CLIENT_ID        = process.env.DISCORD_CLIENT_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const firedAlerts = new Set();
let lastPrice = null;

const commands = [
  new SlashCommandBuilder().setName("spy").setDescription("Live SPY price snapshot"),
  new SlashCommandBuilder().setName("levels").setDescription("Key support and resistance levels"),
  new SlashCommandBuilder().setName("setup").setDescription("0DTE call and put setups"),
  new SlashCommandBuilder().setName("numerology").setDescription("Today's numerology energy"),
  new SlashCommandBuilder().setName("brief").setDescription("Full morning brief"),
  new SlashCommandBuilder().setName("thesis").setDescription("Bear market thesis breakdown"),
  new SlashCommandBuilder().setName("help").setDescription("All commands and guide"),
].map(cmd => cmd.toJSON());

async function registerSlashCommands() {
  try {
    const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("Slash commands registered.");
  } catch (error) {
    console.error("Slash command error:", error);
  }
}

async function getSPYPrice() {
  try {
    const res = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/SPY?interval=1m&range=1d",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    const data = await res.json();
    return parseFloat(data.chart.result[0].meta.regularMarketPrice);
  } catch (e) {
    console.error("Price fetch error:", e.message);
    return null;
  }
}

function buildHelpEmbed() {
  return new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle("📋 NumeroSage Commands")
    .setDescription("Use `/command` or `!command`")
    .addFields(
      { name: "/spy or !spy", value: "Live SPY price snapshot", inline: false },
      { name: "/levels or !levels", value: "Key support and resistance levels", inline: false },
      { name: "/setup or !setup", value: "0DTE call and put setups", inline: false },
      { name: "/numerology or !numerology", value: "Today's energy reading", inline: false },
      { name: "/brief or !brief", value: "Full morning brief", inline: false },
      { name: "/thesis or !thesis", value: "Bear market thesis breakdown", inline: false },
      { name: "/help or !help", value: "This menu", inline: false }
    )
    .setFooter({ text: "NumeroSage Market Intel • Not financial advice" })
    .setTimestamp();
}

async function buildSpyEmbed() {
  const price = await getSPYPrice();
  return new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle("📊 SPY LIVE SNAPSHOT")
    .addFields(
      { name: "Price", value: `$${price?.toFixed(2) || "N/A"}`, inline: true },
      { name: "ATH Zone", value: "$712.92", inline: true },
      { name: "Pattern", value: "Ascending Triangle", inline: true },
      { name: "🔴 Resistance", value: "$713.35 — Premarket High\n$712.92 — ATH / Double Top\n$712.48 — Triangle Top\n$710.09 — DWMQ Level", inline: false },
      { name: "🟢 Support", value: "$709.02 — $6.6B Liquidity Pool\n$708.44 — Overnight Low\n$707.28 — $4.8B Volume Node\n$705.55 — Deep Support", inline: false },
      { name: "Bias", value: "🔴 Bearish above $712.92 | 🟢 Bullish bounce at $709.02", inline: false }
    )
    .setFooter({ text: "NumeroSage Market Intel • Not financial advice" })
    .setTimestamp();
}

function buildLevelsEmbed() {
  return new EmbedBuilder()
    .setColor(0xF1C40F)
    .setTitle("📐 SPY KEY LEVELS")
    .addFields(
      { name: "🔴 Resistance", value: "$713.35 — Premarket High\n$712.92 — Double Top / ATH\n$712.48 — Ascending Triangle Top\n$711.28 — Volume Node 32%\n$710.09 — DWMQ Confluence", inline: false },
      { name: "🟢 Support", value: "$709.02 — $6.639B Liquidity Pool\n$708.44 — Overnight Low\n$707.28 — $4.838B Volume Node\n$706.53 — Volume Node\n$705.55 — Deep Support\n$704.75 — Breakdown Level", inline: false },
      { name: "⚡ Key Watch", value: "Inside Bar $709.05 — compression before expansion\nBreak above $712.48 = $718 target\nBreak below $704.75 = puts activate", inline: false }
    )
    .setFooter({ text: "NumeroSage Market Intel • Not financial advice" })
    .setTimestamp();
}

function buildSetupEmbed() {
  return new EmbedBuilder()
    .setColor(0x00FF88)
    .setTitle("⚡ 0DTE OPTIONS SETUP")
    .addFields(
      { name: "🟢 CALL SETUP", value: "**Entry:** $709.02–$709.74 bounce\n**Strike:** $710 Call\n**Target 1:** $711.28\n**Target 2:** $712.48\n**Stop:** Below $708.14\n**Exit by:** 2:00 PM ET\n**Contracts:** 2 max", inline: false },
      { name: "🔴 PUT SETUP", value: "**Entry:** $712.48–$712.92 rejection\n**Strike:** $712 Put\n**Target 1:** $710.09\n**Target 2:** $709.02\n**Stop:** Above $713.35\n**Exit by:** 3:00 PM ET\n**Contracts:** 2 max", inline: false },
      { name: "⚠️ Rules", value: "Wait 30 min after open\nTake 50% at Target 1\nNever hold 0DTE past 3pm", inline: false }
    )
    .setFooter({ text: "NumeroSage Market Intel • Not financial advice" })
    .setTimestamp();
}

function buildNumerologyEmbed() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  let yearSum = String(year).split("").reduce((a, b) => a + parseInt(b), 0);
  while (yearSum > 9) yearSum = String(yearSum).split("").reduce((a, b) => a + parseInt(b), 0);
  let raw = month + day + yearSum;
  while (raw > 9 && raw !== 11 && raw !== 22 && raw !== 33) {
    raw = String(raw).split("").reduce((a, b) => a + parseInt(b), 0);
  }
  const meanings = {
    1: "Initiation — new trends begin today.",
    2: "Duality — market picks a side. Expect fakeouts.",
    3: "Expression — news driven volatility.",
    4: "Structure — key levels most significant.",
    5: "Chaos — fast reversals. Tight stops.",
    6: "Protection — protect capital first.",
    7: "Analysis — trust data over emotion.",
    8: "Power — your strongest trading day.",
    9: "Completion — take profits. Exit by 3pm.",
    11: "Master Intuition — deception day. ATH can be traps.",
    22: "Master Builder — major institutional moves.",
    33: "Master Teacher — extreme moves before reversal.",
  };
  return new EmbedBuilder()
    .setColor(0x9B59B6)
    .setTitle("🔢 NUMEROLOGY DAILY ENERGY")
    .addFields(
      { name: `Universal Day ${raw}`, value: meanings[raw] || "Standard market day.", inline: false },
      { name: "Life Path 8 Edge", value: "Double 8 power year — trust conviction, size responsibly.", inline: false }
    )
    .setFooter({ text: "NumeroSage Market Intel" })
    .setTimestamp();
}

async function buildMorningBriefEmbed() {
  const price = await getSPYPrice();
  return new EmbedBuilder()
    .setColor(0x9B59B6)
    .setTitle("🐻🔢 NUMEROSAGE MORNING BRIEF")
    .setDescription(`SPY pre-market: **$${price?.toFixed(2) || "N/A"}**`)
    .addFields(
      { name: "🔴 Resistance", value: "$713.35 / $712.92 / $712.48 / $710.09", inline: false },
      { name: "🟢 Support", value: "$709.02 / $708.44 / $707.28 / $705.55", inline: false },
      { name: "📊 Pattern", value: "Ascending Triangle | Inside Bar compression", inline: false },
      { name: "⚡ 0DTE", value: "Calls: bounce $709 → $710 strike\nPuts: reject $712.48 → $712 strike", inline: false },
      { name: "🔢 Numerology", value: "Use !numerology for today's energy", inline: false }
    )
    .setFooter({ text: "NumeroSage Market Intel • Not financial advice" })
    .setTimestamp();
}

function buildThesisEmbed() {
  return new EmbedBuilder()
    .setColor(0xFF4444)
    .setTitle("🐻 THE BEAR MARKET THESIS")
    .addFields(
      { name: "The Jenga Theory", value: "$20.6T in passive index funds.\nGroupthink propped this market.\nWhen it sells — it sells FAST.", inline: false },
      { name: "📉 Evidence", value: "Death cross active\nWeak high $712 ATH zone\nVolume declining on rallies\nGoldman loan losses doubled\nOil above $94 — stagflation\nConsumer sentiment near record low", inline: false },
      { name: "🎯 Gap Targets", value: "$666 → $655 → $635 → $628", inline: false }
    )
    .setFooter({ text: "Protect profits. Stack dry powder. 🐻 • Not financial advice" })
    .setTimestamp();
}

async function handleCommand(commandName, respond) {
  switch (commandName) {
    case "help": await respond({ embeds: [buildHelpEmbed()] }); break;
    case "spy": await respond({ embeds: [await buildSpyEmbed()] }); break;
    case "levels": await respond({ embeds: [buildLevelsEmbed()] }); break;
    case "setup": await respond({ embeds: [buildSetupEmbed()] }); break;
    case "numerology": await respond({ embeds: [buildNumerologyEmbed()] }); break;
    case "brief": await respond({ embeds: [await buildMorningBriefEmbed()] }); break;
    case "thesis": await respond({ embeds: [buildThesisEmbed()] }); break;
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  await interaction.deferReply();
  await handleCommand(interaction.commandName, (data) => interaction.editReply(data));
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;
  const commandName = message.content.slice(1).toLowerCase().trim();
  const valid = ["help", "spy", "levels", "setup", "numerology", "brief", "thesis"];
  if (!valid.includes(commandName)) return;
  await handleCommand(commandName, (data) => message.channel.send(data));
});

function isMarketHours() {
  const et = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const h = et.getHours(), m = et.getMinutes(), day = et.getDay();
  if (day === 0 || day === 6) return false;
  return (h === 9 && m >= 30) || (h > 9 && h < 16);
}

client.once("ready", async () => {
  console.log(`✅ NumeroSage Discord Bot online — ${client.user.tag}`);
  if (CLIENT_ID) await registerSlashCommands();
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    await channel.send({ embeds: [await buildMorningBriefEmbed()] });
    console.log("Morning brief sent.");
  } catch (e) {
    console.error("Startup error:", e.message);
  }
  setInterval(async () => {
    if (!isMarketHours()) return;
    const price = await getSPYPrice();
    if (!price) return;
    const channel = await client.channels.fetch(CHANNEL_ID);
    for (const level of levels.spy_levels.resistance_levels) {
      const key = `res_${level.price}`;
      if (firedAlerts.has(key)) continue;
      if (lastPrice && lastPrice < level.price && price >= level.price) {
        await channel.send({ embeds: [new EmbedBuilder().setColor(0xFF4444).setTitle(`🔴 RESISTANCE — $${level.price}`).setDescription(level.alert).setTimestamp()] });
        firedAlerts.add(key);
      }
    }
    for (const level of levels.spy_levels.support_levels) {
      const key = `sup_${level.price}`;
      if (firedAlerts.has(key)) continue;
      if (lastPrice && lastPrice > level.price && price <= level.price) {
        await channel.send({ embeds: [new EmbedBuilder().setColor(0x44FF44).setTitle(`🟢 SUPPORT — $${level.price}`).setDescription(level.alert).setTimestamp()] });
        firedAlerts.add(key);
      }
    }
    lastPrice = price;
  }, 2 * 60 * 1000);
  setInterval(async () => {
    const et = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    if (et.getHours() === 9 && et.getMinutes() === 25) {
      const channel = await client.channels.fetch(CHANNEL_ID);
      await channel.send({ embeds: [await buildMorningBriefEmbed()] });
    }
  }, 60 * 1000);
});

client.login(DISCORD_TOKEN);
