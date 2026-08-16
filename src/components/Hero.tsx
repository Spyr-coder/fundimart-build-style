import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, Clock, Sparkles, ChevronRight, FileText, CheckCircle2, Factory } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryItems } from "@/data/categories";

const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden border-b">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-6 md:py-8 relative">
        {/* Alibaba 3-Column Portal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* 1. Left Sidebar: Categories Navigation (Hidden on Mobile) */}
          <div className="hidden lg:block lg:col-span-3 bg-card border border-border rounded-xl shadow-sm p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-border px-2">
                <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                  My Sourcing Categories
                </span>
              </div>
              <ul className="space-y-1">
                {categoryItems.slice(0, 8).map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      to={`/category/${cat.slug}`}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors group"
                    >
                      <span className="truncate">{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-border/60 mt-2 px-2">
              <Link
                to="/products"
                className="text-xs font-bold text-primary hover:underline flex items-center justify-between"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 2. Middle Column: Main Sourcing Banner */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-2xl border border-border overflow-hidden bg-card shadow-md flex-1 flex flex-col justify-between p-6 md:p-10 group">
              {/* Background Backdrop Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop"
                  alt="Construction Sourcing Portal"
                  className="w-full h-full object-cover opacity-15 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent"></div>
              </div>

              {/* Banner Content */}
              <div className="relative z-10 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4 border border-primary/20">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Direct Factory & Construction Wholesale</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-[1.15]">
                  <span className="text-foreground">Source Smarter,</span>{" "}
                  <span className="text-primary block">Build Faster</span>
                </h1>

                <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
                  Your top destination for verified construction supplies, heavy hardware, and contractor-grade materials in Kenya.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link to="/products">
                    <Button size="lg" className="h-11 px-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                      Source Products
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link to="/how-it-works">
                    <Button variant="outline" size="lg" className="h-11 px-6 text-sm font-bold border-border">
                      How RFQ Works
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Sourcing Metrics Strip */}
              <div className="relative z-10 grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-border/60 text-center">
                <div>
                  <p className="text-base md:text-lg font-black text-foreground">100%</p>
                  <p className="text-[11px] text-muted-foreground">Verified Hardware</p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-black text-primary">Direct</p>
                  <p className="text-[11px] text-muted-foreground">Factory Rates</p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-black text-foreground">M-Pesa</p>
                  <p className="text-[11px] text-muted-foreground">Escrow Guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Right Sidebar: Buyer Action Center & RFQ Hub */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Request for Quotation (RFQ) Card */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 mb-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Request For Quotation</span>
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">
                  One Request, Multiple Quotes
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Submit your material specifications & receive quotes directly from verified hardware suppliers.
                </p>
              </div>

              <Link to="/planner">
                <Button className="w-full text-xs font-bold h-9 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Post RFQ Now
                </Button>
              </Link>
            </div>

            {/* Buyer Assurance Card */}
            <div className="bg-muted/40 border border-border/80 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Trade Assurance</span>
              </div>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Factory className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Inspected Supplier Factories</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Secure Order Safeguards</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Features bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center gap-4 bg-card p-4 rounded-xl shadow-sm border border-border hover:border-primary/40 transition-all group">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Truck className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Site-Direct Logistics</h3>
              <p className="text-xs text-muted-foreground">Free dispatch on qualified bulk orders</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-card p-4 rounded-xl shadow-sm border border-border hover:border-accent/40 transition-all group">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Shield className="w-6 h-6 text-accent group-hover:text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Escrow Protection</h3>
              <p className="text-xs text-muted-foreground">Verified M-Pesa & Bank Guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-card p-4 rounded-xl shadow-sm border border-border hover:border-primary/40 transition-all group">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Clock className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">24/7 Procurement Support</h3>
              <p className="text-xs text-muted-foreground">Dedicated local material experts</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;