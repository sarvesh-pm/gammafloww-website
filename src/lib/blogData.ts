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
};

export const sourceSets: Record<string, Source[]> = {
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
