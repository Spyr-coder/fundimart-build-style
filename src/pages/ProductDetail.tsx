import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Award 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import ProductReviews from "@/components/ProductReviews";
import { placeholderImage } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";

interface DisplayProduct {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  sellerName: string;
  sellerId: string;
  sellerContact?: string;
  warehouseLocation?: string;
  category: string;
  description?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);
  const [product, setProduct] = useState<DisplayProduct | null>(null);
  const [allProducts, setAllProducts] = useState<DisplayProduct[]>([]);
  const [orderQuantity, setOrderQuantity] = useState<number>(10);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const storedProducts: Product[] = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
    const formattedStored = storedProducts.map((p: Product) => ({
      id: p.id,
      image: p.photos?.[0] || placeholderImage(p.name),
      name: p.name,
      price: p.price,
      rating: p.rating || 4.8,
      reviews: p.reviews || 12,
      badge: p.quality ? p.quality : "Verified Supplier",
      sellerName: p.sellerName || "Nairobi Hardware Supplies Ltd.",
      sellerId: p.sellerId || "seller_01",
      sellerContact: p.sellerContact || "+254 700 000 000",
      warehouseLocation: p.warehouseLocation || "Industrial Area, Nairobi",
      category: p.category,
      description: p.description
    }));

    setAllProducts(formattedStored);

    const found = formattedStored.find((p) => p.id === id);
    
    if (found) {
      const allReviews = JSON.parse(localStorage.getItem("fundimart_reviews") || "[]") as Array<{
        productId: string;
        rating: number;
      }>;
      const productReviews = allReviews.filter((r) => r.productId === found.id);
      
      if (productReviews.length > 0) {
        const avgRating = productReviews.reduce((acc: number, r) => acc + r.rating, 0) / productReviews.length;
        found.rating = parseFloat(avgRating.toFixed(1));
        found.reviews = productReviews.length;
      }
    }
    
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/products")}>Back to Marketplace</Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Tiered Pricing Calculations (Alibaba Wholesale style)
  const tier1Price = product.price;
  const tier2Price = Math.round(product.price * 0.92);
  const tier3Price = Math.round(product.price * 0.85);

  const getCurrentUnitPrice = () => {
    if (orderQuantity >= 50) return tier3Price;
    if (orderQuantity >= 10) return tier2Price;
    return tier1Price;
  };

  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      sellerId: product.sellerId, 
      image: product.image, 
      name: product.name, 
      price: getCurrentUnitPrice()
    });
    toast.success(`${orderQuantity}x ${product.name} added to cart`);
  };

  const handleRequestRFQ = () => {
    toast.success(`RFQ initialized for ${product.name}. A representative will contact you.`);
    navigate("/planner");
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.info(isFavorited ? "Removed from Favorites" : "Saved to Sourcing List");
  };

  const recommendedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-xs font-semibold text-muted-foreground hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Wholesale Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Product Gallery (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border rounded-xl overflow-hidden aspect-square relative group shadow-sm">
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Factory Direct
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Sourcing & Tiered Pricing (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <span>Category: {product.category}</span>
                <span>•</span>
                <span>MOQ: 1 Unit</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold">{product.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews} Buyer Reviews)</span>
                <span className="text-xs text-muted-foreground">|</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Trade Assurance Protected
                </span>
              </div>

              {/* Wholesale Tiered Pricing Table */}
              <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-sm">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-3">Tiered Wholesale Pricing</p>
                <div className="grid grid-cols-3 gap-2 text-center divide-x divide-border">
                  <div className="px-2">
                    <p className="text-xs text-muted-foreground">1 – 9 Units</p>
                    <p className="text-lg font-bold text-foreground">KES {tier1Price.toLocaleString()}</p>
                  </div>
                  <div className="px-2">
                    <p className="text-xs text-muted-foreground">10 – 49 Units</p>
                    <p className="text-lg font-bold text-primary">KES {tier2Price.toLocaleString()}</p>
                    <span className="text-[10px] text-emerald-600 font-bold">Save 8%</span>
                  </div>
                  <div className="px-2">
                    <p className="text-xs text-muted-foreground">50+ Units</p>
                    <p className="text-lg font-bold text-primary">KES {tier3Price.toLocaleString()}</p>
                    <span className="text-[10px] text-emerald-600 font-bold">Save 15%</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Order Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 h-10 border border-border rounded-lg text-center font-bold text-foreground bg-card"
                  />
                  <span className="text-xs text-muted-foreground">
                    Total: <strong className="text-foreground text-sm">KES {(getCurrentUnitPrice() * orderQuantity).toLocaleString()}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button size="lg" className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2" onClick={handleAddToCart}>
                    <ShoppingCart className="w-4 h-4" />
                    Place Bulk Order
                  </Button>
                  
                  <Button size="lg" variant="outline" className="h-12 border-accent text-accent-foreground font-bold gap-2 hover:bg-accent/10" onClick={handleRequestRFQ}>
                    <FileText className="w-4 h-4 text-accent" />
                    Request Custom Quote (RFQ)
                  </Button>
                </div>
              </div>

              {/* Verified Supplier Info Box */}
              <div className="border border-border rounded-xl p-4 bg-muted/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="font-bold text-sm text-foreground">{product.sellerName}</span>
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded text-[10px] font-bold border border-amber-500/20">
                      Gold Supplier
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {product.warehouseLocation}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Lead Time: 24-48 Hours</span>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="text-xs font-bold text-primary hover:underline" onClick={handleToggleFavorite}>
                  <Heart className={`w-4 h-4 mr-1 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
                  {isFavorited ? 'Saved' : 'Save Supplier'}
                </Button>
              </div>

            </div>
          </div>
        </div>

        {/* Product Description & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-base text-foreground mb-4 border-b border-border pb-2">
              Product Overview & Technical Specifications
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {product.description || "High-grade industrial construction material suitable for large-scale structural engineering and site work. Sourced directly from audited manufacturers complying with local KEBS quality standards."}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground block mb-1">Quality Standard</span>
                <span className="font-bold text-foreground">KEBS / ISO Certified</span>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground block mb-1">Dispatch Hub</span>
                <span className="font-bold text-foreground">{product.warehouseLocation}</span>
              </div>
            </div>
          </div>

          {/* Guarantees Sidebar */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" /> Supplier Guarantees
            </h3>
            
            <div className="text-xs space-y-3 text-muted-foreground">
              <div className="flex gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">Escrow Payment Security</p>
                  <p>Funds released to supplier only after buyer inspection.</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">Direct Logistics Dispatch</p>
                  <p>Site delivery arrangements available across Kenya.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />

        {/* Similar Wholesale Recommendations */}
        {recommendedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-6 text-foreground">Related Wholesale Listings</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;