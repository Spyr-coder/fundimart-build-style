import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
<<<<<<< HEAD
import { products as staticProducts, categories } from "@/data/products";
=======
import { categories } from "@/data/products";
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    if (!category) return;

    // Helper to normalize strings for comparison
    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const categorySlug = normalize(category.name);

<<<<<<< HEAD
    // 1. Get static products for this category
    const filteredStatic = staticProducts
      .filter((p) => normalize(p.category) === slug || normalize(p.category) === categorySlug)
      .map(p => ({
        id: p.id,
        image: p.image,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        rating: p.rating || 4.5,
        reviews: p.reviews || 10,
        badge: p.badge,
        sellerId: "static-seller"
      }));

    // 2. Get dynamic products from localStorage for this category
    let displayProducts = [...filteredStatic];
=======
    let displayProducts = [];
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
    try {
      const storedProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const allUsers = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
      
      const filteredStored = storedProducts
        .filter((p: Product) => {
          const seller = allUsers.find((u: any) => u.id === p.sellerId)?.seller;
          const matchesCategory = normalize(p.category) === slug || normalize(p.category) === categorySlug;
          return matchesCategory && seller?.isVerified;
        })
        .map((p: Product) => ({
          id: p.id,
<<<<<<< HEAD
          image: p.photos[0] || "https://via.placeholder.com/300x300?text=" + encodeURIComponent(p.name),
=======
          image: p.photos?.[0] || "https://via.placeholder.com/300x300?text=" + encodeURIComponent(p.name),
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
          name: p.name,
          price: p.price,
          rating: 4.5,
          reviews: 12,
          badge: p.quality ? p.quality : undefined,
          sellerId: p.sellerId,
        }));
      
<<<<<<< HEAD
      displayProducts = [...filteredStored, ...filteredStatic];
=======
      displayProducts = [...filteredStored];
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
    } catch (error) {
      console.error("Error loading stored products:", error);
    }

    setFilteredProducts(displayProducts);
  }, [slug, category]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {category?.name ?? "Category"}
            </h1>
            <p className="text-sm text-muted-foreground">{filteredProducts.length} products found</p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <p className="text-muted-foreground mb-4">No products in this category yet.</p>
             <Link to="/products">
                <Button variant="outline">Browse All Products</Button>
             </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Category;