import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  sellerId?: string;
}

const ProductCard = ({
  id,
  image,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  badge,
  sellerId = "static-seller",
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth(); // Get isAuthenticated status
  const navigate = useNavigate(); // Initialize useNavigate
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, sellerId, image, name, price });
    toast.success(`${name} added to cart`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      toast.success(`${name} added to favorites`);
    } else {
      toast.info(`${name} removed from favorites`);
    }
  };

  return (
    <div className="group bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <Link to={`/product/${id}`} className="relative aspect-square overflow-hidden bg-muted block">
        {badge && (
          <span className="absolute top-2 left-2 md:top-3 md:left-3 z-10 px-2 py-0.5 md:px-3 md:py-1 bg-accent text-accent-foreground text-[10px] md:text-xs font-bold rounded-full">
            {badge}
          </span>
        )}
        <button 
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 md:top-3 md:right-3 z-10 w-8 h-8 md:w-10 md:h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        >
          <Heart 
            className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
              isFavorited 
                ? 'fill-primary text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`} 
          />
        </button>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content */}
      <div className="p-3 md:p-5 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-0.5 md:gap-1 mb-1.5 md:mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 md:w-4 md:h-4 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="text-[10px] md:text-sm text-muted-foreground ml-0.5 md:ml-1">({reviews})</span>
        </div>

        {/* Name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-medium md:font-semibold text-foreground mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors text-xs md:text-base">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2 mb-3 md:mb-4">
          <span className="text-sm md:text-xl font-bold text-primary">KES {price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-[10px] md:text-sm text-muted-foreground line-through">
              KES {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <div className="mt-auto">
          <Button className="w-full group/btn text-xs md:text-sm h-8 md:h-10" onClick={handleAddToCart}>
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 group-hover/btn:scale-110 transition-transform" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
