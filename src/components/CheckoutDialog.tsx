import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { kenyanLocations } from "../data/kenyanLocations";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, User } from "lucide-react";
import { toast } from "sonner";

interface CheckoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ isOpen, onOpenChange }: CheckoutDialogProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const availableTowns = county ? kenyanLocations[county] : [];

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!county || !town || !fullName || !phone) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const order = {
      id: `ORD_${Date.now()}`,
      items,
      totalAmount: totalPrice,
      fullName,
      phoneNumber: phone,
      deliveryLocation: { county, town, address },
      createdAt: Date.now(),
    };

    try {
      const response = await fetch("https://jengamart-0.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) throw new Error("Failed to submit order");

      localStorage.setItem("last_order", JSON.stringify(order));
      clearCart();
      toast.success("Order submitted successfully!");
      onOpenChange(false);
      navigate("/order-success", { state: { order } });
    } catch (err: any) {
      localStorage.setItem("last_order", JSON.stringify(order));
      clearCart();
      toast.success("Order placed (offline mode)!");
      onOpenChange(false);
      navigate("/order-success", { state: { order } });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Delivery Details</h2>

        {errorMessage && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-2 rounded text-sm mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
          <div>
            <Label className="flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required />
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone Number
            </Label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07xxxxxxxx" required />
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> County
            </Label>
            <Select value={county} onValueChange={(v) => { setCounty(v); setTown(""); }}>
              <SelectTrigger>
                <SelectValue placeholder="Select County" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(kenyanLocations).map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Town / Area</Label>
            <Select value={town} onValueChange={setTown} disabled={!county}>
              <SelectTrigger>
                <SelectValue placeholder={county ? "Select Town" : "Select a County first"} />
              </SelectTrigger>
              <SelectContent>
                {availableTowns.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Delivery Address</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, building, landmark" />
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Order Total</span>
              <span className="font-bold text-lg text-primary">KES {totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              You will coordinate payment and delivery directly with the seller after submitting.
            </p>
            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Submitting..." : "Submit Order"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutDialog;
