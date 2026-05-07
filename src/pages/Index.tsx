import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import DualApproach from "@/components/site/DualApproach";
import ServiceCategories from "@/components/site/ServiceCategories";
import Booking from "@/components/site/Booking";
import Footer from "@/components/site/Footer";
import SEO from "@/components/site/SEO";
import { studioLocation, fullAddress } from "@/config/location";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "ATNE Performance",
    description:
      "Performance coaching and relief therapy serving Minneapolis, St. Paul and the greater Twin Cities.",
    url: "https://atneperformance.com/",
    telephone: studioLocation.phone,
    email: studioLocation.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: studioLocation.addressLine,
      addressLocality: studioLocation.city,
      addressRegion: studioLocation.region,
      postalCode: studioLocation.postalCode,
      addressCountry: studioLocation.country,
    },
    areaServed: studioLocation.serviceAreas.map((city) => ({
      "@type": "City",
      name: `${city}, MN`,
    })),
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="ATNE Performance — MN Coaching & Relief Therapy"
        description={`Performance coaching & relief therapy in ${studioLocation.city}, MN. Serving ${studioLocation.serviceAreas.join(", ")} & the Twin Cities.`}
        canonical="/"
        jsonLd={jsonLd}
      />
      <Navbar />
      <Hero />
      <DualApproach />
      <ServiceCategories />
      <Booking />
      <Footer />
    </main>
  );
};

export default Index;
