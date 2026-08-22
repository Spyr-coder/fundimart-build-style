import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star, ShieldCheck, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { getProductImage } from "@/lib/imageUtils";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  unit?: string;
  category?: string;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  sellerId?: string;
  minOrder?: string;
}

const ProductCard = ({
  id,
  image,
  name,
  price,
  unit = "piece",
  category,
  originalPrice,
  rating = 0,
  reviews = 0,
  badge,
  sellerId = "static-seller",
  minOrder = "1 Piece",
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setImgSrc(getProductImage(image, category, name));
  }, [image, category, name]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, sellerId, image: imgSrc, name, price, unit });
    toast.success(`${name} added to cart`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited((prev) => {
      const nextState = !prev;
      if (nextState) {
        toast.success(`${name} added to favorites`);
      } else {
        toast.info(`${name} removed from favorites`);
      }
      return nextState;
    });
  };

  const handleInquire = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  const handleImageError = () => {
    setImgSrc(getProductImage(undefined, category, name));
  };

  const safePrice = Number(price) || 0;
  const safeOriginalPrice = originalPrice ? Number(originalPrice) : null;
  const safeRating = Number(rating) || 0;

  return (
    <div className="group bg-card rounded-xl border border-border/70 overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col h-full relative">
      {/* Image container */}
      <Link to={`/product/${id}`} className="relative aspect-square overflow-hidden bg-muted/40 block">
        {badge && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] md:text-xs font-bold rounded-md shadow-sm">
            {badge}
          </span>
        )}
        
        <button 
          type="button"
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 z-10 w-7 h-7 md:w-8 md:h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background border border-border/50 shadow-sm"
          title="Add to Wishlist"
        >
          <Heart 
            className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
              isFavorited 
                ? 'fill-primary text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`} 
          />
        </button>

        <img
          src={imgSrc}
          alt={name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Content Details */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        {/* Verified Seller Tag */}
        <div className="flex items-center justify-between gap-1 mb-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3 h-3 shrink-0" />
            Verified Hardware
          </span>
          <span className="text-[10px] font-medium bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
            MOQ: {minOrder}
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors text-xs md:text-sm leading-snug">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(safeRating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-foreground">{safeRating.toFixed(1)}</span>
          <span className="text-[10px] text-muted-foreground">({reviews})</span>
        </div>

        {/* Pricing Block */}
        <div className="mt-auto pt-1 mb-3">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base md:text-lg font-black text-primary">
              KES {safePrice.toLocaleString()}
            </span>
            {safeOriginalPrice && (
              <span className="text-xs text-muted-foreground line-through font-normal">
                KES {safeOriginalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground">Price per {unit} / Wholesale Available</p>
        </div>

        {/* Dual CTA Actions */}
        <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-border/40">
          <Button 
            className="col-span-4 h-8 md:h-9 text-xs font-bold gap-1 bg-primary hover:bg-primary/90 text-primary-foreground" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </Button>

          <Button 
            variant="outline" 
            size="icon" 
            className="col-span-1 h-8 md:h-9 border-border hover:bg-muted text-muted-foreground hover:text-foreground"
            onClick={handleInquire}
            title="Inquire Product Specs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;