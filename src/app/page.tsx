import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ScrollytellingSection from "@/components/ScrollytellingSection";
import VisitStore from "@/components/VisitStore";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ScrollytellingSection />
        <VisitStore />
      </main>
      <Footer />
    </>
  );
}
