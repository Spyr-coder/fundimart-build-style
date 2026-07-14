import { useState, useEffect } from "react";
import { Star, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Review } from "@/types/product";

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load reviews
    const allReviews: Review[] = JSON.parse(localStorage.getItem("fundimart_reviews") || "[]");
    const productReviews = allReviews.filter((r) => r.productId === productId);
    setReviews(productReviews.sort((a, b) => b.createdAt - a.createdAt));

    // Check if user has purchased the product
    if (user) {
      const allOrders = JSON.parse(localStorage.getItem("fundimart_orders") || "[]");
      // Check if any order contains this product
      const purchased = allOrders.some((order: any) => 
        order.items.some((item: any) => item.id === productId)
      );
      setHasPurchased(purchased);
    }
  }, [productId, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (comment.trim().length < 5) {
      toast.error("Please provide a more detailed comment");
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newReview: Review = {
        id: `review_${Date.now()}`,
        productId,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        rating,
        comment,
        createdAt: Date.now(),
      };

      const allReviews: Review[] = JSON.parse(localStorage.getItem("fundimart_reviews") || "[]");
      const updatedReviews = [newReview, ...allReviews];
      localStorage.setItem("fundimart_reviews", JSON.stringify(updatedReviews));

      setReviews([newReview, ...reviews]);
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 space-y-8">
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          Customer Reviews ({reviews.length})
        </h2>
      </div>

      {hasPurchased ? (
        <div className="bg-muted/50 p-6 rounded-2xl border border-border">
          <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
          <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            You purchased this product. Share your experience!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hover || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-medium">
                Your Comment
              </label>
              <Textarea
                id="comment"
                placeholder="What did you like or dislike? How was the quality?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] bg-background"
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </div>
      ) : user ? (
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Only customers who have purchased this product can leave a review. 
            If you've already bought it, make sure you're using the same account.
          </p>
        </div>
      ) : (
        <div className="bg-muted p-4 rounded-xl border border-border text-center">
          <p className="text-sm text-muted-foreground">
            Please <a href="/auth" className="text-primary font-bold hover:underline">login</a> to see if you're eligible to leave a review.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-background p-4 rounded-xl border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-foreground">{review.userName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 border border-dashed border-border rounded-2xl">
            <MessageSquare className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
