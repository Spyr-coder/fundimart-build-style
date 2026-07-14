import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/data/products";
import { Star, ShieldCheck, Truck, Scale, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function ProductComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { addToCart } = useCart();

  const selectedProducts = selectedIds.map(id => products.find(p => p.id === id)).filter(Boolean);

  const addProduct = (id: string) => {
    if (selectedIds.length >= 4) {
      toast.error("You can compare up to 4 products at a time.");
      return;
    }
    if (selectedIds.includes(id)) {
      toast.error("Product already added to comparison.");
      return;
    }
    setSelectedIds([...selectedIds, id]);
  };

  const removeProduct = (id: string) => {
    setSelectedIds(selectedIds.filter(pId => pId !== id));
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: "static-seller"
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
            <Scale className="w-10 h-10 text-primary" />
            Product Comparison
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Compare construction materials based on price, quality, and performance.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <div className="w-full max-w-sm">
            <Select onValueChange={addProduct}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Add a product to compare..." />
              </SelectTrigger>
              <SelectContent>
                {products.filter(p => !selectedIds.includes(p.id)).map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name} (KES {p.price.toLocaleString()})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedIds.length > 0 && (
            <Button variant="outline" onClick={() => setSelectedIds([])} className="h-12">
              Clear All
            </Button>
          )}
        </div>

        {selectedIds.length === 0 ? (
          <div className="text-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <Scale className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-semibold text-muted-foreground">No products selected</h2>
            <p className="text-muted-foreground mt-2">Choose products from the list above to start comparing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectedProducts.map((product: any) => (
              <Card key={product.id} className="relative group overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 z-10 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeProduct(product.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <div className="aspect-square bg-muted relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.badge && (
                    <span className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg leading-tight line-clamp-2 min-h-[3rem]">{product.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary">KES {product.price.toLocaleString()}</div>
                </CardHeader>
                <CardContent className="p-4 space-y-4 pt-0">
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Rating
                      </span>
                      <span className="font-semibold">{product.rating || 4.5}/5</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-primary" /> Quality
                      </span>
                      <span className="font-semibold">{product.badge || "Verified"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Truck className="w-4 h-4 text-primary" /> Shipping
                      </span>
                      <span className="font-semibold">Next Day</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wider">Description</h4>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {product.description || "High-quality material suitable for both residential and commercial projects. Meets international standards."}
                    </p>
                  </div>

                  <Button className="w-full gap-2 mt-2" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Smart Decisions</h3>
                <p className="text-sm text-muted-foreground">Compare technical specifications side-by-side to choose the best material for your project.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quality Comparison</h3>
                <p className="text-sm text-muted-foreground">We verify all sellers, but you can still compare different brands and quality tiers.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Logistics Savings</h3>
                <p className="text-sm text-muted-foreground">Compare prices from different sellers to find the most cost-effective solution including delivery.</p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
