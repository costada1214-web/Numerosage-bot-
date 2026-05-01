/**

- MAY 1 FLOWER MOON ALERTS — NumeroSage Discord Bot
- SPY OTM Options Setup + Flower Moon Time Alerts
- Add scheduleMay1Alerts() call inside client.once(“ready”)
  */

const MAY1_LEVELS = {
date: “2026-05-01”,
session: “Flower Moon Day — Universal Day 7 — Revelation”,
spy_premarket: 714.65,

otm_puts: {
strike: 710,
expiry: “May 9”,
entry_zone: “715.00–716.00”,
entry_trigger: “Rejection at open OR Flower Moon candle at 1:23pm”,
stop: 719.00,
target_1: 710.00,
target_2: 706.50,
target_3: 704.02,
thesis_target: 694.00,
max_contracts: 2,
},

otm_calls: {
strike: 720,
expiry: “May 2”,
entry_zone: “715.50–716.50”,
entry_trigger: “Break above 716 with strong volume BEFORE 1pm only”,
stop: 713.00,
target: 722.00,
exit_hard: “1:15 PM ET — before Flower Moon peak”,
max_contracts: 1,
warning: “EXIT ALL CALLS before 1:23pm Flower Moon peak”,
},

key_levels: [
{ price: 720.00, label: “Triangle measured target / Bull breakout”, direction: “above”, color: “green” },
{ price: 716.50, label: “ATH resistance / distribution zone”, direction: “above”, color: “red” },
{ price: 715.78, label: “Yesterday’s high — premarket ceiling”, direction: “above”, color: “red” },
{ price: 714.65, label: “Today’s premarket open / equilibrium”, direction: “neutral”, color: “yellow” },
{ price: 712.92, label: “MAJOR resistance — double top level”, direction: “above”, color: “red” },
{ price: 711.58, label: “Yesterday’s low — key support”, direction: “below”, color: “green” },
{ price: 710.00, label: “OTM put target 1 / round number”, direction: “below”, color: “green” },
{ price: 706.50, label: “Gap fill target 2”, direction: “below”, color: “green” },
{ price: 704.02, label: “Orange level — major support”, direction: “below”, color: “green” },
{ price: 694.00, label: “Volume node — Jenga thesis target”, direction: “below”, color: “green” },
],
};

// ── EMBED BUILDERS ─────────────────────────────────────────────────────────────

function buildMay1BriefEmbed() {
return {
color: 0x9B59B6,
title: “🌕🐻 FLOWER MOON DAY — MAY 1 BRIEF”,
description: “Universal Day 7 — Revelation | Flower Moon peaks 1:23 PM ET”,
fields: [
{
name: “📊 SPY Premarket”,
value: `$${MAY1_LEVELS.spy_premarket} | Yesterday range $711.58–$715.78`,
inline: false,
},
{
name: “🔴 OTM PUT SETUP”,
value: [
`**Strike:** $${MAY1_LEVELS.otm_puts.strike} Put`,
`**Expiry:** ${MAY1_LEVELS.otm_puts.expiry}`,
`**Entry:** ${MAY1_LEVELS.otm_puts.entry_zone} rejection`,
`**Stop:** $${MAY1_LEVELS.otm_puts.stop}`,
`**Target 1:** $${MAY1_LEVELS.otm_puts.target_1}`,
`**Target 2:** $${MAY1_LEVELS.otm_puts.target_2}`,
`**Target 3:** $${MAY1_LEVELS.otm_puts.target_3}`,
`**Thesis:** $${MAY1_LEVELS.otm_puts.thesis_target}`,
].join(”\n”),
inline: false,
},
{
name: “🟢 OTM CALL SETUP (morning only)”,
value: [
`**Strike:** $${MAY1_LEVELS.otm_calls.strike} Call`,
`**Entry:** Above $716 with volume`,
`**Target:** $${MAY1_LEVELS.otm_calls.target}`,
`**Stop:** $${MAY1_LEVELS.otm_calls.stop}`,
`⚠️ **${MAY1_LEVELS.otm_calls.warning}**`,
].join(”\n”),
inline: false,
},
{
name: “🔢 Numerology”,
value: “Universal Day 7 — Revelation\nPersonal Day 6 — Protect capital\nFlower Moon 1:23 PM ET — Scorpio full moon peaks”,
inline: false,
},
{
name: “📋 Order Flow Signal”,
value: “Net buy volume declining since April 20\nPrice still up = distribution in progress\nSmart money exiting while retail buys ATH”,
inline: false,
},
],
footer: { text: “NumeroSage Market Intel • Not financial advice” },
timestamp: new Date().toISOString(),
};
}

function buildOTMPutEmbed() {
return {
color: 0xFF4444,
title: “🔴 OTM PUT SETUP — MAY 1”,
fields: [
{ name: “Strike”, value: `$${MAY1_LEVELS.otm_puts.strike} Put`, inline: true },
{ name: “Expiry”, value: MAY1_LEVELS.otm_puts.expiry, inline: true },
{ name: “Contracts”, value: `${MAY1_LEVELS.otm_puts.max_contracts} max`, inline: true },
{ name: “Entry Zone”, value: MAY1_LEVELS.otm_puts.entry_zone, inline: true },
{ name: “Trigger”, value: MAY1_LEVELS.otm_puts.entry_trigger, inline: false },
{ name: “Stop Loss”, value: `$${MAY1_LEVELS.otm_puts.stop}`, inline: true },
{ name: “Target 1”, value: `$${MAY1_LEVELS.otm_puts.target_1}`, inline: true },
{ name: “Target 2”, value: `$${MAY1_LEVELS.otm_puts.target_2}`, inline: true },
{ name: “Target 3”, value: `$${MAY1_LEVELS.otm_puts.target_3}`, inline: true },
{ name: “Thesis Target”, value: `$${MAY1_LEVELS.otm_puts.thesis_target}`, inline: true },
{ name: “Why OTM?”, value: “Lower premium = higher % return on the move\nRisk defined to premium paid\nGives room for Flower Moon catalyst to develop”, inline: false },
],
footer: { text: “NumeroSage Market Intel • Not financial advice” },
timestamp: new Date().toISOString(),
};
}

function buildFlowerMoonAlertEmbed() {
return {
color: 0x9B59B6,
title: “🌕 FLOWER MOON PEAKS NOW — 1:23 PM ET”,
description: “Scorpio Full Moon | Universal Day 7 | Revelation Energy Peak”,
fields: [
{
name: “⚡ This is the moment”,
value: “Watch the next 5-minute candle on SPY RIGHT NOW\nScorpio moon rules hidden debt, transformation, financial truth\nWhatever direction this candle closes — that is the real move”,
inline: false,
},
{
name: “🔴 If SPY rejects here”,
value: “Rejection at $715–$716 = PUT ENTRY confirmed\n$710 Put May 9 — enter immediately\nTarget cascade: $710 → $706 → $704 → $694”,
inline: false,
},
{
name: “🟢 If SPY breaks higher”,
value: “Close above $717 with volume = bulls win today\nExit puts, step aside\n$720–$722 measured target next”,
inline: false,
},
{
name: “🔢 Numerology peak”,
value: “Day 7 + Full Moon = maximum revelation energy\nMarkets cannot hide truth at this moment\nTrust what you see on the chart — not what you hope”,
inline: false,
},
],
footer: { text: “NumeroSage Market Intel • Not financial advice” },
timestamp: new Date().toISOString(),
};
}

// ── TIME-BASED ALERT SCHEDULER ─────────────────────────────────────────────────

async function scheduleMay1Alerts(channelId, client, firedAlerts) {
const channel = await client.channels.fetch(channelId);

// Send morning brief immediately on startup if May 1
const now = new Date();
const et = new Date(now.toLocaleString(“en-US”, { timeZone: “America/New_York” }));
if (et.getMonth() === 4 && et.getDate() === 1) {
await channel.send({ embeds: [buildMay1BriefEmbed()] });
}

const timeAlerts = [
{
hour: 9, min: 25,
key: “may1_925”,
message: [
“⏰ **MARKET OPENS IN 5 MINUTES — MAY 1**”,
“”,
“🌕 Flower Moon peaks at **1:23 PM ET today**”,
“🔴 OTM Put setup: $710 strike | May 9 expiry”,
“📋 Order flow: Net buying declining — distribution active”,
“”,
“**DO NOT chase the open.**”,
“Wait for $715–$716 rejection OR $716+ breakout”,
“Best entry window: 9:45–10:30 AM or 1:15–1:30 PM”,
].join(”\n”),
},
{
hour: 10, min: 0,
key: “may1_1000”,
message: [
“📊 **10:00 AM CHECK — SPY ORDER FLOW**”,
“”,
“Key levels right now:”,
“🔴 $715.78 — yesterday’s high / ceiling”,
“🔴 $714.65 — premarket open / equilibrium”,
“🟢 $711.58 — yesterday’s low / support”,
“”,
“**If SPY is above $715 and stalling** → put entry zone”,
“**If SPY is below $713** → put already working, hold”,
“**If SPY broke above $716 with volume** → calls to $720”,
].join(”\n”),
},
{
hour: 11, min: 30,
key: “may1_1130”,
message: [
“⏰ **11:30 AM — MIDDAY CHECK**”,
“”,
“🌕 Flower Moon in **1 hour 53 minutes**”,
“”,
“If you are IN puts:”,
“✅ Hold — thesis is working”,
“🛑 Exit if SPY above $719”,
“”,
“If you are NOT in puts yet:”,
“⏳ Best window coming at **1:15 PM** before Moon peak”,
“Wait for the setup — don’t force it”,
].join(”\n”),
},
{
hour: 13, min: 15,
key: “may1_1315”,
message: [
“🌕 **FLOWER MOON IN 8 MINUTES — 1:15 PM ET**”,
“”,
“⚡ This is your final entry window for puts”,
“**Strike:** $710 Put | **Expiry:** May 9”,
“**Entry:** $715–$716 if SPY is still in that zone”,
“**Stop:** $719”,
“”,
“🟢 If you have calls — **EXIT NOW before 1:23 PM**”,
“Do NOT hold calls through the Flower Moon peak”,
“”,
“Watch the 1:15 PM candle — it sets up the Moon reversal”,
].join(”\n”),
},
{
hour: 13, min: 23,
key: “may1_flower_moon_peak”,
embed: buildFlowerMoonAlertEmbed(),
},
{
hour: 14, min: 0,
key: “may1_1400”,
message: [
“📊 **2:00 PM — POST FLOWER MOON CHECK**”,
“”,
“The Moon peaked 37 minutes ago.”,
“The real direction should be clear by now.”,
“”,
“**If SPY is selling off below $712:**”,
“🔴 Hold puts — thesis confirmed. Target $710 → $706”,
“”,
“**If SPY bounced above $716:**”,
“⚠️ Exit puts. Bulls won today. Wait for Monday.”,
“”,
“**Remember:** Apple earnings tonight at 5pm ET”,
“iPhone revenue $56.5B expected | Services $30B”,
“Miss on either = gap down Monday”,
].join(”\n”),
},
{
hour: 15, min: 15,
key: “may1_1515”,
message: [
“🚨 **3:15 PM — FRIDAY CLOSE APPROACHING**”,
“”,
“⚡ Take profits on any winning options NOW”,
“Weekend theta decay will kill premium over Saturday/Sunday”,
“Do NOT hold options into close unless well ITM”,
“”,
“**If puts are profitable** → close 75% minimum”,
“**If puts are at loss** → close everything”,
“Never carry OTM losers into weekend”,
“”,
“Apple earnings at 5pm — premarket Monday will gap”,
].join(”\n”),
},
{
hour: 16, min: 5,
key: “may1_eod”,
message: [
“🔔 **WEEK CLOSED — MAY 1 EOD**”,
“”,
“🌕 Flower Moon day is complete.”,
“The Scorpio revelation energy has done its work.”,
“”,
“📋 **Next week preview:**”,
“• Apple reaction Monday premarket”,
“• May historically weakest month (Sell in May)”,
“• Blue Moon coming May 31”,
“• Fed hawkish stance — no cuts coming”,
“”,
“🔢 **Next week numerology:**”,
“May 4 = Universal Day 2 (duality/decision)”,
“May 7 = Universal Day 5 (chaos/volatility)”,
“May 8 = Universal Day 6 (protection)”,
“”,
“🐻 **Jenga update:**”,
“$500B in passive ETF flows drove ATH”,
“Net buying declining since April 20”,
“Distribution phase = smart money exiting”,
“”,
“Protect profits. Stack dry powder.”,
“The blocks are loose. 🎯”,
].join(”\n”),
},
];

setInterval(async () => {
const now = new Date();
const et = new Date(now.toLocaleString(“en-US”, { timeZone: “America/New_York” }));
const h = et.getHours();
const m = et.getMinutes();
const day = et.getDate();
const month = et.getMonth();

```
// Only fire on May 1
if (month !== 4 || day !== 1) return;

for (const alert of timeAlerts) {
  if (!firedAlerts.has(alert.key) && h === alert.hour && m === alert.min) {
    if (alert.embed) {
      await channel.send({ embeds: [alert.embed] });
    } else {
      await channel.send(alert.message);
    }
    firedAlerts.add(alert.key);
    console.log(`May 1 alert fired: ${alert.key}`);
  }
}
```

}, 30 * 1000);

// Level-based alerts for May 1
setInterval(async () => {
const et = new Date(new Date().toLocaleString(“en-US”, { timeZone: “America/New_York” }));
const h = et.getHours();
const day = et.getDate();
const month = et.getMonth();
if (month !== 4 || day !== 1) return;
if (h < 9 || h >= 16) return;

```
// Would connect to live price feed here
// For now outputs level reference
```

}, 2 * 60 * 1000);
}

// ── NEW COMMANDS TO ADD TO bot.js ──────────────────────────────────────────────

/*
Add these cases to your handleCommand switch:

case “otm”:
await respond({ embeds: [buildOTMPutEmbed()] });
break;

case “moon”:
await respond({ embeds: [buildFlowerMoonAlertEmbed()] });
break;

case “may1”:
await respond({ embeds: [buildMay1BriefEmbed()] });
break;

Also add to your slash commands array:
new SlashCommandBuilder().setName(“otm”).setDescription(“OTM options setup for today”),
new SlashCommandBuilder().setName(“moon”).setDescription(“Flower Moon market impact”),
new SlashCommandBuilder().setName(“may1”).setDescription(“May 1 full day brief”),

And in client.once(“ready”):
const { scheduleMay1Alerts } = require(”./may1_alerts”);
await scheduleMay1Alerts(CHANNEL_ID, client, firedAlerts);
*/

module.exports = {
MAY1_LEVELS,
buildMay1BriefEmbed,
buildOTMPutEmbed,
buildFlowerMoonAlertEmbed,
scheduleMay1Alerts,
};
