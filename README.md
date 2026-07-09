# GammaFloww

Marketing site for **GammaFloww** — white-label derivatives infrastructure that lets partners launch a fully-featured crypto futures & options exchange in weeks. You own the brand and front end; GammaFloww runs the matching engine, liquidity, and risk.

🔗 **Live:** https://gammafloww-website.vercel.app

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19**
- **[Tailwind CSS v4](https://tailwindcss.com)** — theming via semantic CSS-variable tokens
- **[Motion](https://motion.dev)** (Framer Motion) + **[GSAP](https://gsap.com)** (ScrollTrigger) for animation
- **IBM Plex Sans / IBM Plex Mono** (via `next/font`)
- TypeScript, ESLint

## Features

- **Light & dark themes** with an animated toggle, no-flash inline script, and OS-preference detection (dark is the brand default)
- **Interactive live chart** — hover crosshair + tooltip, 1H/1D/1W timeframe toggle, simulated real-time ticks
- **Live leverage / position calculator** — margin, leverage, and Long/Short recompute position size, notional, and liquidation price instantly
- **Motion graphics** — ambient flow-field canvas, scroll-driven parallax, a draw-on-scroll process timeline, magnetic buttons, tilt cards, and a cursor spotlight
- **Interactive stack diagram** explaining the client-vs-GammaFloww ownership split
- Animated stat counters and a scrolling market ticker
- Accessibility: visible focus states, `prefers-reduced-motion` respected throughout, semantic markup

## Getting started

> **Note:** this machine uses Node via [`nvm`](https://github.com/nvm-sh/nvm) (Node 24 LTS). Ensure `node`/`npm` are on your `PATH` (e.g. `nvm use --lts`) before running the commands below.

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/
│   ├── globals.css      # design tokens (light/dark) + Tailwind theme
│   ├── layout.tsx       # fonts, metadata, no-flash theme script
│   └── page.tsx         # section composition
├── components/          # Hero, ExchangePanel (chart), Calculator, StackDiagram, …
│   └── ui/              # Reveal, Counter, SectionHeading, Interactive (magnetic/tilt)
└── lib/                 # content data, chart logic, theme hook
```

## Theming

All colors flow through semantic tokens in `src/app/globals.css` (`--brand`, `--cyan`, `--up`, `--down`, gradient stops, etc.), defined per theme (`:root` = light, `.dark` = dark). P&L colors (`--up` green / `--down` red) are independent of the brand color, so the brand palette can be reskinned without touching market-data semantics.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `CMC_API_KEY` | Optional | CoinMarketCap API key for the **fallback** price feed. Live market data comes from Binance (client-side); if Binance is unavailable (e.g. geo-blocked), the app falls back to CoinMarketCap via a server route (`/api/market`) that keeps this key server-side. If unset, the fallback is simply dormant. |

Set it locally in `.env.local` and in your Vercel project settings (never commit real keys).

## Deployment

Deployed on [Vercel](https://vercel.com) — every push to `main` triggers an automatic build and deploy.
