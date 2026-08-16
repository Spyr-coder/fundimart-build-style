import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Star, 
  Heart, 
  ArrowLeft, 
  Building2, 
  FileText, 
  Phone, 
  MapPin, 
  Info,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [isFavorited, setIsFavorited] = useState(false);
  const [product, setProduct] = useState<DisplayProduct | null>(null);
  const [allProducts, setAllProducts] = useState<DisplayProduct[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const storedProducts: Product[] = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
    const formattedStored = storedProducts.map((p: Product) => ({
      id: p.id,
      image: p.photos?.[0] || placeholderImage(p.name),
      name: p.name,
      price: p.price,
      rating: p.rating || 4.8,
      reviews: p.reviews || 0,
      badge: p.quality ? p.quality : undefined,
      sellerName: p.sellerName || "Verified Seller",
      sellerId: p.sellerId || "seller_01",
      sellerContact: p.sellerContact || "+254 700 000 000",
      warehouseLocation: p.warehouseLocation || "Nairobi, Kenya",
      category: p.category,
      description: p.description
    }));

    setAllProducts(formattedStored);
    const found = formattedStored.find((p) => p.id === id);
    setProduct(found || null);
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

  const handleContactSeller = () => {
    if (product.sellerContact) {
      window.location.href = `tel:${product.sellerContact}`;
    } else {
      toast.info("Seller phone number not provided.");
    }
  };

  const handleRequestRFQ = () => {
    navigate("/planner");
  };

  const recommendedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-xs font-semibold text-muted-foreground hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border rounded-xl overflow-hidden aspect-square relative group shadow-sm">
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details & Direct Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                Category: {product.category}
              </p>

              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold">{product.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews} Reviews)</span>
              </div>

              {/* Price Indicator */}
              <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-sm">
                <p className="text-xs text-muted-foreground mb-1">Indicative Retail / Wholesale Price</p>
                <p className="text-3xl font-black text-primary">
                  KES {product.price.toLocaleString()}
                </p>
              </div>

              {/* Contact Seller Actions */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button size="lg" className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2" onClick={handleContactSeller}>
                    <Phone className="w-4 h-4" />
                    Call Seller Directly
                  </Button>
                  
                  <Button size="lg" variant="outline" className="h-12 border-accent text-accent-foreground font-bold gap-2 hover:bg-accent/10" onClick={handleRequestRFQ}>
                    <FileText className="w-4 h-4 text-accent" />
                    Submit Project RFQ
                  </Button>
                </div>

                <Button variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground" onClick={() => setIsFavorited(!isFavorited)}>
                  <Heart className={`w-4 h-4 mr-1 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
                  {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
                </Button>
              </div>

              {/* Seller Contact Card */}
              <div className="border border-border rounded-xl p-4 bg-muted/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="font-bold text-sm text-foreground">{product.sellerName}</span>
                </div>
                {product.sellerContact && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>Phone: <strong className="text-foreground">{product.sellerContact}</strong></span>
                  </p>
                )}
                {product.warehouseLocation && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Location: <strong className="text-foreground">{product.warehouseLocation}</strong></span>
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Description & Notice */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-base text-foreground mb-3 border-b border-border pb-2">
              Item Details
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description || "No specific details provided for this item. Contact the seller for exact technical specifications and stock availability."}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" /> Platform Notice
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              FundiMart connects buyers directly with suppliers. Please confirm product availability, specifications, and terms directly with the seller before making commitments.
            </p>
          </div>
        </div>

        <ProductReviews productId={product.id} />

        {recommendedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-6 text-foreground">Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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