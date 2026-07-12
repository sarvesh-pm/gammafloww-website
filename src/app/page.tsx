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

// Below-the-fold, animation-heavy sections. Kept server-rendered (ssr defaults
// to true) so crawlers still see the content, but their client hydration chunks
// — GSAP (Process) and the motion runtime (Calculator, Faq) — split out of the
// initial homepage bundle instead of blocking first load.
const Calculator = dynamic(() => import("@/components/Calculator").then((m) => m.Calculator));
const Process = dynamic(() => import("@/components/Process").then((m) => m.Process));
const Faq = dynamic(() => import("@/components/Faq").then((m) => m.Faq));

export default function Home() {
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
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
