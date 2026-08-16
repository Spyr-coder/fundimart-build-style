import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Sparkles, ChevronRight, FileText, Factory, Search, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryItems } from "@/data/categories";

const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden border-b">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-6 md:py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Sidebar: Primary Category Directory */}
          <div className="hidden lg:block lg:col-span-3 bg-card border border-border rounded-xl shadow-sm p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-border px-2">
                <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                  Sourcing Directory
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
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Center Column: Main Portal Banner */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-2xl border border-border overflow-hidden bg-card shadow-md flex-1 flex flex-col justify-between p-6 md:p-10 group">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop"
                  alt="Construction Sourcing Directory"
                  className="w-full h-full object-cover opacity-15 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4 border border-primary/20">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Direct Contractor-Seller Connections</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-[1.15]">
                  <span className="text-foreground">Connect with</span>{" "}
                  <span className="text-primary block">Hardware Suppliers</span>
                </h1>

                <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
                  Discover verified construction hardware, building supplies, and site materials across Kenya. Connect with sellers directly.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link to="/products">
                    <Button size="lg" className="h-11 px-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                      Browse Listings
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link to="/how-it-works">
                    <Button variant="outline" size="lg" className="h-11 px-6 text-sm font-bold border-border">
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-border/60 text-center">
                <div>
                  <p className="text-base md:text-lg font-black text-foreground">Direct</p>
                  <p className="text-[11px] text-muted-foreground">Seller Contacts</p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-black text-primary">Verified</p>
                  <p className="text-[11px] text-muted-foreground">Hardware Dealers</p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-black text-foreground">RFQs</p>
                  <p className="text-[11px] text-muted-foreground">Custom Inquiries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: RFQ & Direct Inquiry Card */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 mb-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Post Sourcing Inquiry</span>
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">
                  Need Custom Quantities?
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Submit your project requirements to receive competitive responses directly from dealers.
                </p>
              </div>

              <Link to="/planner">
                <Button className="w-full text-xs font-bold h-9 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Submit Inquiry Now
                </Button>
              </Link>
            </div>

            <div className="bg-muted/40 border border-border/80 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-foreground font-bold text-xs">
                <Factory className="w-4 h-4 text-primary" />
                <span>Supplier Network</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Get direct access to hardware store contacts and manufacturers across major urban hubs.
              </p>
            </div>
          </div>

        </div>

        {/* Informational Feature Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center gap-4 bg-card p-4 rounded-xl shadow-sm border border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Transparent Directory</h3>
              <p className="text-xs text-muted-foreground">Easily find hardware & material options</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-card p-4 rounded-xl shadow-sm border border-border">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Direct Contact</h3>
              <p className="text-xs text-muted-foreground">Reach sellers directly via phone or WhatsApp</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-card p-4 rounded-xl shadow-sm border border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Quick Inquiries</h3>
              <p className="text-xs text-muted-foreground">Submit RFQs for custom project needs</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;