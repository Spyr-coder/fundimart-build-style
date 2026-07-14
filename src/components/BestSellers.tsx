import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Zap, ShoppingCart, Star, Award } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BestSellers() {
  // Mock insights data
  const insights = [
    { title: "Cement Demand", value: "+12%", trend: "up", desc: "Rise in residential projects" },
    { title: "Steel Prices", value: "Stable", trend: "neutral", desc: "No changes expected this week" },
    { title: "Most Searched", value: "Roofing", trend: "up", desc: "Seasonal maintenance peak" },
    { title: "Fastest Delivery", value: "< 24h", trend: "up", desc: "Nairobi metropolitan area" },
  ];

  // Pick top 4 products as best sellers
  const bestSellingProducts = products.slice(0, 4).map((p, i) => ({
    ...p,
    salesCount: [1240, 890, 750, 620][i], // Mock sales data
    growth: ["+15%", "+8%", "+12%", "+5%"][i]
  }));

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Insights Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Market Insights</h2>
              <p className="text-sm text-muted-foreground">Real-time construction material trends in Kenya</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((item, i) => (
              <Card key={i} className="border-none shadow-sm bg-background/50 backdrop-blur-sm overflow-hidden group hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.title}</span>
                    <TrendingUp className={`w-4 h-4 ${item.trend === 'up' ? 'text-green-500' : 'text-blue-500'}`} />
                  </div>
                  <div className="text-2xl font-black text-primary mb-1">{item.value}</div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                  <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-dynamic-gradient w-2/3 group-hover:w-full transition-all duration-1000"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Sellers Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <Award className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-black tracking-tight">Best Sellers</h2>
            </div>
            <p className="text-muted-foreground">The most trusted materials by contractors nationwide</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-accent/10 text-accent rounded-full border border-accent/20">
            <Zap className="w-3 h-3 fill-accent" />
            UPDATED HOURLY
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellingProducts.map((product) => (
            <div key={product.id} className="relative">
              <div className="absolute -top-2 -left-2 z-10">
                <Badge className="bg-orange-gradient border-none shadow-lg px-3 py-1 text-[10px] font-black uppercase tracking-tighter">
                  {product.salesCount}+ Sold
                </Badge>
              </div>
              <ProductCard 
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                badge={product.badge}
                sellerId="static-seller"
              />
              <div className="mt-3 flex items-center justify-between px-2">
                <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] font-bold text-green-600">{product.growth} Growth</span>
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">In Stock</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
