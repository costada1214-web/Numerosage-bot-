/**
 * NumeroSage Discord Bot — SPY Level Alerts
 * Monitors SPY price and fires alerts when key levels are hit
 * Built from your TradingView chart levels
 */

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const levels = require("./spy_levels.json");

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID    = process.env.DISCORD_CHANNEL_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Track fired alerts to avoid spam
const firedAlerts = new Set();
let lastPrice = null;

// ── PRICE FETCHER ─────────────────────────────────────────────────────────────

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

// ── EMBED BUILDERS ────────────────────────────────────────────────────────────

function buildResistanceEmbed(level, price) {
  return new EmbedBuilder()
    .setColor(0xFF4444)
    .setTitle(`🔴 RESISTANCE HIT — $${level.price}`)
    .setDescription(level.alert)
    .addFields(
      { name: "Level", value: `$${level.price}`, inline: true },
      { name: "SPY Price", value: `$${price.toFixed(2)}`, inline: true },
      { name: "Action", value: level.action, inline: true },
      { name: "Label", value: level.label, inline: false }
    )
    .setFooter({ text: "NumeroSage Market Intel • Not financial advice" })
    .setTimestamp();
}

function buildSupportEmbed(level, price) {
  return new EmbedBuilder()
    .setColor(0x44FF44)
    .setTitle(`🟢 SUPPORT HIT — $${level.price}`)
    .setDescription(level.alert)
    .addFields(
      { name: "Level", value: `$${level.price}`, inline: true },
      { name: "SPY Price", value: `$${price.toFixed(2)}`, inline: true },
      { name: "Action", value: level.action, inline: true },
      { name: "Label", value: level.label, inline: false }
    )
    .setFooter({ text: "NumeroSage Market Intel • Not financial advice" })
    .setTimestamp();
}

function buildMorningBriefEmbed(price) {
  const spy = levels.spy_levels;
  return new EmbedBuilder()
    .setColor(0x9B59B6)
    .setTitle("🐻🔢 NUMEROSAGE MORNING BRIEF")
    .setDescription(`SPY pre-market: **$${price.toFixed(2)}**`)
    .addFields(
      {
        name: "🔴 Key Resistance",
        value: `$713.35 — Premarket High\n$712.92 — ATH / Double Top\n$712.48 — Ascending Triangle top\n$710.09 — DWMQ Level`,
        inline: false
      },
      {
        name: "🟢 Key Support",
        value: `$709.02 — $6.6B Liquidity Pool\n$708.44 — Overnight Low\n$707.28 — $4.8B Volume Node\n$705.55 — Deep Support`,
        inline: false
      },
      {
        name: "📊 Pattern",
        value: "Ascending Triangle — flat top $712.48\nInside Bar at $709.05 — compression before expansion",
        inline: false
      },
      {
        name: "📋 0DTE Setup",
        value: `**Calls:** Enter $709–$709.74 bounce → Strike $710 → Target $711.28 / $712.48\n**Puts:** Enter $712.48–$712.92 rejection → Strike $712 → Target $710 / $709`,
        inline: false
      },
      {
        name: "🔢 Numerology",
        value: `Universal Day 2 — Duality\nPersonal Day 9 — Take profits, exit by 3pm`,
        inline: false
      }
    )
    .setFooter({ text: "NumeroSage Market Intel • Not financial advice" })
    .setTimestamp();
}

function buildOptionsAlertEmbed(type, setup) {
  const isCall = type === "call";
  return new EmbedBuilder()
    .setColor(isCall ? 0x00FF88 : 0xFF4444)
    .setTitle(isCall ? "🟢 0DTE CALL ENTRY SIGNAL" : "🔴 0DTE PUT ENTRY SIGNAL")
    .setDescription(isCall
      ? setup["0DTE_calls"].alert
      : setup["0DTE_puts"].alert
    )
    .addFields(
      {
        name: "Strike",
        value: isCall ? setup["0DTE_calls"].strike : setup["0DTE_puts"].strike,
        inline: true
      },
      {
        name: "Target 1",
        value: `$${isCall ? setup["0DTE_calls"].target_1 : setup["0DTE_puts"].target_1}`,
        inline: true
      },
      {
        name: "Target 2",
        value: `$${isCall ? setup["0DTE_calls"].target_2 : setup["0DTE_puts"].target_2}`,
        inline: true
      },
      {
        name: "Stop",
        value: `$${isCall ? setup["0DTE_calls"].stop : setup["0DTE_puts"].stop}`,
        inline: true
      },
      {
        name: "Max Hold",
        value: isCall ? setup["0DTE_calls"].max_hold_time : setup["0DTE_puts"].max_hold_time,
        inline: true
      },
      {
        name: "Contracts",
        value: `${isCall ? setup["0DTE_calls"].contracts : setup["0DTE_puts"].contracts} max`,
        inline: true
      }
    )
    .setFooter({ text: "NumeroSage Market Intel • Not financial advice" })
    .setTimestamp();
}

// ── PRICE MONITOR ─────────────────────────────────────────────────────────────

async function checkLevels(price) {
  const channel = await client.channels.fetch(CHANNEL_ID);
  const spy = levels.spy_levels;

  // Check resistance levels
  for (const level of spy.resistance_levels) {
    const key = `res_${level.price}`;
    if (firedAlerts.has(key)) continue;

    const hit = lastPrice && lastPrice < level.price && price >= level.price;
    if (hit) {
      const embed = buildResistanceEmbed(level, price);
      await channel.send({ embeds: [embed] });
      firedAlerts.add(key);

      // Fire options put alert at key levels
      if (level.price === 712.48 || level.price === 712.92) {
        const optEmbed = buildOptionsAlertEmbed("put", spy.options_setup);
        await channel.send({ embeds: [optEmbed] });
      }
    }
  }

  // Check support levels
  for (const level of spy.support_levels) {
    const key = `sup_${level.price}`;
    if (firedAlerts.has(key)) continue;

    const hit = lastPrice && lastPrice > level.price && price <= level.price;
    if (hit) {
      const embed = buildSupportEmbed(level, price);
      await channel.send({ embeds: [embed] });
      firedAlerts.add(key);

      // Fire options call alert at key bounce zones
      if (level.price === 709.02 || level.price === 707.28) {
        const optEmbed = buildOptionsAlertEmbed("call", spy.options_setup);
        await channel.send({ embeds: [optEmbed] });
      }
    }
  }

  lastPrice = price;
}

// ── SCHEDULED JOBS ────────────────────────────────────────────────────────────

async function morningBrief() {
  const price = await getSPYPrice();
  if (!price) return;
  const channel = await client.channels.fetch(CHANNEL_ID);
  const embed = buildMorningBriefEmbed(price);
  await channel.send({ embeds: [embed] });
}

function isMarketHours() {
  const now = new Date();
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const h = et.getHours();
  const m = et.getMinutes();
  const day = et.getDay();
  if (day === 0 || day === 6) return false;
  if (h === 9 && m >= 30) return true;
  if (h > 9 && h < 16) return true;
  return false;
}

// ── BOT COMMANDS ──────────────────────────────────────────────────────────────

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const content = message.content.toLowerCase();

  if (content === "!spy") {
    const price = await getSPYPrice();
    const spy = levels.spy_levels;
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("📊 SPY LIVE SNAPSHOT")
      .addFields(
        { name: "Price", value: `$${price?.toFixed(2) || "N/A"}`, inline: true },
        { name: "ATH Zone", value: "$712.92", inline: true },
        { name: "Major Support", value: "$709.02", inline: true },
        { name: "Premarket High", value: "$713.35", inline: true },
        { name: "Premarket Low", value: "$707.14", inline: true },
        { name: "Pattern", value: "Ascending Triangle", inline: true },
        { name: "Bias", value: "🔴 Bearish above $712.92", inline: false }
      )
      .setFooter({ text: "Not financial advice" })
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }

  if (content === "!levels") {
    const embed = new EmbedBuilder()
      .setColor(0xF1C40F)
      .setTitle("📐 SPY KEY LEVELS")
      .addFields(
        {
          name: "🔴 Resistance",
          value: `$713.35 — Premarket High\n$712.92 — Double Top / ATH\n$712.48 — Triangle Top\n$711.28 — Volume Node 32%\n$710.68 — Volume Node 30%`
        },
        {
          name: "🟢 Support",
          value: `$709.02 — $6.6B Liquidity\n$708.44 — Overnight Low\n$707.28 — $4.8B Volume Node\n$706.53 — Volume Node\n$705.55 — Deep Support`
        },
        {
          name: "⚡ Key Levels",
          value: `$710.09 — DWMQ Confluence (Daily/Weekly/Monthly/Quarterly)\n$709.74 — Equilibrium`
        }
      )
      .setFooter({ text: "Not financial advice" })
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }

  if (content === "!setup") {
    const spy = levels.spy_levels;
    const callEmbed = buildOptionsAlertEmbed("call", spy.options_setup);
    const putEmbed = buildOptionsAlertEmbed("put", spy.options_setup);
    message.channel.send({ embeds: [callEmbed] });
    message.channel.send({ embeds: [putEmbed] });
  }

  if (content === "!numerology") {
    const num = levels.spy_levels.numerology;
    const embed = new EmbedBuilder()
      .setColor(0x9B59B6)
      .setTitle("🔢 NUMEROLOGY TODAY")
      .addFields(
        { name: "Universal Day", value: `${num.universal_day} — ${num.energy}`, inline: false },
        { name: "Personal Day", value: `${num.personal_day} — ${num.trading_edge}`, inline: false }
      )
      .setFooter({ text: "NumeroSage Market Intel" })
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }

  if (content === "!brief") {
    await morningBrief();
  }

  if (content === "!help") {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("📋 NumeroSage Commands")
      .addFields(
        { name: "!spy", value: "Live SPY price snapshot" },
        { name: "!levels", value: "All key support and resistance levels" },
        { name: "!setup", value: "0DTE call and put setups" },
        { name: "!numerology", value: "Today's numerology energy" },
        { name: "!brief", value: "Full morning brief" },
        { name: "!help", value: "This menu" }
      )
      .setFooter({ text: "Not financial advice" })
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }
});

// ── STARTUP ───────────────────────────────────────────────────────────────────

client.once("ready", async () => {
  console.log(`NumeroSage Discord Bot online — ${client.user.tag}`);

  // Send morning brief on startup
  await morningBrief();

  // Monitor price every 2 minutes during market hours
  setInterval(async () => {
    if (!isMarketHours()) return;
    const price = await getSPYPrice();
    if (price) await checkLevels(price);
  }, 2 * 60 * 1000);

  // Morning brief at 9:25am ET
  setInterval(async () => {
    const now = new Date();
    const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    if (et.getHours() === 9 && et.getMinutes() === 25) {
      await morningBrief();
    }
  }, 60 * 1000);
});

client.login(DISCORD_TOKEN);
