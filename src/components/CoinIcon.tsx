// Local coin logos (SVG) live in /public/coins. Plain <img> keeps it simple —
// these are tiny static assets, no optimization needed.
const KNOWN = new Set([
  "btc", "eth", "sol", "bnb", "xrp", "doge", "avax", "link", "ada", "ltc", "usdt",
]);

export function CoinIcon({ symbol, className = "h-4 w-4" }: { symbol: string; className?: string }) {
  const s = symbol.toLowerCase();
  if (!KNOWN.has(s)) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-surface-2 text-[8px] font-bold text-faint ${className}`}
        aria-hidden
      >
        {symbol.slice(0, 1)}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/coins/${s}.svg`} alt={`${symbol} logo`} className={`shrink-0 rounded-full ${className}`} loading="lazy" />
  );
}
