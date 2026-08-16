import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Homepage Showcase Wrapper */}
      <main className="space-y-4 pb-10">
        {/* Compact Hero Banner */}
        <Hero />

        {/* Featured Hardware & Material Listings */}
        <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>

        {/* Popular Items Showcase */}
        <div className="container mx-auto px-4">
          <BestSellers />
        </div>

        {/* Direct Sourcing Banner */}
        <div className="container mx-auto px-4">
          <PromoBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;