// src/pages/Products.tsx
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products as staticProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

const Products = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    // 1. Format static products to match ProductCardProps
    const formattedStatic = staticProducts.map(p => ({
      id: p.id,
      image: p.image,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      rating: p.rating || 4.5,
      reviews: p.reviews || 10,
      badge: p.badge,
      sellerId: "static-seller",
      category: p.category
    }));

    // 2. Load and merge seller/admin products from localStorage
    let displayProducts = [...formattedStatic];
    try {
      const storedProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const allUsers = JSON.parse(localStorage.getItem("fundimart_users") || "[]");

      // Convert stored products to ProductCard format
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
        category: p.category,
      }));
      
      // Combine them, putting new products first
      displayProducts = [...formattedStored, ...formattedStatic];
    } catch (error) {
      console.error("Error loading stored products:", error);
    }

    setAllProducts(displayProducts);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">All Products</h1>
        {allProducts.length === 0 ? (
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
};

export default Products;