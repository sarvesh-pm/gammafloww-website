# GammaFloww Blog Engine — Playbook & Editorial Calendar

**Cadence:** 4 posts / week. **Primary goal:** B2B pipeline (partners who launch a branded derivatives exchange), not retail-trader traffic.
**Publishing:** one `.mdx` file per post in `content/blog/` (filename = slug). Auto-lists, sitemaps, and statically generates — no code changes. Charts/citations live in `src/lib/blogData.ts`.

> **Baseline as of 2026-07-28: 40 posts already live.** The blog is mature. New topics must be checked against the coverage map (Section 4) — several obvious ideas (Singapore, Hong Kong, US/CFTC, insurance funds, market making, custody) are **already written**.

---

## 1. The repeatable weekly process

### Step 1 — Topic sourcing
Ideas come from, in priority order:
1. **The backlog** (Section 3) — pre-prioritized, buyer-first.
2. **Gap analysis** — check the coverage map (Section 4) so we never duplicate; keep the four clusters balanced.
3. **SERP mining** — Google autocomplete, "People also ask", "Related searches"; operator questions on Reddit / forums / LinkedIn.
4. **Search Console (once indexed)** — queries where we rank positions 5–20 ("striking distance") → expand or refresh.
5. **Competitor gaps** — topics B2Broker, Codono, BTSE Solutions, Finance Magnates rank for that we don't.

### Step 2 — Keyword + volume assessment (Ahrefs-free)
> We do **not** use Ahrefs for GammaFloww. Volume/difficulty is triangulated from live SERP research + editorial judgment; Google Search Console is the real signal once the site has data.

For each candidate:
- Pick **one primary keyword** + 2–3 secondary / long-tail variants.
- Estimate a **volume band** (High / Med / Low) and **difficulty** from the SERP: who ranks (domain strength), how deep their content is, SERP features present.
- **Prioritize intent over raw volume.** A low-volume, high-intent buyer term ("ADGM crypto license") beats a high-volume retail term for our goal.
- **Score = Intent (buyer > trader) × Winnability (can we realistically rank) × Product fit.**

### Step 3 — Write-to-rank (our differentiation)
- **Answer first.** Resolve the query in the first 2–3 sentences (featured-snippet friendly), then go deep.
- **Match intent & format** — definition, how-to guide, comparison, or listicle — to what already ranks.
- **Original, cited data is our moat.** Every factual claim is sourced to a primary regulator/exchange via `<SourceList>`. Use `<BarChart>` for proprietary framing of numbers and the interactive calculators (`<LiquidationCalculator>`, `<FundingCalculator>`, `<SlippageCalculator>`, `<RevenueEstimator>`) where relevant — they drive dwell time, links, and differentiation Google rewards.
- **Structure for scanning** — H2/H3 with keyword variants, tables, bullets, a bolded takeaway.
- **E-E-A-T** — `author: GammaFloww Team`; a "not legal/financial advice" disclaimer on regulation/trading posts; `date` + `updated`.
- **Internal linking** — link each new post to 2–4 related posts (hub-and-spoke within its cluster) and to the demo CTA.
- **On-page SEO** — `title` ≤ ~60 chars with the keyword; `description` ~150 chars; slug = keyword; one H1 (the title); descriptive link text.
- **Length** — match the SERP: most posts 700–1,400 words; pillar guides 1,800–2,500. (House style is tight and heavily cited — see any existing post.)

### Step 4 — Publish & measure
1. Add the `.mdx` file (+ any `blogData.ts` chart/source entries) → commit → Vercel auto-deploys.
2. In Search Console: confirm the URL is in `sitemap.xml`; request indexing.
3. After 3–4 weeks: review impressions/position; refresh underperformers (bump `updated:`), expand striking-distance posts.

### Step 5 — Cadence ops
- **Weekly:** deliver 4 publish-ready drafts → review → merge.
- **Monthly:** review Search Console, reprioritize the backlog, schedule refreshes of older posts.

---

## 2. Cluster taxonomy (keep balanced)
| Cluster | Reader | Role | Current count |
|---|---|---|---|
| **Launch & Buy** | Prospective buyer, evaluating | Bottom-funnel, highest conversion | 11 |
| **Regulation & Compliance** | Buyer choosing a jurisdiction | High-intent, low-competition, geo-specific | 9 |
| **Operator Playbook** | Operator running/scaling a venue | Mid-funnel authority + retention | 12 |
| **Trader Education** | End traders | Top-funnel traffic & brand (deprioritized) | 8 |

---

## 3. Editorial calendar (4 weeks · buyer-first · de-duplicated against the 40 live posts)

Geo priority: **UAE/Middle East, Southeast Asia, Global.** (India deprioritized per current direction.)

### Week 1 — Geo licensing (biggest open buyer lane)
| # | Working title | Primary keyword | Cluster | Geo | Vol / Diff |
|---|---|---|---|---|---|
| 1 | Abu Dhabi's ADGM/FSRA crypto framework (vs. Dubai's VARA) | ADGM crypto license | Regulation | UAE | Low / Low |
| 2 | Offshore crypto derivatives licensing: options & trade-offs | offshore crypto exchange license | Regulation | Global | Med / Med |
| 3 | The UK, the FCA and crypto derivatives (the retail ban) | uk crypto derivatives regulation | Regulation | Global | Med / Med |
| 4 | Malaysia's SC framework for a digital-asset exchange | malaysia crypto exchange license | Regulation | SEA | Low / Low |

### Week 2 — Operator playbook (buyer-relevant ops gaps)
| # | Working title | Primary keyword | Cluster |
|---|---|---|---|
| 5 | Fiat on/off-ramps & payment rails for your exchange | crypto exchange fiat on ramp | Operator Playbook |
| 6 | Referral, affiliate & IB programs for a new exchange | crypto exchange affiliate program | Operator Playbook |
| 7 | Integrating your exchange: REST & WebSocket APIs | crypto exchange api integration | Operator Playbook |
| 8 | Listing tokens & adding trading pairs on your venue | how to list a token on an exchange | Operator Playbook |

### Week 3 — Bottom-funnel Launch & Buy (commercial)
| # | Working title | Primary keyword | Cluster | Notes |
|---|---|---|---|---|
| 9 | Best white-label crypto derivatives providers (2026) | white label crypto derivatives providers | Launch & Buy | Listicle incl. GammaFloww — **needs sign-off** on self-inclusion |
| 10 | Crypto broker vs. exchange: which model to launch | crypto broker vs exchange | Launch & Buy | |
| 11 | Proof of reserves & exchange transparency | proof of reserves crypto exchange | Launch & Buy | |
| 12 | Crypto derivatives exchange software: a features checklist | crypto derivatives exchange software | Launch & Buy | |

### Week 4 — More geo + fills
| # | Working title | Primary keyword | Cluster | Geo |
|---|---|---|---|---|
| 13 | Australia (ASIC) and crypto derivatives | australia crypto derivatives regulation | Regulation | Global/APAC |
| 14 | Japan's FSA/JVCEA crypto exchange regime | japan crypto exchange license | Regulation | SEA-adjacent |
| 15 | VARA vs. ADGM: choosing your UAE regulator | vara vs adgm | Regulation | UAE |
| 16 | Long vs. short & PnL on perpetuals (trader fill) | long vs short crypto | Trader Education | — |

> Beyond Week 4, refresh the highest-impression older posts and mine Search Console striking-distance data for net-new topics.

---

## 4. Coverage map — the 40 live posts (do NOT duplicate)

**Launch & Buy (11):** cost-to-launch · launch-timeline · provider-checklist · how-to-launch-derivatives-exchange · perp-dex-vs-centralized · perps-vs-options-vs-dated · spot-vs-derivatives-which-first · white-label-complete-guide · white-label-pricing-models · vendor-due-diligence · white-label-vs-building

**Regulation & Compliance (9):** global-licensing-guide · travel-rule · hong-kong-sfc-vatp · kyc-aml · mica-casp · singapore-mas · us-perpetual-futures-cftc · uae-vara · stablecoin-regulation

**Operator Playbook (12):** custody-models · liquidity-cold-start · uptime-latency-sla · go-to-market · how-exchanges-make-money · matching-engine · insurance-fund-and-adl · maker-taker-fees · mark-price-index-oracles · market-making-internal-vs-external · market-surveillance-wash-trading · risk-and-liquidation-engines

**Trader Education (8):** contango-backwardation-basis · leverage-explained · order-types · funding-rates · liquidation-price-calc · isolated-vs-cross-margin · perpetuals-on-tokenized-stocks-rwa · what-are-perpetual-futures
