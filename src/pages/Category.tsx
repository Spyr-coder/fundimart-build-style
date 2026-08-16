import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";
import { ArrowLeft, Filter, ShieldCheck, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, User } from "@/types/product";
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

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [filterReadyToShip, setFilterReadyToShip] = useState(false);
  const [filterTradeAssurance, setFilterTradeAssurance] = useState(false);

  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    if (!category) return;

    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const categorySlug = normalize(category.name);

    try {
      const storedProducts: Product[] = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const allUsers: User[] = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
      
      const filteredStored = storedProducts
        .filter((p: Product) => {
          const seller = allUsers.find((u) => u.id === p.sellerId)?.seller;
          const matchesCategory = normalize(p.category) === slug || normalize(p.category) === categorySlug;
          return matchesCategory && seller?.isVerified;
        })
        .map((p: Product) => ({
          id: p.id,
          image: p.photos?.[0] || placeholderImage(p.name),
          name: p.name,
          price: p.price,
          rating: 4.8,
          reviews: 14,
          badge: p.quality ? p.quality : "Verified Supplier",
          sellerId: p.sellerId,
        }));
      
      setProducts(filteredStored);
    } catch (error) {
      console.error("Error loading stored products:", error);
    }
  }, [slug, category]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-10">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
              {category?.name ?? "Wholesale Category"}
            </h1>
            <p className="text-xs text-muted-foreground">{products.length} Supplier Products Listed</p>
          </div>
        </div>

        {/* Alibaba Wholesale Quick Filters Bar */}
        <div className="bg-card border border-border rounded-xl p-3.5 mb-8 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" /> Source Filters:
            </span>

            <Button
              variant={filterTradeAssurance ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs font-semibold gap-1.5 rounded-lg"
              onClick={() => setFilterTradeAssurance(!filterTradeAssurance)}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Trade Assurance
              {filterTradeAssurance && <Check className="w-3 h-3 ml-1" />}
            </Button>

            <Button
              variant={filterReadyToShip ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs font-semibold gap-1.5 rounded-lg"
              onClick={() => setFilterReadyToShip(!filterReadyToShip)}
            >
              <Truck className="w-3.5 h-3.5 text-primary" />
              Ready to Dispatch
              {filterReadyToShip && <Check className="w-3 h-3 ml-1" />}
            </Button>
          </div>

          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            Escrow Buyer Protection Active
          </span>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {products.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card border border-border rounded-xl shadow-sm">
            <p className="text-sm text-muted-foreground mb-4">No verified suppliers in this category yet.</p>
            <Link to="/products">
              <Button variant="outline" size="sm" className="font-bold">Browse Marketplace</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Category;