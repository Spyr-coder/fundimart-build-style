import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Factory, CheckCircle2 } from "lucide-react";
import { Product, User } from "@/types/product";
import { useNavigate } from "react-router-dom";
import { placeholderImage } from "@/lib/utils";

interface DisplayProduct {
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  badge?: string;
  sellerId: string;
}

const FeaturedProducts = () => {
  const [allProducts, setAllProducts] = useState<DisplayProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedProducts: Product[] = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const allUsers: User[] = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
      
      const formattedStored = storedProducts
        .filter((p: Product) => {
          const seller = allUsers.find((u) => u.id === p.sellerId)?.seller;
          return seller?.isVerified;
        })
        .map((p: Product) => ({
          id: p.id,
          image: p.photos?.[0] || placeholderImage(p.name),
          name: p.name,
          price: p.price,
          rating: 4.8,
          reviews: 18,
          badge: p.quality ? p.quality : "Verified Supplier",
          sellerId: p.sellerId,
        }));
      
      setAllProducts(formattedStored);
    } catch (error) {
      console.error("Error loading stored products:", error);
    }
  }, []);

  const featured = allProducts.slice(0, 12);

  return (
    <section className="py-8 md:py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <Factory className="w-4 h-4" />
              <span>Direct Factory Wholesale</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Featured Factory Listings
            </h2>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            className="group w-full sm:w-auto font-bold h-10 border-border"
            onClick={() => navigate("/products")}
          >
            Browse All Listings
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Wholesale Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 bg-card border border-border rounded-xl p-3 shadow-sm text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Audited Hardware Suppliers</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>Escrow Payment Guarantee</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Factory className="w-4 h-4 text-accent shrink-0" />
            <span>Bulk Tiered Rates</span>
          </div>
        </div>

        {/* Listings Grid */}
        {featured.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl shadow-sm text-xs text-muted-foreground">
            No supplier products posted yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {featured.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} {...product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;