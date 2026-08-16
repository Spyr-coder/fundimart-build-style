import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
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
    <section className="py-4 md:py-6 bg-background rounded-xl border border-border shadow-sm">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-0.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Direct Hardware Directory</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
              Featured Material Listings
            </h2>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            className="group w-full sm:w-auto font-bold h-9 text-xs border-border"
            onClick={() => navigate("/products")}
          >
            Browse All Listings
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Simple Trust Banner */}
        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground pb-3 border-b border-border">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Verified Local Dealers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Direct Phone Contact</span>
          </div>
        </div>

        {/* Listings Grid */}
        {featured.length === 0 ? (
          <div className="text-center py-10 bg-card border border-border rounded-lg text-xs text-muted-foreground">
            No supplier products posted yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
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