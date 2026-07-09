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
};
