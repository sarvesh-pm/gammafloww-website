import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://gammafloww.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GammaFloww — Launch an Enterprise-Grade Crypto Derivatives Exchange",
    template: "%s · GammaFloww",
  },
  description:
    "GammaFloww is the white-label derivatives infrastructure that lets you launch a fully-featured futures & options exchange in weeks. Up to 125x leverage, 300+ pairs, deep liquidity — you own the brand, we run the engine.",
  keywords: [
    "white-label crypto exchange",
    "derivatives exchange infrastructure",
    "crypto futures platform",
    "perpetual futures white label",
    "exchange as a service",
    "Web3 infrastructure",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "GammaFloww — White-Label Crypto Derivatives Infrastructure",
    description:
      "Launch a fully-featured futures & options exchange in weeks. You own the brand, we run the engine.",
    siteName: "GammaFloww",
  },
  twitter: {
    card: "summary_large_image",
    title: "GammaFloww — White-Label Crypto Derivatives Infrastructure",
    description:
      "Launch a fully-featured futures & options exchange in weeks. You own the brand, we run the engine.",
  },
};

// Runs before paint to set the theme class and avoid a flash of the wrong theme.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('gf-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (stored === null) theme = 'dark'; // brand default
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
