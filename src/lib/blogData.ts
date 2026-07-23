// Central, auditable home for every sourced data point used in the blog.
// Charts and source lists are referenced from MDX by string id.

export type Bar = {
  label: string;
  value: number;
  display?: string;
  tone?: "brand" | "cyan" | "up" | "down" | "muted";
};

export type ChartData = {
  title?: string;
  data: Bar[];
  source?: string;
  sourceHref?: string;
  asOf?: string;
};

export type Source = { label: string; href: string; publisher?: string };

export const charts: Record<string, ChartData> = {
  "derivatives-vs-spot": {
    title: "Centralized-exchange trading volume: derivatives vs. spot",
    data: [
      { label: "Derivatives", value: 76.5, display: "76.5%", tone: "brand" },
      { label: "Spot", value: 23.5, display: "23.5%", tone: "muted" },
    ],
    source: "CCData Exchange Review",
    sourceHref: "https://data.coindesk.com/reports/exchange-review-march-2026",
    asOf: "March 2026",
  },
  "binance-fee-comparison": {
    title: "Binance standard-tier fees: spot vs. USDⓈ-M futures",
    data: [
      { label: "Spot maker", value: 0.1, display: "0.10%", tone: "cyan" },
      { label: "Spot taker", value: 0.1, display: "0.10%", tone: "cyan" },
      { label: "Futures maker", value: 0.02, display: "0.02%", tone: "brand" },
      { label: "Futures taker", value: 0.04, display: "0.04%", tone: "brand" },
    ],
    source: "Binance fee schedules (spot & USDⓈ-M futures)",
    sourceHref: "https://www.binance.com/en/fee/futureFee",
    asOf: "2026",
  },
  "mica-capital-tiers": {
    title: "MiCA CASP minimum capital by class (Annex IV)",
    data: [
      { label: "Class 1 (advice, execution)", value: 50, display: "€50k", tone: "cyan" },
      { label: "Class 2 (exchange, custody)", value: 125, display: "€125k", tone: "brand" },
      { label: "Class 3 (trading platform)", value: 150, display: "€150k", tone: "brand" },
    ],
    source: "ESMA — MiCA minimum capital requirements",
    sourceHref:
      "https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/minimum-capital-requirements-crypto-asset",
    asOf: "2026",
  },
  "vara-capital-by-category": {
    title: "VARA minimum paid-up capital by licence category (indicative, AED)",
    data: [
      { label: "Advisory", value: 0.5, display: "0.5M", tone: "cyan" },
      { label: "Broker-dealer", value: 1.5, display: "1.5M", tone: "brand" },
      { label: "Custody", value: 1.5, display: "1.5M", tone: "brand" },
      { label: "Exchange", value: 5, display: "5M", tone: "brand" },
    ],
    source: "VARA Company Rulebook (verify current figures with VARA)",
    sourceHref: "https://www.vara.ae/en/licenses-and-register/licence-applications/",
    asOf: "2026",
  },
  "time-to-launch": {
    title: "Time to launch: white-label vs. building from scratch",
    data: [
      { label: "White-label", value: 6, display: "4–8 wks", tone: "brand" },
      { label: "Build from scratch", value: 65, display: "12–18 mo", tone: "muted" },
    ],
    source: "Industry build-vs-buy analyses (indicative)",
    sourceHref: "https://codono.com/blog/white-label-crypto-exchange-vs-custom-build",
    asOf: "2026",
  },
  "perps-volume-growth": {
    title: "Monthly crypto perpetual-futures volume",
    data: [
      { label: "Jan 2024", value: 4.14, display: "$4.14T", tone: "muted" },
      { label: "Jan 2026", value: 7.24, display: "$7.24T", tone: "brand" },
    ],
    source: "Datawallet — Crypto Perpetual Futures Statistics",
    sourceHref: "https://www.datawallet.com/crypto/crypto-perpetual-futures-statistics",
    asOf: "January 2026",
  },
  "perp-dex-growth": {
    title: "Perp DEX share of total perpetuals volume",
    data: [
      { label: "Jan 2024", value: 2.0, display: "2.0%", tone: "muted" },
      { label: "Jan 2026", value: 10.2, display: "10.2%", tone: "brand" },
    ],
    source: "Datawallet — Crypto Perpetual Futures Statistics",
    sourceHref: "https://www.datawallet.com/crypto/crypto-perpetual-futures-statistics",
    asOf: "January 2026",
  },
  "tokenization-growth": {
    title: "Tokenized real-world-asset market size (projected)",
    data: [
      { label: "2025", value: 2.08, display: "$2.08T", tone: "muted" },
      { label: "2026", value: 3.01, display: "$3.01T", tone: "brand" },
      { label: "2031", value: 18.74, display: "$18.74T", tone: "cyan" },
    ],
    source: "Blockonomi — White-Label Crypto Exchanges: Market Data and Trends 2026",
    sourceHref: "https://blockonomi.com/the-review-of-white-label-crypto-exchanges-market-data-and-trends-2026/",
    asOf: "2026 (projected)",
  },
};

export const sourceSets: Record<string, Source[]> = {
  "hong-kong-sfc-vatp-crypto-derivatives": [
    {
      label: "The Full List of Licensed Crypto Exchanges in Hong Kong (2026)",
      href: "https://fintechnews.hk/licensed-crypto-exchanges-hong-kong/",
      publisher: "Fintech Hong Kong",
    },
    {
      label: "Hong Kong VASP Licensing Regime (SFO + AMLO; Type 1 & Type 7)",
      href: "https://cryptoslate.com/crypto-laws/hong-kong-vasp-licensing-regime/",
      publisher: "CryptoSlate",
    },
    {
      label: "Hong Kong regulators target 2026 legislation for VA dealer and custodian rules",
      href: "https://www.coindesk.com/policy/2025/12/25/hong-kong-regulators-target-2026-legislation-for-virtual-asset-dealer-and-custodian-rules",
      publisher: "CoinDesk",
    },
  ],
  "stablecoin-regulation-crypto-exchanges": [
    {
      label: "Stablecoin Regulation Updates 2026: GENIUS Act, MiCA Enforcement",
      href: "https://www.kucoin.com/blog/en-stablecoin-regulation-updates-2026-genius-act-mica-enforcement-global-compliance-trends",
      publisher: "KuCoin",
    },
    {
      label: "Global Stablecoin Compliance: GENIUS Act, MiCA, Hong Kong, Singapore",
      href: "https://sumsub.com/blog/global-stablecoin-compliance-guide/",
      publisher: "Sumsub",
    },
    {
      label: "Global stablecoin regulations 2026: What enterprises need to know",
      href: "https://bvnk.com/blog/global-stablecoin-regulations-2026",
      publisher: "BVNK",
    },
  ],
  "crypto-travel-rule-compliance": [
    {
      label: "Crypto Travel Rule: 2026 VASP Compliance Guide (thresholds, coverage)",
      href: "https://www.blockchain-council.org/cryptocurrency/crypto-travel-rule-vasp-compliance-2026/",
      publisher: "Blockchain Council",
    },
    {
      label: "Crypto Travel Rule Explained: FATF Requirements for VASPs",
      href: "https://sumsub.com/blog/what-is-the-fatf-travel-rule/",
      publisher: "Sumsub",
    },
  ],
  "market-surveillance-wash-trading": [
    {
      label: "DOJ sting exposes crypto wash trading 'far more common than expected'",
      href: "https://www.coindesk.com/business/2026/04/02/doj-sting-exposes-crypto-wash-trading-continues-to-be-far-more-common-than-expected",
      publisher: "CoinDesk",
    },
    {
      label: "How market surveillance solutions help prevent crypto price manipulation",
      href: "https://www.kaiko.com/resources/how-market-surveillance-solutions-can-help-regulators-prevent-crypto-price-manipulation",
      publisher: "Kaiko",
    },
    {
      label: "Crypto Wash Trading: Detection Challenges and Prevention Strategies",
      href: "https://www.nasdaq.com/articles/fintech/crypto-wash-trading-why-its-still-flying-under-the-radar-and-what-institutions-can-do-about-it",
      publisher: "Nasdaq",
    },
  ],
  "perpetuals-on-tokenized-stocks-rwa": [
    {
      label: "White-Label Crypto Exchanges: Market Data and Trends 2026 (tokenization market size)",
      href: "https://blockonomi.com/the-review-of-white-label-crypto-exchanges-market-data-and-trends-2026/",
      publisher: "Blockonomi",
    },
    {
      label: "Institutional Adoption of Crypto: 2026 Trends & Analysis",
      href: "https://b2broker.com/news/institutional-adoption-of-crypto/",
      publisher: "B2Broker",
    },
  ],
  "spot-vs-derivatives-exchange-which-first": [
    {
      label: "Exchange Review, March 2026 (derivatives = 76.5% of CEX volume)",
      href: "https://data.coindesk.com/reports/exchange-review-march-2026",
      publisher: "CCData",
    },
    {
      label: "White-Label Crypto Exchanges: Market Data and Trends 2026 (spot ≈ 62.6% of demand)",
      href: "https://blockonomi.com/the-review-of-white-label-crypto-exchanges-market-data-and-trends-2026/",
      publisher: "Blockonomi",
    },
  ],
  "white-label-exchange-vendor-due-diligence": [
    {
      label: "Top White Label Crypto Exchange Providers of 2026",
      href: "https://www.financemagnates.com/cryptocurrency/top-white-label-crypto-exchange-providers-of-2026/",
      publisher: "Finance Magnates",
    },
  ],
  "insurance-fund-and-auto-deleveraging": [
    {
      label: "Auto-Deleveraging (ADL): How It Can Liquidate You Even When You're Winning",
      href: "https://www.ccn.com/education/crypto/auto-deleveraging-adl-crypto-liquidate-winning-traders/",
      publisher: "CCN",
    },
    {
      label: "Auto-Deleveraging (ADL) Explained (insurance fund & ADL queue)",
      href: "https://www.datawallet.com/crypto/auto-deleveraging-explained",
      publisher: "Datawallet",
    },
    {
      label: "Auto-Deleveraging (ADL) Mechanism",
      href: "https://www.bybit.com/en/help-center/article/Auto-Deleveraging-ADL",
      publisher: "Bybit",
    },
  ],
  "crypto-exchange-custody-models": [
    {
      label: "Crypto Custody Solutions: Complete 2026 Guide (MPC, hybrid gold standard)",
      href: "https://www.cobo.com/post/crypto-custody-solutions-complete-guide",
      publisher: "Cobo",
    },
    {
      label: "Qualified Custodian for Crypto: SEC Requirements Guide 2026",
      href: "https://www.cobo.com/post/qualified-custodian-crypto-guide",
      publisher: "Cobo",
    },
    {
      label: "Multi-Sig and MPC in Enterprise Crypto Custody in 2026",
      href: "https://www.chainup.com/blog/multi-sig-mpc-enterprise-crypto-custody-2026/",
      publisher: "ChainUp",
    },
  ],
  "singapore-mas-crypto-derivatives-license": [
    {
      label: "MAS Clarifies Regulatory Regime for Digital Token Service Providers",
      href: "https://www.mas.gov.sg/news/media-releases/2025/mas-clarifies-regulatory-regime-for-digital-token-service-providers",
      publisher: "Monetary Authority of Singapore",
    },
    {
      label: "Blockchain & Cryptocurrency Laws 2026 — Singapore (derivatives under the SFA)",
      href: "https://www.globallegalinsights.com/practice-areas/blockchain-cryptocurrency-laws-and-regulations/singapore/",
      publisher: "Global Legal Insights",
    },
    {
      label: "Singapore Crypto Regulations 2025: MAS DTSP License Guide",
      href: "https://phemex.com/academy/singapore-crypto-regulations-2025-MAS-DTSP",
      publisher: "Phemex",
    },
  ],
  "us-perpetual-futures-cftc-regulation": [
    {
      label: "Trading in perpetual futures hit $1 billion on Kalshi in the first week",
      href: "https://www.fool.com/investing/2026/07/02/trading-in-perpetual-futures-hit-1-billion-on-kals/",
      publisher: "The Motley Fool",
    },
    {
      label: "Crypto firms prepare to launch US perpetual futures before rule change",
      href: "https://www.tradingview.com/news/invezz:b20da6fdc094b:0-crypto-firms-prepare-to-launch-us-perpetual-futures-before-rule-change/",
      publisher: "TradingView / Invezz",
    },
    {
      label: "Crypto Perpetual Futures Statistics & Trends (perps = 78% of derivatives volume)",
      href: "https://www.datawallet.com/crypto/crypto-perpetual-futures-statistics",
      publisher: "Datawallet",
    },
  ],
  "perp-dex-vs-centralized-perpetuals": [
    {
      label: "Crypto Perpetual Futures Statistics (perp DEX volume & share growth)",
      href: "https://www.datawallet.com/crypto/crypto-perpetual-futures-statistics",
      publisher: "Datawallet",
    },
    {
      label: "Decentralized Perpetual Exchanges & Crypto Growth 2026",
      href: "https://www.nadcab.com/blog/crypto-derivatives-perpetual-dex-growth",
      publisher: "Nadcab Labs",
    },
    {
      label: "Onchain Perpetuals Top $1T Monthly Volume",
      href: "https://finance.yahoo.com/news/onchain-perpetuals-top-1t-monthly-101628280.html",
      publisher: "CoinDesk via Yahoo Finance",
    },
  ],
  "white-label-exchange-pricing-models": [
    {
      label: "The Review of White-Label Crypto Exchanges: Market Data and Trends 2026",
      href: "https://blockonomi.com/the-review-of-white-label-crypto-exchanges-market-data-and-trends-2026/",
      publisher: "Blockonomi",
    },
    {
      label: "Top White Label Crypto Exchange Providers of 2026",
      href: "https://www.financemagnates.com/cryptocurrency/top-white-label-crypto-exchange-providers-of-2026/",
      publisher: "Finance Magnates",
    },
  ],
  "how-crypto-exchanges-make-money": [
    {
      label: "Exchange Review, March 2026 (derivatives = 76.5% of CEX volume)",
      href: "https://data.coindesk.com/reports/exchange-review-march-2026",
      publisher: "CCData",
    },
    {
      label: "2025 Annual Crypto Report (Q4 2025 perpetuals volume)",
      href: "https://www.coingecko.com/research/publications/2025-annual-crypto-report",
      publisher: "CoinGecko",
    },
    {
      label: "Trading fee schedule (standard spot 0.10%)",
      href: "https://www.binance.com/en/fee/schedule",
      publisher: "Binance",
    },
    {
      label: "Understanding funding rates in perpetual futures",
      href: "https://www.coinbase.com/learn/perpetual-futures/understanding-funding-rates-in-perpetual-futures",
      publisher: "Coinbase",
    },
  ],
  "what-are-perpetual-futures": [
    { label: "What are perpetual futures contracts? A complete guide", href: "https://www.kraken.com/learn/trading/perpetual-futures-contracts", publisher: "Kraken" },
    { label: "Understanding funding rates in perpetual futures", href: "https://www.coinbase.com/learn/perpetual-futures/understanding-funding-rates-in-perpetual-futures", publisher: "Coinbase" },
  ],
  "funding-rates-explained": [
    { label: "Understanding funding rates in perpetual futures", href: "https://www.coinbase.com/learn/perpetual-futures/understanding-funding-rates-in-perpetual-futures", publisher: "Coinbase" },
    { label: "Introduction to Binance Futures Funding Rates", href: "https://www.binance.com/en/support/faq/detail/360033525031", publisher: "Binance" },
  ],
  "isolated-vs-cross-margin": [
    { label: "Liquidation Price Calculation under Isolated Mode", href: "https://www.bybit.com/en/help-center/article/Liquidation-Price-Calculation-under-Isolated-Mode-Unified-Trading-Account", publisher: "Bybit" },
    { label: "Cross vs. isolated margin in perpetual futures", href: "https://metamask.io/news/cross-vs-isolated-margin-perps", publisher: "MetaMask" },
  ],
  "how-liquidation-price-is-calculated": [
    { label: "Liquidation Price Calculation under Isolated Mode", href: "https://www.bybit.com/en/help-center/article/Liquidation-Price-Calculation-under-Isolated-Mode-Unified-Trading-Account", publisher: "Bybit" },
    { label: "Maintenance Margin (USDT Perpetual and Expiry Contracts)", href: "https://www.bybit.com/en/help-center/article/Maintenance-Margin-USDT-Contract", publisher: "Bybit" },
  ],
  "crypto-leverage-explained": [
    { label: "Liquidation Price Calculation under Isolated Mode", href: "https://www.bybit.com/en/help-center/article/Liquidation-Price-Calculation-under-Isolated-Mode-Unified-Trading-Account", publisher: "Bybit" },
    { label: "Introduction to Binance Futures Funding Rates", href: "https://www.binance.com/en/support/faq/detail/360033525031", publisher: "Binance" },
  ],
  "maker-taker-fees-explained": [
    { label: "Spot trading fee schedule (standard 0.10%)", href: "https://www.binance.com/en/fee/schedule", publisher: "Binance" },
    { label: "USDⓈ-M futures fee schedule (standard ~0.02%/0.04%)", href: "https://www.binance.com/en/fee/futureFee", publisher: "Binance" },
  ],
  "crypto-exchange-liquidity-cold-start": [
    { label: "How market makers provide liquidity and stabilize crypto markets", href: "https://www.xbto.com/resources/how-market-makers-provide-liquidity-and-stabilize-crypto-markets", publisher: "XBTO" },
    { label: "Building liquidity in crypto exchanges: how-to and tools", href: "https://www.openware.com/news/articles/building-liquidity-in-crypto-exchanges-how-to-and-tools", publisher: "Openware" },
  ],
  "inside-a-crypto-matching-engine": [
    { label: "What is a matching engine in crypto?", href: "https://paybis.com/blog/glossary/matching-engine/", publisher: "Paybis" },
    { label: "Matching engine (glossary)", href: "https://markets.bitcoin.com/glossary/matching-engine", publisher: "Bitcoin.com" },
  ],
  "risk-and-liquidation-engines": [
    { label: "Auto-Deleveraging (ADL) mechanism", href: "https://www.bybit.com/en/help-center/article/Auto-Deleveraging-ADL", publisher: "Bybit" },
    { label: "Liquidation Price Calculation under Isolated Mode", href: "https://www.bybit.com/en/help-center/article/Liquidation-Price-Calculation-under-Isolated-Mode-Unified-Trading-Account", publisher: "Bybit" },
    { label: "Maintenance Margin (USDT Perpetual and Expiry Contracts)", href: "https://www.bybit.com/en/help-center/article/Maintenance-Margin-USDT-Contract", publisher: "Bybit" },
  ],
  "go-to-market-new-crypto-exchange": [
    { label: "Exchange Review, March 2026 (derivatives = 76.5% of CEX volume)", href: "https://data.coindesk.com/reports/exchange-review-march-2026", publisher: "CCData" },
    { label: "2025 Annual Crypto Report", href: "https://www.coingecko.com/research/publications/2025-annual-crypto-report", publisher: "CoinGecko" },
  ],
  "crypto-derivatives-licensing-global-guide": [
    { label: "MiCA — minimum capital requirements for CASPs", href: "https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/minimum-capital-requirements-crypto-asset", publisher: "ESMA (EU)" },
    { label: "VASP licence applications & categories", href: "https://www.vara.ae/en/licenses-and-register/licence-applications/", publisher: "VARA (Dubai)" },
    { label: "Guidelines on licensing for Digital Token Service Providers", href: "https://www.mas.gov.sg/regulation/guidelines/guidelines-on-licensing-for-dtsps", publisher: "MAS (Singapore)" },
    { label: "Virtual asset trading platform operators", href: "https://www.sfc.hk/en/Rules-and-standards/Virtual-assets/Virtual-asset-trading-platforms-operators", publisher: "SFC (Hong Kong)" },
    { label: "Designated Contract Markets (DCMs)", href: "https://www.cftc.gov/IndustryOversight/TradingOrganizations/DCMs/index.htm", publisher: "CFTC (US)" },
  ],
  "mica-crypto-derivatives-casp-license": [
    { label: "MiCA — minimum capital requirements for CASPs (Annex IV)", href: "https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/minimum-capital-requirements-crypto-asset", publisher: "ESMA" },
    { label: "Markets in Crypto-Assets (MiCA) — interactive rulebook", href: "https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica", publisher: "ESMA" },
  ],
  "uae-vara-crypto-derivatives-license": [
    { label: "Licence applications & categories", href: "https://www.vara.ae/en/licenses-and-register/licence-applications/", publisher: "VARA" },
    { label: "Licensed activities (FAQ)", href: "https://www.vara.ae/en/faq/", publisher: "VARA" },
  ],
  "kyc-aml-for-crypto-exchanges": [
    { label: "Best practices on Travel Rule supervision (June 2025)", href: "https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/Best-Practices-Travel-Rule-Supervision.pdf", publisher: "FATF" },
    { label: "Financial Action Task Force (Recommendation 16 / Travel Rule)", href: "https://www.fatf-gafi.org/", publisher: "FATF" },
  ],
  "white-label-crypto-derivatives-exchange-guide": [
    { label: "White-label crypto exchange costs: complete breakdown", href: "https://b2broker.com/news/white-label-crypto-exchange-cost/", publisher: "B2Broker" },
    { label: "White-label vs. building from scratch: cost comparison", href: "https://codono.com/blog/white-label-crypto-exchange-vs-custom-build", publisher: "Codono" },
    { label: "Exchange Review, March 2026 (derivatives = 76.5% of volume)", href: "https://data.coindesk.com/reports/exchange-review-march-2026", publisher: "CCData" },
  ],
  "how-to-launch-a-crypto-derivatives-exchange": [
    { label: "Crypto derivatives exchange development: essential steps", href: "https://b2broker.com/news/crypto-derivatives-exchange-development/", publisher: "B2Broker" },
    { label: "White-label crypto exchange costs: complete breakdown", href: "https://b2broker.com/news/white-label-crypto-exchange-cost/", publisher: "B2Broker" },
  ],
  "white-label-vs-building-crypto-exchange": [
    { label: "Build vs. buy: develop or white-label a crypto exchange?", href: "https://www.finextra.com/blogposting/31281/build-vs-buy-should-startups-develop-or-white-label-a-crypto-exchange", publisher: "Finextra" },
    { label: "White-label vs. building from scratch: 2026 cost comparison", href: "https://codono.com/blog/white-label-crypto-exchange-vs-custom-build", publisher: "Codono" },
  ],
  "cost-to-launch-crypto-derivatives-exchange": [
    { label: "White-label crypto exchange costs: complete breakdown", href: "https://b2broker.com/news/white-label-crypto-exchange-cost/", publisher: "B2Broker" },
    { label: "White-label crypto exchange cost: what to expect in 2026", href: "https://btsesolutions.com/articles/white-label-crypto-exchange-cost", publisher: "BTSE Solutions" },
  ],
  "how-to-choose-white-label-exchange-provider": [
    { label: "Top white-label crypto exchange providers of 2026", href: "https://www.financemagnates.com/cryptocurrency/top-white-label-crypto-exchange-providers-of-2026/", publisher: "Finance Magnates" },
    { label: "White-label crypto exchange costs: complete breakdown", href: "https://b2broker.com/news/white-label-crypto-exchange-cost/", publisher: "B2Broker" },
  ],
  "perpetual-futures-vs-options-vs-dated-futures": [
    { label: "What are perpetual futures contracts? A complete guide", href: "https://www.kraken.com/learn/trading/perpetual-futures-contracts", publisher: "Kraken" },
    { label: "Understanding funding rates in perpetual futures", href: "https://www.coinbase.com/learn/perpetual-futures/understanding-funding-rates-in-perpetual-futures", publisher: "Coinbase" },
  ],
  "crypto-exchange-launch-timeline": [
    { label: "White-label vs. building from scratch: 2026 cost comparison", href: "https://codono.com/blog/white-label-crypto-exchange-vs-custom-build", publisher: "Codono" },
    { label: "How much does a white-label crypto exchange cost in 2026?", href: "https://tinytrader.com/how-much-does-a-white-label-crypto-exchange-cost-in-2026/", publisher: "TinyTrader" },
  ],
};
