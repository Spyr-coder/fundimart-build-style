import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Plus, Trash2, Download, Building2, HardHat } from "lucide-react";
import { toast } from "sonner";
import { products } from "@/data/products";

interface ProjectItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export default function ProjectPlanner() {
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addItem = () => {
    const product = products.find(p => p.id === selectedProduct);
    if (!product) {
      toast.error("Please select a product");
      return;
    }

    const newItem: ProjectItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: product.name,
      quantity: quantity,
      price: product.price,
      category: product.category
    };

    setProjectItems([...projectItems, newItem]);
    toast.success(`Added ${product.name} to project`);
    setSelectedProduct("");
    setQuantity(1);
  };

  const removeItem = (id: string) => {
    setProjectItems(projectItems.filter(item => item.id !== id));
  };

  const totalCost = projectItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
              <Calculator className="w-10 h-10 text-primary" />
              Project Planner
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Estimate your construction costs and material requirements.
            </p>
          </div>
          <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20 text-right">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Estimated Total Cost</span>
            <div className="text-3xl font-bold text-primary">KES {totalCost.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Planner Tool */}
          <Card className="lg:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Materials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProducts.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name} - KES {p.price.toLocaleString()}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>

              <Button onClick={addItem} className="w-full gap-2">
                <Plus className="w-4 h-4" /> Add to Plan
              </Button>
            </CardContent>
          </Card>

          {/* Project Summary */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Material List</CardTitle>
              {projectItems.length > 0 && (
                <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("PDF export feature coming soon!")}>
                  <Download className="w-4 h-4" /> Export Plan
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {projectItems.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-xl border-2 border-dashed border-muted">
                  <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Your project plan is empty. Start adding materials to see estimates.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-4 font-semibold">Material</th>
                        <th className="pb-4 font-semibold">Category</th>
                        <th className="pb-4 font-semibold text-center">Qty</th>
                        <th className="pb-4 font-semibold text-right">Unit Price</th>
                        <th className="pb-4 font-semibold text-right">Total</th>
                        <th className="pb-4 font-semibold"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {projectItems.map((item) => (
                        <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                          <td className="py-4 font-medium">{item.name}</td>
                          <td className="py-4 text-muted-foreground">{item.category}</td>
                          <td className="py-4 text-center">{item.quantity}</td>
                          <td className="py-4 text-right">KES {item.price.toLocaleString()}</td>
                          <td className="py-4 text-right font-bold">KES {(item.price * item.quantity).toLocaleString()}</td>
                          <td className="py-4 text-right">
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Construction Advice */}
        <section className="mt-16">
          <div className="bg-muted/30 p-8 rounded-3xl border border-border">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <HardHat className="w-6 h-6 text-primary" />
              Pro Tips for Your Project
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-bold">Estimate Wisely</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Always add a 10-15% buffer to your material estimates to account for waste and unexpected onsite adjustments.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Quality Matters</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Don't compromise on structural materials like cement and steel. Buying verified quality ensures long-term safety.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Bulk Savings</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Planning your whole project at once can help you negotiate better delivery rates and bulk discounts from sellers.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
