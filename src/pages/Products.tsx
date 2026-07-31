import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

export default function Products() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        // 1. Fetch from your backend controller (which handles search, category, and pagination)
        const response = await fetch("/api/products?limit=50");
        if (!response.ok) throw new Error("Failed to fetch products");
        
        const result = await response.json();

        // 2. Safely extract the array from `result.data` (matching your controller's res.json)
        const productsArray = result.data || [];

        // 3. Map the fields to match what your frontend ProductCard expects
        const formattedProducts = productsArray.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category,
          unit: p.unit,
          stock: p.stock,
          description: p.description,
          // Since "photos" doesn't exist in Prisma yet, use a clean placeholder image
          image: `https://via.placeholder.com/300x300?text=${encodeURIComponent(p.name)}`,
          // Provide defaults for UI fields not stored in your Prisma model yet
          rating: 4.5,
          reviews: Math.floor(Math.random() * 15) + 2, // Temporary realistic review count
          badge: p.stock > 0 ? "In Stock" : "Out of Stock"
        }));

        setAllProducts(formattedProducts);
      } catch (error) {
        console.error("Error loading products from API:", error);
        
        // 4. Robust fallback to localStorage if backend is offline during development
        try {
          const storedProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
          const allUsers = JSON.parse(localStorage.getItem("fundimart_users") || "[]");

          const formattedStored = storedProducts
            .filter((p: any) => {
              const seller = allUsers.find((u: any) => u.id === p.sellerId)?.seller;
              return seller ? seller.isVerified : true; 
            })
            .map((p: any) => ({
              id: p.id,
              image: p.photos?.[0] || `https://via.placeholder.com/300x300?text=${encodeURIComponent(p.name)}`,
              name: p.name,
              price: p.price,
              rating: p.rating || 4.5,
              reviews: p.reviews || 0,
              badge: p.quality || undefined,
              category: p.category,
            }));
          setAllProducts(formattedStored);
        } catch (storageError) {
          console.error("Local storage fallback failed:", storageError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">All Products</h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading products...</p>
          </div>
        ) : allProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {allProducts.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} {...product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}