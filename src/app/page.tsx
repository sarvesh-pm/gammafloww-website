import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Stats } from "@/components/Stats";
import { ValueProp } from "@/components/ValueProp";
import { Features } from "@/components/Features";
import { Control } from "@/components/Control";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { NewsCarousel } from "@/components/news/NewsCarousel";
import { getNews } from "@/lib/news";

// Refresh the homepage (incl. the news carousel) at most hourly.
export const revalidate = 3600;

// Below-the-fold, animation-heavy sections. Kept server-rendered (ssr defaults
// to true) so crawlers still see the content, but their client hydration chunks
// — GSAP (Process) and the motion runtime (Calculator, Faq) — split out of the
// initial homepage bundle instead of blocking first load.
const Calculator = dynamic(() => import("@/components/Calculator").then((m) => m.Calculator));
const Process = dynamic(() => import("@/components/Process").then((m) => m.Process));
const Faq = dynamic(() => import("@/components/Faq").then((m) => m.Faq));

export default async function Home() {
  // Top recent stories that carry an image, for the auto-scrolling carousel.
  const { items, fetchedAt } = await getNews(20);
  const carousel = items.filter((i) => i.image).slice(0, 5);

  return (
    <>
      <StructuredData />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Ticker />
        <Stats />
        <ValueProp />
        <Features />
        <Calculator />
        <Control />
        <Process />
        <NewsCarousel items={carousel} fetchedAt={fetchedAt} />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
