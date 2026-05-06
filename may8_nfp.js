/**

- MAY 8 NFP DAY ALERTS — NumeroSage Discord Bot
- ================================================
- Universal Day 5 (Chaos) + Personal Day 4 (Structure)
- April NFP drops 8:30am ET
- ARM Holdings gap-up reaction
- Iran deal uncertainty
- SPY liquidity and FVG levels mapped
- 
- HOW TO ADD TO YOUR BOT:
- 1. Add this file to GitHub as may8_nfp.js
- 1. In bot.js add at top:
- const { scheduleMay8Alerts, buildNFPBriefEmbed, buildFVGLevelsEmbed } = require(”./may8_nfp”);
- 1. In handleCommand add:
- case “nfp”: await respond({ embeds: [buildNFPBriefEmbed()] }); break;
- case “fvg”: await respond({ embeds: [buildFVGLevelsEmbed()] }); break;
- case “may8”: await respond({ embeds: [buildMay8BriefEmbed()] }); break;
- 1. In slash commands array add:
- new SlashCommandBuilder().setName(“nfp”).setDescription(“NFP day setup and levels”),
- new SlashCommandBuilder().setName(“fvg”).setDescription(“Fair value gaps and liquidity levels”),
- new SlashCommandBuilder().setName(“may8”).setDescription(“May 8 full brief”),
- 1. In client.once ready add:
- const { scheduleMay8Alerts } = require(”./may8_nfp”);
- await scheduleMay8Alerts(CHANNEL_ID, client, firedAlerts);
  */

// ── MAY 8 DATA ────────────────────────────────────────────────────────────────

const MAY8_DATA = {
date: “2026-05-08”,
spy_close_may7: 737.50,
session: “NFP Day — Universal Day 5 (Chaos) + ARM gap-up reaction”,

numerology: {
universal_day: 5,
meaning: “Chaos and volatility — fast reversals, fakeouts in both directions”,
personal_day: 4,
personal_meaning: “Structure testing — stick to levels, do NOT chase”,
key_rule: “Day 5 real move comes AFTER 11am — ignore the open”,
trading_edge: “Let levels come to you. The open is manipulation. 11am is truth.”,
},

nfp: {
time: “8:30 AM ET”,
expected: “185K jobs”,
bullish_threshold: 200,
bearish_threshold: 150,
scenarios: {
strong: {
jobs: “above 200K”,
probability: “40%”,
spy_reaction: “Spike to $740–$742 liquidity zone then SELL”,
play: “Watch $740–$742 rejection → put entry → target $733 FVG”,
},
weak: {
jobs: “below 150K”,
probability: “35%”,
spy_reaction: “Flush through $733 FVG toward $728–$724”,
play: “$730 put activates → hold toward $724 target”,
},
inline: {
jobs: “160K–200K”,
probability: “25%”,
spy_reaction: “Chop between $733–$738 — no clear direction”,
play: “Stay flat — wait for Monday setup”,
},
},
},

// ── LIQUIDITY AND FVG LEVELS ──────────────────────────────────────────────

resistance_liquidity: [
{
price: 744.00,
label: “Maximum extension — liquidity grab target”,
type: “LIQUIDITY”,
alert: “🚨 SPY at $744 — MAXIMUM EXTENSION\nLate buyers being trapped here.\nThis is the highest probability PUT ENTRY of the day.\nARM gap-up exhaustion zone.\nWatch for shooting star or doji candle.”,
action: “PUT ENTRY — high conviction”,
color: 0xFF0000,
},
{
price: 742.00,
label: “Liquidity grab zone — ARM extension”,
type: “LIQUIDITY”,
alert: “🔴 SPY at $742 — LIQUIDITY GRAB ZONE\nARM gap-up extension — stops being hunted above $740.\nIf no momentum candle — rejection incoming.\nWait for first red 15min candle then enter puts.”,
action: “WATCH FOR REJECTION”,
color: 0xFF2200,
},
{
price: 740.00,
label: “Round number liquidity — psychological level”,
type: “LIQUIDITY”,
alert: “⚠️ SPY at $740 — ROUND NUMBER LIQUIDITY\nMajor psychological level — stop hunts happen here.\nStrong NFP could spike to here then reverse.\nDay 5 chaos means this level is a trap either way.”,
action: “DECISION POINT”,
color: 0xFF4400,
},
{
price: 738.00,
label: “Today’s close zone — distribution area”,
type: “RESISTANCE”,
alert: “🔴 SPY at $738 — TODAY’S CLOSE ZONE\nInstitutions sold into ARM news here.\nReclaim with volume = bullish continuation.\nFail here = distribution confirmed.”,
action: “WATCH”,
color: 0xFF6600,
},
{
price: 736.00,
label: “Premarket high zone — prior resistance”,
type: “RESISTANCE”,
alert: “🟡 SPY at $736 — PREMARKET HIGH\nPrior resistance from earlier this week.\nBreak above with volume = bulls in control.\nRejection = consolidation continues.”,
action: “MONITOR”,
color: 0xFFAA00,
},
],

support_fvg: [
{
price: 733.00,
label: “Bullish FVG — Iran deal gap”,
type: “FVG”,
alert: “🟡 SPY at $733 — BULLISH FVG TEST\nGap created by today’s Iran deal surge.\nFirst test of this FVG — expect a bounce.\nIf it bounces — bulls defending.\nIf it breaks — momentum has shifted bearish.”,
action: “FIRST BOUNCE EXPECTED”,
color: 0xFFDD00,
},
{
price: 730.00,
label: “Put strike — round number — critical level”,
type: “LIQUIDITY”,
alert: “🔴 SPY at $730 — YOUR PUT STRIKE\nMajor round number liquidity pool.\nYour $730 put breakeven zone is $723.93.\nBreak below $730 with volume = momentum shift confirmed.\nThis is the inflection point for your thesis.”,
action: “CRITICAL — MONITOR CLOSELY”,
color: 0xFF0066,
},
{
price: 728.00,
label: “FVG — May 6 consolidation”,
type: “FVG”,
alert: “💰 SPY at $728 — FVG SUPPORT TEST\nVolume node from May 6 consolidation.\nTake 50% profits on puts here.\nLet remaining 50% ride toward $724.”,
action: “TAKE 50% PUT PROFITS”,
color: 0x00CC44,
},
{
price: 724.00,
label: “Major FVG — May 5 semiconductor gap”,
type: “FVG”,
alert: “💰 SPY at $724 — MAJOR FVG HIT\nGap from May 5 semiconductor surge.\nThis is your primary put target.\nClose 75% of remaining puts here.\nOnly hold 25% for deeper move.”,
action: “TAKE 75% PUT PROFITS”,
color: 0x00AA66,
},
{
price: 720.00,
label: “Deep FVG — May 5 open gap”,
type: “FVG”,
alert: “🎯 SPY at $720 — DEEP FVG TARGET\nGap left from May 5 open.\nStrongest demand zone on the chart.\nClose ALL remaining puts here.\nThis is full thesis confirmation for the day.”,
action: “FULL PUT EXIT”,
color: 0x00CC88,
},
{
price: 716.00,
label: “Deep FVG — late April rally gap”,
type: “FVG”,
alert: “🚨 SPY at $716 — BEAR THESIS CONFIRMING\nGap from late April rally.\nIf price reaches here today — NFP was catastrophic.\nThis is your maximum profit zone on the $730 put.\nClose everything here.”,
action: “MAXIMUM PROFIT — CLOSE ALL”,
color: 0x00FFAA,
},
{
price: 712.92,
label: “Double top neckline — long term critical level”,
type: “MAJOR_SUPPORT”,
alert: “🚨🚨 SPY at $712.92 — DOUBLE TOP NECKLINE\nYour original major resistance level.\nIf SPY reaches here on NFP day — Jenga is falling.\nThis is the full bear thesis activating.\nAll puts should be closed. Reenter next week.”,
action: “FULL EXIT — REPOSITION NEXT WEEK”,
color: 0x0066FF,
},
],

// ── YOUR POSITION ──────────────────────────────────────────────────────────

position: {
instrument: “SPY $730 Put”,
expiry: “May 15”,
days_left: 7,
avg_cost: 6.07,
current_value: 4.62,
breakeven: 723.93,
spy_needs_to_fall: 13.57,
status: “OTM — needs NFP catalyst”,
max_profit_scenario: “NFP below 150K — SPY flushes to $724–$720”,
stop: “SPY closes above $742 on volume”,
},
};

// ── EMBED BUILDERS ─────────────────────────────────────────────────────────────

function buildMay8BriefEmbed() {
return {
color: 0xFF4444,
title: “🐻🔢 MAY 8 — NFP DAY BRIEF”,
description: [
`**Universal Day 5** — ${MAY8_DATA.numerology.meaning}`,
`**Personal Day 4** — ${MAY8_DATA.numerology.personal_meaning}`,
“”,
`⚠️ **Golden Rule Today:** ${MAY8_DATA.numerology.key_rule}`,
].join(”\n”),
fields: [
{
name: “📊 SPY Overnight”,
value: [
`Yesterday close: $${MAY8_DATA.spy_close_may7}`,
“ARM Holdings +23.35% after unveiling AI data center CPU”,
“Iran deal news — Axios reporting US/Iran nearing agreement”,
“S&P 500 closed at NEW ALL-TIME HIGH 7,365”,
].join(”\n”),
inline: false,
},
{
name: “📣 NFP — 8:30 AM ET”,
value: [
`Expected: **${MAY8_DATA.nfp.expected}**`,
`🔴 Below 150K = recession fear = puts activate`,
`🟢 Above 200K = spike to $740–$742 then fade`,
`🟡 160K–200K = chop = wait for Monday`,
].join(”\n”),
inline: false,
},
{
name: “🔴 Resistance / Liquidity Above”,
value: [
“$744 — Maximum extension / put entry”,
“$742 — Liquidity grab zone”,
“$740 — Round number psychological level”,
“$738 — Today’s close / distribution zone”,
“$736 — Premarket high resistance”,
].join(”\n”),
inline: false,
},
{
name: “🟢 Support / FVG Below”,
value: [
“$733 — Bullish FVG (Iran deal gap)”,
“$730 — Your put strike / round number”,
“$728 — FVG → take 50% put profits”,
“$724 — Major FVG → take 75% put profits”,
“$720 — Deep FVG → close ALL puts”,
“$716 — Late April rally gap”,
“$712.92 — Double top neckline”,
].join(”\n”),
inline: false,
},
{
name: “💼 Your $730 Put Position”,
value: [
`Expiry: ${MAY8_DATA.position.expiry} (${MAY8_DATA.position.days_left} days)`,
`Breakeven: $${MAY8_DATA.position.breakeven}`,
`SPY needs to fall: $${MAY8_DATA.position.spy_needs_to_fall}`,
`Stop: ${MAY8_DATA.position.stop}`,
`Best case: ${MAY8_DATA.position.max_profit_scenario}`,
].join(”\n”),
inline: false,
},
],
footer: { text: “NumeroSage Market Intel • Not financial advice” },
timestamp: new Date().toISOString(),
};
}

function buildFVGLevelsEmbed() {
return {
color: 0xF1C40F,
title: “📐 FVG + LIQUIDITY LEVELS — MAY 8”,
description: “Based on today’s ARM gap-up and Iran deal catalyst”,
fields: [
{
name: “🔴 LIQUIDITY ABOVE (Sell zones)”,
value: [
“**$744** — Max extension / HIGH CONVICTION put entry”,
“**$742** — Liquidity grab / ARM exhaustion”,
“**$740** — Round number / stop hunt zone”,
“**$738** — Distribution zone (today’s close)”,
“**$736** — Premarket high resistance”,
].join(”\n”),
inline: false,
},
{
name: “🟢 FVG BELOW (Buy zones / put profit targets)”,
value: [
“**$733** — Bullish FVG — Iran deal gap (first bounce)”,
“**$730** — Round number liquidity / put strike”,
“**$728** — FVG May 6 — take 50% profits”,
“**$724** — Major FVG May 5 — take 75% profits”,
“**$720** — Deep FVG May 5 open — close all”,
“**$716** — Late April rally gap”,
“**$712.92** — Double top neckline — full exit”,
].join(”\n”),
inline: false,
},
{
name: “⚡ FVG Rules”,
value: [
“1️⃣ FVGs act as magnets — price wants to fill them”,
“2️⃣ First touch of FVG = expect bounce”,
“3️⃣ If FVG breaks with volume = next FVG is target”,
“4️⃣ Never hold through FVG support on 0DTE”,
“5️⃣ Take profits AT the FVG — not after it”,
].join(”\n”),
inline: false,
},
{
name: “🔢 Numerology Edge”,
value: [
“Day 5 = fast moves, fakeouts, chaos”,
“Real direction reveals AFTER 11am ET”,
“Personal Day 4 = stick to structure”,
“Do NOT trade the first 30 minutes”,
].join(”\n”),
inline: false,
},
],
footer: { text: “NumeroSage Market Intel • Not financial advice” },
timestamp: new Date().toISOString(),
};
}

function buildNFPBriefEmbed() {
const nfp = MAY8_DATA.nfp;
return {
color: 0xFF8C00,
title: “📣 NFP SETUP — APRIL JOBS REPORT”,
description: `Dropping **8:30 AM ET** today | Expected: **${nfp.expected}**`,
fields: [
{
name: “🔴 Weak NFP — below 150K (35% probability)”,
value: [
`Reaction: ${nfp.scenarios.weak.spy_reaction}`,
`Play: ${nfp.scenarios.weak.play}`,
].join(”\n”),
inline: false,
},
{
name: “🟢 Strong NFP — above 200K (40% probability)”,
value: [
`Reaction: ${nfp.scenarios.strong.spy_reaction}`,
`Play: ${nfp.scenarios.strong.play}`,
].join(”\n”),
inline: false,
},
{
name: “🟡 In-line NFP — 160K–200K (25% probability)”,
value: [
`Reaction: ${nfp.scenarios.inline.spy_reaction}`,
`Play: ${nfp.scenarios.inline.play}`,
].join(”\n”),
inline: false,
},
{
name: “⚠️ NFP Trading Rules”,
value: [
“Never enter options at 8:30am — wait for spike”,
“Let price reach a FVG or liquidity level first”,
“Confirm direction with 5min candle close”,
“Day 5 means the real move comes after 11am”,
“Exit ALL options by 3:15pm — no exceptions”,
].join(”\n”),
inline: false,
},
],
footer: { text: “NumeroSage Market Intel • Not financial advice” },
timestamp: new Date().toISOString(),
};
}

function buildScenarioEmbed(scenario) {
const s = MAY8_DATA.nfp.scenarios[scenario];
const colors = { strong: 0x00CC44, weak: 0xFF4444, inline: 0xFFAA00 };
const emojis = { strong: “🟢”, weak: “🔴”, inline: “🟡” };
return {
color: colors[scenario],
title: `${emojis[scenario]} NFP ${scenario.toUpperCase()} SCENARIO ACTIVE`,
fields: [
{ name: “Jobs”, value: s.jobs, inline: true },
{ name: “Probability”, value: s.probability, inline: true },
{ name: “SPY Reaction”, value: s.spy_reaction, inline: false },
{ name: “Your Play”, value: s.play, inline: false },
],
footer: { text: “NumeroSage Market Intel • Not financial advice” },
timestamp: new Date().toISOString(),
};
}

// ── TIME-BASED ALERT SCHEDULER ─────────────────────────────────────────────────

async function scheduleMay8Alerts(channelId, client, firedAlerts) {
const channel = await client.channels.fetch(channelId);

// Send morning brief if May 8
const et = new Date(new Date().toLocaleString(“en-US”, { timeZone: “America/New_York” }));
if (et.getMonth() === 4 && et.getDate() === 8) {
await channel.send({ embeds: [buildMay8BriefEmbed()] });
console.log(“May 8 NFP brief sent”);
}

const timeAlerts = [
{
hour: 8, min: 20, day: 8,
key: “may8_820”,
message: [
“⏰ **NFP IN 10 MINUTES — 8:20 AM ET**”,
“”,
“🔢 Universal Day **5** — chaos and volatility”,
“Personal Day **4** — stick to your levels”,
“”,
“**DO NOT enter any options yet.**”,
“Wait for the spike to hit a level then confirm”,
“”,
“Key levels to watch:”,
“🔴 Spike UP → $740–$742 = put entry”,
“🔴 Spike DOWN → $733 FVG = first bounce”,
“”,
`Your $730 put needs SPY below $723.93`,
`${MAY8_DATA.position.days_left} days left on expiry`,
].join(”\n”),
},
{
hour: 8, min: 30, day: 8,
key: “may8_nfp_drop”,
message: [
“🚨 **NFP DROPPING NOW — 8:30 AM ET**”,
“”,
“Watch the number carefully:”,
“🔴 Below 150K → flush incoming → puts activate”,
“🟢 Above 200K → spike to $740–$742 → fade the spike”,
“🟡 160K–200K → chop → wait for 11am”,
“”,
“**DO NOT trade the first candle.**”,
“Wait for price to reach a FVG or liquidity level”,
“Confirm with a 5-minute candle close”,
“”,
“Real move comes after 11am on Day 5 energy”,
].join(”\n”),
},
{
hour: 9, min: 25, day: 8,
key: “may8_925”,
message: [
“⏰ **MARKET OPENS IN 5 MIN — MAY 8**”,
“”,
“NFP reaction is priced in. Now watch the open.”,
“”,
“**If SPY opens above $738:**”,
“Wait for $740–$742 rejection → put entry”,
“”,
“**If SPY opens between $733–$738:**”,
“Neutral zone — wait for 10am direction”,
“”,
“**If SPY opens below $733:**”,
“$733 FVG being tested — watch for bounce or break”,
“Break below $730 = puts activate fully”,
“”,
“🔢 Day 5 rule: First 30 min = manipulation. Wait.”,
].join(”\n”),
},
{
hour: 10, min: 0, day: 8,
key: “may8_1000”,
message: [
“📊 **10:00 AM CHECK — MAY 8**”,
“”,
“30 minutes of manipulation complete.”,
“Real direction starting to emerge.”,
“”,
“**FVG + Liquidity status:**”,
“Above $738 → distribution zone → puts”,
“At $733 → FVG test → decision point”,
“Below $730 → momentum shifted bearish”,
“Below $728 → take 50% put profits”,
“”,
“**Your $730 put breakeven: $723.93**”,
“SPY needs to fall $13.57 in 7 days”,
“Iran deal uncertainty = wildcard this weekend”,
].join(”\n”),
},
{
hour: 11, min: 0, day: 8,
key: “may8_1100”,
message: [
“⚡ **11:00 AM — DAY 5 REAL MOVE BEGINS**”,
“”,
“🔢 Universal Day 5 energy peaks now.”,
“The real direction is revealing itself.”,
“”,
“**If SPY is BELOW $733:**”,
“Bear thesis activating — hold puts”,
“Next target: $728 FVG (take 50% there)”,
“”,
“**If SPY is ABOVE $738:**”,
“Bulls still in control — be patient”,
“Wait for $740–$742 before entering puts”,
“”,
“**If SPY is between $733–$738:**”,
“Chop mode — reduce size, wait for Monday”,
“”,
“Personal Day 4 energy: Trust structure over instinct”,
].join(”\n”),
},
{
hour: 12, min: 0, day: 8,
key: “may8_1200”,
message: [
“🕐 **NOON CHECK — MAY 8**”,
“”,
“Iran deal status — check latest headlines”,
“If deal confirmed → SPY may gap up Monday”,
“If deal collapses → SPY gaps DOWN Monday”,
“”,
“**FVG profit targets if puts are working:**”,
“💰 $728 → take 50% profits NOW”,
“💰 $724 → take 75% profits”,
“💰 $720 → close ALL puts”,
“”,
“**Do NOT hold puts over weekend if:**”,
“• SPY is above your entry price”,
“• Iran deal looks confirmed”,
“• Position is underwater with no momentum”,
].join(”\n”),
},
{
hour: 14, min: 0, day: 8,
key: “may8_1400”,
message: [
“⏰ **2:00 PM — FRIDAY FINAL STRETCH**”,
“”,
“90 minutes until close.”,
“”,
“**Decision time on your $730 put:**”,
“”,
“If puts are PROFITABLE (SPY below $730):”,
“✅ Hold until 3pm then close 75%”,
“Keep 25% for Monday gap down if Iran deal fails”,
“”,
“If puts are AT LOSS (SPY above $733):”,
“⚠️ Exit now — don’t hold losers into weekend”,
“Weekend theta + potential Iran deal gap up = danger”,
“”,
“If puts are BREAKEVEN ($730–$733):”,
“🤔 Your call — Iran deal uncertainty is the wildcard”,
].join(”\n”),
},
{
hour: 15, min: 15, day: 8,
key: “may8_1515”,
message: [
“🚨 **3:15 PM — MANDATORY FRIDAY EXIT**”,
“”,
“Close ALL options positions NOW.”,
“”,
“Rules for weekend holds:”,
“✅ ONLY hold puts if SPY is BELOW $726 (ITM)”,
“✅ ONLY hold if Iran deal is NOT confirmed”,
“❌ Do NOT hold OTM puts over weekend”,
“❌ Do NOT hold if Iran deal looks done”,
“”,
“Weekend theta decay + potential Monday gap up”,
“will destroy OTM put premium”,
“”,
“🔢 Personal Day 4 energy says protect structure”,
“Don’t let a good thesis become a bad trade”,
].join(”\n”),
},
{
hour: 16, min: 5, day: 8,
key: “may8_eod”,
message: [
“🔔 **WEEK CLOSED — MAY 8 EOD**”,
“”,
“NFP week is complete.”,
“ARM Holdings, AMD, PLTR all reported.”,
“The AI earnings wave has peaked for this cycle.”,
“”,
“📋 **Weekend watch:**”,
“• Iran deal — confirmed or collapsed?”,
“• Any military escalation over weekend”,
“• Oil price Monday premarket”,
“• Any Fed speaker comments”,
“”,
“📅 **Next week setup:**”,
“May 11 = Universal Day 8 (power + financial reckoning)”,
“May 12 = Personal Day 5 (volatility)”,
“May 15 = Your $730 put EXPIRES”,
“May 16 = New Supermoon in Taurus”,
“”,
“🔢 **Taurus/Gemini transition May 20:**”,
“When Sun moves from Taurus → Gemini”,
“Markets shift from slow grind to fast volatile moves”,
“Your deep put thesis accelerates post May 20”,
“”,
“🐻 Protect profits. Stack dry powder.”,
“The Jenga blocks are still loose.”,
].join(”\n”),
},
];

// Level-based real-time alerts
const levelAlerts = [
…MAY8_DATA.resistance_liquidity.map(level => ({
price: level.price,
direction: “above”,
key: `may8_res_${level.price}`,
message: level.alert,
action: level.action,
color: level.color,
label: level.label,
})),
…MAY8_DATA.support_fvg.map(level => ({
price: level.price,
direction: “below”,
key: `may8_sup_${level.price}`,
message: level.alert,
action: level.action,
color: level.color,
label: level.label,
})),
];

let lastPrice = null;

// Price monitoring interval
const priceMonitor = setInterval(async () => {
const now = new Date();
const et = new Date(now.toLocaleString(“en-US”, { timeZone: “America/New_York” }));
const month = et.getMonth();
const day = et.getDate();
const h = et.getHours();

```
if (month !== 4 || day !== 8) return;
if (h < 8 || h >= 16) return;

// Fetch live price
let currentPrice = null;
try {
  const res = await fetch(
    "https://query1.finance.yahoo.com/v8/finance/chart/SPY?interval=1m&range=1d",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  const data = await res.json();
  currentPrice = parseFloat(data.chart.result[0].meta.regularMarketPrice);
} catch (e) {
  console.error("Price fetch error:", e.message);
  return;
}

if (!currentPrice) return;

// Check level alerts
for (const alert of levelAlerts) {
  if (firedAlerts.has(alert.key)) continue;

  const triggered =
    (alert.direction === "above" && lastPrice && lastPrice < alert.price && currentPrice >= alert.price) ||
    (alert.direction === "below" && lastPrice && lastPrice > alert.price && currentPrice <= alert.price);

  if (triggered) {
    const embed = {
      color: alert.color,
      title: `${alert.direction === "above" ? "🔴" : "🟢"} LEVEL HIT — $${alert.price}`,
      description: alert.message,
      fields: [
        { name: "Level", value: alert.label, inline: true },
        { name: "SPY Price", value: `$${currentPrice.toFixed(2)}`, inline: true },
        { name: "Action", value: alert.action, inline: true },
      ],
      footer: { text: "NumeroSage Market Intel • Not financial advice" },
      timestamp: new Date().toISOString(),
    };
    await channel.send({ embeds: [embed] });
    firedAlerts.add(alert.key);
    console.log(`May 8 level alert fired: $${alert.price} ${alert.direction}`);
  }
}

lastPrice = currentPrice;
```

}, 60 * 1000); // every 60 seconds

// Time alert scheduler
const timeScheduler = setInterval(async () => {
const now = new Date();
const et = new Date(now.toLocaleString(“en-US”, { timeZone: “America/New_York” }));
const h = et.getHours();
const m = et.getMinutes();
const day = et.getDate();
const month = et.getMonth();

```
if (month !== 4 || day !== 8) return;

for (const alert of timeAlerts) {
  if (
    !firedAlerts.has(alert.key) &&
    h === alert.hour &&
    m === alert.min &&
    day === alert.day
  ) {
    if (alert.embed) {
      await channel.send({ embeds: [alert.embed] });
    } else {
      await channel.send(alert.message);
    }
    firedAlerts.add(alert.key);
    console.log(`May 8 time alert fired: ${alert.key}`);
  }
}
```

}, 30 * 1000);

console.log(“May 8 NFP alert scheduler running”);
}

// ── EXPORTS ────────────────────────────────────────────────────────────────────

module.exports = {
MAY8_DATA,
buildMay8BriefEmbed,
buildFVGLevelsEmbed,
buildNFPBriefEmbed,
buildScenarioEmbed,
scheduleMay8Alerts,
};
