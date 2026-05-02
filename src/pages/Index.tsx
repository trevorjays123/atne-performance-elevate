import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import DualApproach from "@/components/site/DualApproach";
import Services from "@/components/site/Services";
import Booking from "@/components/site/Booking";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <DualApproach />
      <Services />
      <Booking />
      <Footer />
    </main>
  );
};

export default Index;
