export const site = {
  name: "GammaFloww",
  demoUrl: "https://calendly.com/partner-pi42/30min",
  tagline: "White-label derivatives infrastructure for Web3.",
};

export const nav = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "https://gammafloww.com/blog" },
];

export const stats = [
  { to: 125, prefix: "", suffix: "x", label: "Max leverage" },
  { to: 300, prefix: "", suffix: "+", label: "Trading pairs" },
  { to: 3, prefix: "", suffix: "", label: "Exchanges launched" },
  { to: 500, prefix: "", suffix: "K", label: "Monthly end users" },
];

export const features = [
  {
    title: "Fiat & USDT-margined futures",
    description:
      "Offer perpetual contracts margined in both fiat and stablecoins, giving your traders the flexibility they expect from a tier-1 venue.",
    icon: "layers",
  },
  {
    title: "High leverage, deep liquidity",
    description:
      "Up to 125x leverage across 300+ pairs, backed by aggregated liquidity so order books stay tight even at scale.",
    icon: "gauge",
  },
  {
    title: "Advanced order & position engine",
    description:
      "Real-time order books, ultra-low-latency matching, and smart position controls — the core of a professional trading experience.",
    icon: "activity",
  },
  {
    title: "Margin safety & risk controls",
    description:
      "Built-in liquidation, auto-deleveraging, and configurable risk limits protect your users and your book around the clock.",
    icon: "shield",
  },
  {
    title: "Custom notifications & alerts",
    description:
      "Keep traders engaged with personalized updates on fills, funding, liquidations, and market moves across every channel.",
    icon: "bell",
  },
  {
    title: "Retail API & webhook support",
    description:
      "Full REST and WebSocket APIs plus webhooks let power users and market makers automate strategies on your venue.",
    icon: "code",
  },
];

export const controls = {
  yours: {
    title: "You own the front line",
    items: [
      "Brand, UI/UX, and the entire customer experience",
      "Deposits, withdrawals, and treasury policy",
      "KYC/AML flows and regional compliance",
      "Fee schedules, pricing, and promotions",
    ],
  },
  ours: {
    title: "We run the engine",
    items: [
      "Matching engine, order books, and settlement",
      "Liquidity aggregation and market making",
      "Risk, margin, and liquidation systems",
      "Infrastructure, uptime, and 24/7 monitoring",
    ],
  },
};

export const process = [
  {
    step: "01",
    title: "Initial consultation",
    description:
      "We map your business goals and target markets to confirm product-market fit before a line of code is written.",
  },
  {
    step: "02",
    title: "Requirement assessment",
    description:
      "A deep dive into your technical and regulatory requirements produces a concrete integration blueprint.",
  },
  {
    step: "03",
    title: "Technical integration",
    description:
      "We connect your front end to our APIs and stand up the backend infrastructure that powers your exchange.",
  },
  {
    step: "04",
    title: "Platform customization",
    description:
      "Branding, trading parameters, fee structures, and risk limits are configured to match your strategy.",
  },
  {
    step: "05",
    title: "Testing & training",
    description:
      "We validate edge cases end-to-end and train your team so you go live with total confidence.",
  },
  {
    step: "06",
    title: "Go-live & support",
    description:
      "Launch with SLA-backed support, clear escalation paths, and continuous performance monitoring.",
  },
];

export const faqs = [
  {
    q: "What is the typical implementation timeframe?",
    a: "Our white-label solution can be implemented within 4–8 weeks, depending on your specific requirements and the degree of customization you need.",
  },
  {
    q: "How customizable is the platform?",
    a: "You control the entire front end — branding, UI, and user experience — while configuring trading pairs, leverage tiers, fee schedules, and risk parameters. The exchange looks and feels entirely like yours.",
  },
  {
    q: "How is liquidity provided?",
    a: "We aggregate liquidity across our partner network and market makers so your order books stay deep and spreads stay tight from day one, without you sourcing liquidity yourself.",
  },
  {
    q: "What is the fee structure?",
    a: "Pricing is tailored to your volume and business model, typically combining a setup fee with revenue sharing. Book a demo and we'll walk you through options for your scale.",
  },
  {
    q: "Which margin modes are supported?",
    a: "The platform supports both cross and isolated margin, with fiat- and USDT-margined perpetual contracts and configurable leverage up to 125x.",
  },
  {
    q: "What kind of technical support is provided?",
    a: "Every partner gets SLA-backed support with dedicated escalation channels and 24/7 monitoring of the trading infrastructure that powers your venue.",
  },
];
