import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Phone, AlertCircle, MapPin, Building2, Home, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { useNavigate } from "react-router-dom";

interface CheckoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ isOpen, onOpenChange }: CheckoutDialogProps) => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"location" | "payment">("location");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Delivery details
  const [deliveryDetails, setDeliveryDetails] = useState({
    county: "",
    town: "",
    address: "",
  });

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.startsWith("254")) {
      return cleaned;
    } else if (cleaned.startsWith("07")) {
      return "254" + cleaned.substring(1);
    }
    return cleaned;
  };

  const isValidPhoneNumber = (number: string) => {
    const formatted = formatPhoneNumber(number);
    return formatted.startsWith("254") && formatted.length === 12;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setError("");
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({ ...prev, [name]: value }));
  };

  const updateStockAndRecordSale = () => {
    try {
      // 1. Update Product Stock
      const allProducts: Product[] = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      
      const updatedProducts = allProducts.map(product => {
        const cartItem = items.find(item => item.id === product.id);
        if (cartItem) {
          return {
            ...product,
            stock: Math.max(0, product.stock - cartItem.quantity)
          };
        }
        return product;
      });
      
      localStorage.setItem("fundimart_products", JSON.stringify(updatedProducts));

      // 2. Record Order for Dashboards
      const allOrders = JSON.parse(localStorage.getItem("fundimart_orders") || "[]");
      const orderId = `order_${Date.now()}`;
      const newOrder = {
        id: orderId,
        items: items,
        totalAmount: totalPrice,
        phoneNumber: formatPhoneNumber(phoneNumber),
        deliveryLocation: deliveryDetails,
        createdAt: Date.now(),
        status: "completed"
      };
      
      allOrders.push(newOrder);
      localStorage.setItem("fundimart_orders", JSON.stringify(allOrders));
      localStorage.setItem("last_order", JSON.stringify(newOrder));
      
      return newOrder;
    } catch (err) {
      console.error("Error updating stock/orders:", err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === "location") {
      if (!deliveryDetails.county || !deliveryDetails.town || !deliveryDetails.address) {
        setError("Please fill in all delivery details");
        return;
      }
      setError("");
      setStep("payment");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Please enter a valid Kenyan phone number (07XX XXXXXX or 254...)")
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      // Mocking the API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // After "successful" payment initiation, update stock and record order
      const newOrder = updateStockAndRecordSale();
      
      setSuccess(true);
      setPhoneNumber("");
      
      setTimeout(() => {
        clearCart();
        onOpenChange(false);
        setSuccess(false);
        setStep("location");
        toast.success("Order placed successfully!");
        navigate("/order-success", { state: { order: newOrder } });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {success ? "Payment Successful" : step === "location" ? "Delivery Details" : "M-Pesa Payment"}
          </DialogTitle>
          <DialogDescription>
            {success 
              ? "Your order has been confirmed." 
              : step === "location" 
                ? "Please provide your location information for delivery." 
                : "Enter your M-Pesa phone number to complete payment."}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center animate-bounce">
              <span className="text-2xl text-green-600">✓</span>
            </div>
            <h3 className="font-semibold text-lg text-foreground">Payment Confirmed</h3>
            <p className="text-sm text-muted-foreground text-center">
              Redirecting you to your order details...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === "location" ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" /> County
                    </label>
                    <Input
                      name="county"
                      placeholder="e.g. Nairobi"
                      value={deliveryDetails.county}
                      onChange={handleLocationChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> Town/City
                    </label>
                    <Input
                      name="town"
                      placeholder="e.g. Westlands"
                      value={deliveryDetails.town}
                      onChange={handleLocationChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Home className="w-4 h-4 text-primary" /> Specific Address/Building
                  </label>
                  <Input
                    name="address"
                    placeholder="e.g. 123 Factory St, 4th Floor"
                    value={deliveryDetails.address}
                    onChange={handleLocationChange}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-primary uppercase">Delivery To:</p>
                    <p className="text-sm text-foreground">
                      {deliveryDetails.address}, {deliveryDetails.town}, {deliveryDetails.county}
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setStep("location")}
                      className="text-xs text-primary font-semibold hover:underline mt-1"
                    >
                      Change Address
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    M-Pesa Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="07XX XXXXXX or 254XXXXXXXXX"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      disabled={isLoading}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="bg-secondary/50 p-4 rounded-lg space-y-2 border border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total to Pay</span>
                <span className="font-bold text-foreground">
                  KES {totalPrice.toLocaleString()}
                </span>
              </div>
              {step === "payment" && (
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  M-Pesa prompt will be sent to your phone
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              {step === "payment" ? (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("location")}
                  disabled={isLoading}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
              )}
              
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Processing..."
                ) : step === "location" ? (
                  <>Continue <ChevronRight className="w-4 h-4 ml-2" /></>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;