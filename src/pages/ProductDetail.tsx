import { useParams, useNavigate } from "react-router-dom";
import { products as staticProducts } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, ShoppingCart, Heart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import ProductReviews from "@/components/ProductReviews";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load all products (static + dynamic)
    const storedProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
    const formattedStored = storedProducts.map((p: Product) => ({
      id: p.id,
      image: p.photos[0] || "https://via.placeholder.com/300x300?text=" + encodeURIComponent(p.name),
      name: p.name,
      price: p.price,
      rating: 4.5,
      reviews: 12,
      badge: p.quality ? p.quality : undefined,
      sellerName: p.sellerName,
      sellerId: p.sellerId,
      sellerContact: p.sellerContact,
      warehouseLocation: p.warehouseLocation,
      category: p.category,
      description: p.description
    }));

    const formattedStatic = staticProducts.map(p => ({
      ...p,
      sellerId: "static-seller",
      sellerName: "Fundimart"
    }));

    const combined = [...formattedStored, ...formattedStatic];
    setAllProducts(combined);

    const found = combined.find((p) => p.id === id);
    
    // Calculate real ratings from reviews
    if (found) {
      const allReviews = JSON.parse(localStorage.getItem("fundimart_reviews") || "[]");
      const productReviews = allReviews.filter((r: any) => r.productId === found.id);
      
      if (productReviews.length > 0) {
        const avgRating = productReviews.reduce((acc: number, r: any) => acc + r.rating, 0) / productReviews.length;
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
          <Button onClick={() => navigate("/products")}>Back to Products</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      sellerId: product.sellerId, 
      image: product.image, 
      name: product.name, 
      price: product.price 
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      toast.success(`${product.name} added to favorites`);
    } else {
      toast.info(`${product.name} removed from favorites`);
    }
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
          className="flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-muted rounded-2xl overflow-hidden aspect-square relative group">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                {product.badge}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 4.5)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{product.rating || 4.5}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews || 0} reviews)</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  KES {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    KES {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Seller: <span className="text-foreground font-semibold">{product.sellerName}</span>
                </p>
                {product.sellerContact && (
                  <p className="text-sm text-muted-foreground">
                    Contact: <span className="text-foreground font-semibold">{product.sellerContact}</span>
                  </p>
                )}
                {product.warehouseLocation && (
                  <p className="text-sm text-muted-foreground">
                    Warehouse: <span className="text-foreground font-semibold">{product.warehouseLocation}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8 p-4 bg-muted/50 rounded-xl">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "No description provided."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="flex-grow gap-2 h-12" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`gap-2 h-12 ${isFavorited ? 'bg-primary/5 border-primary text-primary' : ''}`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-primary' : ''}`} />
                {isFavorited ? 'Favorited' : 'Wishlist'}
              </Button>
            </div>

            {/* Features/Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Quality Assured</p>
                  <p className="text-[10px] text-muted-foreground">Verified materials</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Fast Delivery</p>
                  <p className="text-[10px] text-muted-foreground">Next day available</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Easy Returns</p>
                  <p className="text-[10px] text-muted-foreground">7-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductReviews productId={product.id} />

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Recommended Products</h2>
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