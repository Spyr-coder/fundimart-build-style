import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Alibaba-style Top Header Engine */}
      <Header />

      {/* Main Homepage Showcase Wrapper */}
      <main className="space-y-6 pb-12">
        {/* Main Hero Sourcing Portal */}
        <Hero />

        {/* High-Level Category Grid */}
        <div className="container mx-auto px-4">
          <Categories />
        </div>

        {/* Featured Construction & Hardware Sourcing */}
        <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>

        {/* Ready to Ship / Best Sellers Highlight */}
        <div className="container mx-auto px-4">
          <BestSellers />
        </div>

        {/* Supplier / Bulk Sourcing Promotional Banner */}
        <div className="container mx-auto px-4">
          <PromoBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;