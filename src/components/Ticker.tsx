const pairs = [
  { s: "BTC/USDT", p: "67,412.80", c: 2.41 },
  { s: "ETH/USDT", p: "3,542.10", c: 1.18 },
  { s: "SOL/USDT", p: "184.27", c: 5.02 },
  { s: "BNB/USDT", p: "612.44", c: -0.73 },
  { s: "XRP/USDT", p: "0.6231", c: 3.14 },
  { s: "DOGE/USDT", p: "0.1642", c: -1.28 },
  { s: "AVAX/USDT", p: "42.88", c: 4.37 },
  { s: "LINK/USDT", p: "18.05", c: 0.94 },
  { s: "ARB/USDT", p: "1.204", c: -2.11 },
  { s: "TON/USDT", p: "7.42", c: 1.66 },
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {pairs.map((pair) => {
        const up = pair.c >= 0;
        return (
          <div key={pair.s} className="flex items-center gap-2 px-6 py-3">
            <span className="text-sm font-medium text-ink">{pair.s}</span>
            <span className="font-mono text-sm text-muted tabular-nums">{pair.p}</span>
            <span className={`font-mono text-xs tabular-nums ${up ? "text-up" : "text-down"}`}>
              {up ? "▲" : "▼"} {Math.abs(pair.c).toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/50">
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        <Row />
        <Row />
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
