import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DemoModalProvider } from "@/components/demo/DemoModalProvider";

// GA4 measurement ID. Public value; overridable via env. Analytics only loads
// in production so local/dev traffic doesn't pollute the reports.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-QTS675HP95";
const analyticsEnabled = process.env.NODE_ENV === "production";

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

const siteUrl = "https://www.gammafloww.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "White-Label Crypto Derivatives Exchange — Launch in Weeks | GammaFloww",
    template: "%s · GammaFloww",
  },
  description:
    "White-label infrastructure to launch your own crypto futures & options exchange in weeks. You own the brand, we run the engine — 125x leverage, 300+ pairs.",
  keywords: [
    "white-label crypto exchange",
    "derivatives exchange infrastructure",
    "crypto futures platform",
    "perpetual futures white label",
    "exchange as a service",
    "Web3 infrastructure",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#05070b" },
  ],
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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <DemoModalProvider>{children}</DemoModalProvider>
        {analyticsEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
