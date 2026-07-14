import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden border-b">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-28 relative">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm font-bold mb-6 border border-primary/10 shadow-sm animate-bounce-slow">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>New Season Sale - Up to 30% Off</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              <span className="text-foreground">Built On Trust,</span>
              <span className="text-dynamic-gradient block">Delivered With Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Your one-stop shop for premium construction materials, professional tools, and expert advice. From foundation to finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products">
                <Button variant="dynamic" size="lg" className="group w-full sm:w-auto h-14 px-8 text-lg font-bold">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold border-2 border-primary/20 hover:border-primary/50">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-dynamic-gradient rounded-3xl rotate-3 opacity-20 blur-xl"></div>
            <div className="relative rounded-3xl shadow-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop"
                alt="Construction worker with tools"
                className="w-full h-[400px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform">
                <p className="text-primary font-bold text-lg mb-1">Quality Guaranteed</p>
                <p className="text-muted-foreground text-sm">Every material verified by our experts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all group">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <Truck className="w-7 h-7 text-primary group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Free on orders KES 50,000+</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-border hover:shadow-md hover:border-accent/20 transition-all group">
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
              <Shield className="w-7 h-7 text-accent group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Certified M-Pesa integration</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all group">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <Clock className="w-7 h-7 text-primary group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Local expert assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
