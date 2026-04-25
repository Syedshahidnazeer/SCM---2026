import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ScrollytellingSection from "@/components/ScrollytellingSection";
import VisitStore from "@/components/VisitStore";
import IntroQuote from "@/components/IntroQuote";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroQuote />
        <ScrollytellingSection />
        <VisitStore />
      </main>
      <Footer />
    </>
  );
}
