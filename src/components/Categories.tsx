import { Link } from "react-router-dom";
import { categoryItems } from "@/data/categories";
import { products as staticProducts } from "@/data/products";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";

const Categories = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Count static products
    const staticCounts: Record<string, number> = {};
    staticProducts.forEach(p => {
      const slug = normalize(p.category);
      staticCounts[slug] = (staticCounts[slug] || 0) + 1;
    });

    // Count stored products (only from verified sellers)
    const storedProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
    const allUsers = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
    
    const dynamicCounts: Record<string, number> = {};
    storedProducts.forEach((p: Product) => {
      const seller = allUsers.find((u: any) => u.id === p.sellerId)?.seller;
      if (seller?.isVerified) {
        const slug = normalize(p.category);
        dynamicCounts[slug] = (dynamicCounts[slug] || 0) + 1;
      }
    });

    // Merge counts
    const mergedCounts: Record<string, number> = { ...staticCounts };
    Object.keys(dynamicCounts).forEach(slug => {
      mergedCounts[slug] = (mergedCounts[slug] || 0) + dynamicCounts[slug];
    });

    setCounts(mergedCounts);
  }, []);

  return (
    <section className="py-10 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Shop by Category
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Browse our extensive collection of construction materials and tools organized by category
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
          {categoryItems.map((category, index) => {
            const count = counts[category.slug] || 0;
            return (
              <Link
                key={index}
                to={`/category/${category.slug}`}
                className="group bg-card rounded-xl md:rounded-2xl p-3 md:p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className={`w-10 h-10 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl ${category.color} flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-5 h-5 md:w-8 md:h-8" />
                </div>
                <h3 className="font-medium md:font-semibold text-foreground mb-0.5 md:mb-1 group-hover:text-primary transition-colors text-xs md:text-base">
                  {category.name}
                </h3>
                <p className="text-[10px] md:text-sm text-muted-foreground hidden sm:block">
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
