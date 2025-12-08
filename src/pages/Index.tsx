import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PredictionForm from "@/components/PredictionForm";
import MapSection from "@/components/MapSection";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PredictionForm />
        <MapSection />
        <Stats />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
