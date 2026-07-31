<<<<<<< HEAD

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Truck, Package, Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
=======
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Package, Phone, MessageCircle, Copy, ArrowRight, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderData {
  id: string;
  items: OrderItem[];
  totalAmount: number;
<<<<<<< HEAD
=======
  fullName?: string;
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
  phoneNumber: string;
  deliveryLocation: {
    county: string;
    town: string;
    address: string;
  };
  createdAt: number;
}

const OrderSuccess = () => {
  const location = useLocation();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
<<<<<<< HEAD
    // Try to get order data from location state or localStorage
=======
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
    const orderData = location.state?.order || JSON.parse(localStorage.getItem("last_order") || "null");
    if (orderData) {
      setOrder(orderData);
    }
<<<<<<< HEAD
    
    window.scrollTo(0, 0);
  }, [location]);

=======
    window.scrollTo(0, 0);
  }, [location]);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Phone number copied!");
  };

>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

<<<<<<< HEAD
  const deliveryDate = new Date(order.createdAt + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-KE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
=======
  const sellerPhone = "+254742602101";
  const whatsappUrl = `https://wa.me/${sellerPhone.replace(/[^0-9]/g, "")}?text=Hello%20I%20have%20placed%20an%20order%20%23${order.id.slice(-8)}%20on%20FundiMart`;
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-border p-8 text-center mb-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
<<<<<<< HEAD
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg mb-4">
              Thank you for your purchase. Your order <span className="font-mono font-bold text-primary">#{order.id.slice(-8)}</span> has been placed successfully.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link to="/track-order">
                <Button variant="outline" className="gap-2">
                  Track Order <Truck className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button className="gap-2">
                  Continue Shopping <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Delivery Info */}
            <div className="md:col-span-2 space-y-8">
              <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-border p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Delivery Details
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Delivery Address
                    </h3>
                    <p className="text-foreground font-medium">{order.deliveryLocation.address}</p>
                    <p className="text-foreground">{order.deliveryLocation.town}, {order.deliveryLocation.county}</p>
                    <p className="text-foreground mt-2">{order.phoneNumber}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Estimated Delivery
                    </h3>
                    <p className="text-foreground font-bold text-lg">{deliveryDate}</p>
                    <p className="text-sm text-muted-foreground mt-1">Between 8:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-bold mb-4">How it works:</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                      <div>
                        <p className="font-semibold text-foreground">Order Processing</p>
                        <p className="text-sm text-muted-foreground">Our team is verifying your items and preparing them for dispatch from our warehouse.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                      <div>
                        <p className="font-semibold text-foreground">Assigned to Driver</p>
                        <p className="text-sm text-muted-foreground">A professional logistics partner will be assigned to your delivery. You'll receive an SMS with their contact info.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                      <div>
                        <p className="font-semibold text-foreground">Final Delivery</p>
                        <p className="text-sm text-muted-foreground">The driver will call you when they are near your location to ensure someone is available to receive the materials.</p>
                      </div>
                    </div>
                  </div>
=======
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Submitted!</h1>
            <p className="text-muted-foreground text-lg mb-4">
              Your order <span className="font-mono font-bold text-primary">#{order.id.slice(-8)}</span> has been placed successfully.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Seller Contact & Instructions */}
            <div className="md:col-span-2 space-y-8">
              <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-border p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" /> Contact Seller
                </h2>
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Please contact the seller directly to arrange payment and delivery:
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seller Phone</p>
                      <p className="text-xl font-bold text-foreground">{sellerPhone}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto shrink-0"
                      onClick={() => handleCopyPhone(sellerPhone)}
                    >
                      <Copy className="w-4 h-4 mr-1" /> Copy
                    </Button>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 font-semibold transition-colors"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Chat on WhatsApp
                    <ArrowRight className="w-5 h-5 ml-auto" />
                  </a>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                  <h3 className="font-bold mb-3">Payment & Delivery Instructions</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">1.</span>
                      Call or WhatsApp the seller to confirm your order.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">2.</span>
                      Arrange your preferred payment method (M-Pesa, bank transfer, or cash on delivery).
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">3.</span>
                      Coordinate delivery date and location with the seller.
                    </li>
                  </ul>
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
                </div>
              </section>

              <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-border p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> Order Items
                </h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-foreground">KES {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Order Summary Side */}
            <div className="space-y-6">
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg shadow-primary/20">
<<<<<<< HEAD
                <h3 className="text-lg font-bold mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-primary-foreground/80">
                    <span>Subtotal</span>
                    <span>KES {order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-primary-foreground/80">
                    <span>Delivery Fee</span>
                    <span>KES 0</span>
                  </div>
                  <div className="pt-3 border-t border-primary-foreground/20 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>KES {order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-white/10 rounded-lg text-sm">
                  <p className="font-semibold mb-1">Payment Method</p>
                  <p>M-Pesa ({order.phoneNumber})</p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-bold mb-4">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">If you have any questions about your order or delivery, please contact our support team.</p>
                <div className="space-y-3">
                  <a href="tel:+254742602101" className="flex items-center gap-3 text-sm font-medium text-primary hover:underline">
                    +254 742 602 101
                  </a>
                  <a href="mailto:support@fundimart.co.ke" className="flex items-center gap-3 text-sm font-medium text-primary hover:underline">
                    support@fundimart.co.ke
                  </a>
                </div>
              </div>
=======
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-primary-foreground/80">
                    <span>Total</span>
                    <span className="font-bold">KES {order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                {order.fullName && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/80">
                    <User className="w-4 h-4" />
                    <span>{order.fullName}</span>
                  </div>
                )}
                <div className="mt-4 flex items-start gap-2 text-sm text-primary-foreground/80">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    {order.deliveryLocation.address}, {order.deliveryLocation.town}, {order.deliveryLocation.county}
                  </span>
                </div>
              </div>

              <Link to="/products">
                <Button className="w-full gap-2">
                  Continue Shopping <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
