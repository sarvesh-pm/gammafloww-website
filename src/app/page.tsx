import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Stats } from "@/components/Stats";
import { ValueProp } from "@/components/ValueProp";
import { Features } from "@/components/Features";
import { Calculator } from "@/components/Calculator";
import { Control } from "@/components/Control";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StructuredData />
      <ScrollProgress />
      <Navbar />
      <main>
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
