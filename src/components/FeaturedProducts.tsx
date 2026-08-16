import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { placeholderImage } from "@/lib/utils";

interface DisplayProduct {
  id: string;
  image: string;
  name: string;
  price: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  sellerId: string;
}

const FeaturedProducts = () => {
  const [allProducts, setAllProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // Replace '/api/products/featured' with your actual API endpoint URL
        const response = await fetch("/api/products/featured");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products from server");
        }

        const data = await response.json();
        
        const formatted = data.map((p: any) => ({
          id: p.id || p._id,
          image: p.photos?.[0] || p.imageUrl || placeholderImage(p.name),
          name: p.name,
          price: p.price,
          rating: p.rating,
          reviews: p.reviewsCount,
          badge: p.quality || (p.seller?.isVerified ? "Verified Supplier" : undefined),
          sellerId: p.sellerId,
        }));

        setAllProducts(formatted);
      } catch (err: any) {
        console.error("Error fetching database products:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const featured = allProducts.slice(0, 12);

  return (
    <section className="py-4 md:py-6 bg-background rounded-xl border border-border shadow-sm">
      <div className="container mx-auto px-4">
        
        {/* Header */}
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

        {/* Trust Banner */}
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

        {/* Dynamic State Handling */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin text-primary mb-2" />
            <p className="text-xs font-medium">Fetching verified listings from database...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-card border border-border rounded-lg text-xs text-muted-foreground">
            {error}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-10 bg-card border border-border rounded-lg text-xs text-muted-foreground">
            No supplier products posted yet in the database.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {featured.map((product, index) => (
              <ProductCard 
                key={`${product.id}-${index}`}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating ?? 4.8}
                reviews={product.reviews ?? 0}
                badge={product.badge}
                sellerId={product.sellerId}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;