import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { products as staticProducts } from "@/data/products";
import { Product } from "@/types/product";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Format static products
    const formattedStatic = staticProducts.map(p => ({
      id: p.id,
      image: p.image,
      name: p.name,
      price: p.price,
      rating: p.rating || 4.5,
      reviews: p.reviews || 10,
      badge: p.badge,
      sellerId: "static-seller"
    }));

    // 2. Load and merge seller/admin products from localStorage
    let displayProducts = [...formattedStatic];
    try {
      const storedProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const allUsers = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
      
      const formattedStored = storedProducts
        .filter((p: Product) => {
          const seller = allUsers.find((u: any) => u.id === p.sellerId)?.seller;
          return seller?.isVerified;
        })
        .map((p: Product) => ({
          id: p.id,
          image: p.photos[0] || "https://via.placeholder.com/300x300?text=" + encodeURIComponent(p.name),
          name: p.name,
          price: p.price,
          rating: 4.5,
          reviews: 12,
          badge: p.quality ? p.quality : undefined,
          sellerId: p.sellerId,
        }));
      
      // Combine them, putting new products first
      displayProducts = [...formattedStored, ...formattedStatic];
    } catch (error) {
      console.error("Error loading stored products:", error);
    }

    setAllProducts(displayProducts);
  }, []);

  // Show first 12 products as featured
  const featured = allProducts.slice(0, 12);

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
              Featured Products
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Discover our top-rated construction materials and tools from verified sellers
            </p>
          </div>
          <Button 
            variant="outline" 
            className="group w-full sm:w-auto"
            onClick={() => navigate("/products")}
          >
            View All Products
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {featured.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
                No products to display.
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
