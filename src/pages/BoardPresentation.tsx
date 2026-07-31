import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import fundimartLogo from "@/assets/fundimart-logo.jpeg";

const BoardPresentation = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-background border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
          </Link>
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Export to PDF
          </Button>
        </div>
      </div>

      {/* Document Content */}
      <div className="container mx-auto py-8 px-4 max-w-4xl print:py-0 print:max-w-none">
        {/* Cover Page */}
        <section className="min-h-[90vh] flex flex-col justify-center items-center text-center mb-16 print:break-after-page print:min-h-screen">
          <div className="space-y-6">
            <img 
              src={fundimartLogo} 
              alt="FundiMart Logo" 
              className="w-48 h-auto mx-auto"
            />
            <p className="text-2xl text-muted-foreground">Frontend Documentation</p>
            <div className="pt-8">
              <p className="text-xl font-medium">Board Presentation Document</p>
              <p className="text-muted-foreground mt-2">January 2026</p>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-2 border-b">1. Executive Summary</h2>
          <p className="text-lg leading-relaxed mb-6">
            <strong>FundiMart</strong> is a modern e-commerce web application designed specifically for the 
            Kenyan construction materials and tools market. The platform provides a seamless online shopping 
            experience for contractors, builders, and DIY enthusiasts looking to purchase construction supplies.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🏗️", title: "Market Focus", desc: "Construction materials & tools" },
              { icon: "🇰🇪", title: "Localization", desc: "Kenyan Shilling (KES) pricing" },
              { icon: "📱", title: "Responsive", desc: "Desktop & mobile optimized" },
              { icon: "⚡", title: "Modern Stack", desc: "Industry-leading tech" },
            ].map((item, i) => (
              <div key={i} className="bg-muted p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-2 border-b">2. Technology Stack</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-3 text-left">Technology</th>
                  <th className="border p-3 text-left">Purpose</th>
                  <th className="border p-3 text-left">Why Chosen</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tech: "React 18", purpose: "UI Framework", why: "Industry standard, component-based" },
                  { tech: "TypeScript", purpose: "Language", why: "Type safety, fewer runtime errors" },
                  { tech: "Vite", purpose: "Build Tool", why: "Fast development, optimized builds" },
                  { tech: "Tailwind CSS", purpose: "Styling", why: "Utility-first, rapid development" },
                  { tech: "React Router", purpose: "Navigation", why: "Client-side routing" },
                  { tech: "Shadcn/UI", purpose: "Components", why: "Accessible, customizable" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                    <td className="border p-3 font-medium">{row.tech}</td>
                    <td className="border p-3">{row.purpose}</td>
                    <td className="border p-3 text-muted-foreground">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Application Architecture */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-2 border-b">3. Application Architecture</h2>
          
          <h3 className="text-xl font-semibold mb-4">Component Structure</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <pre className="whitespace-pre-wrap">{`src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── Header.tsx       # Main navigation
│   ├── Hero.tsx         # Landing hero section
│   ├── Categories.tsx   # Product categories
│   ├── FeaturedProducts.tsx
│   ├── ProductCard.tsx
│   ├── PromoBanner.tsx
│   └── Footer.tsx
├── pages/
│   ├── Index.tsx        # Homepage
│   └── NotFound.tsx     # 404 page
├── hooks/               # Custom React hooks
└── lib/                 # Utilities`}</pre>
          </div>

          <h3 className="text-xl font-semibold mb-4">Design System</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-primary"></div>
              <div>
                <div className="font-medium">Primary</div>
                <div className="text-xs text-muted-foreground">Trust & Reliability</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-orange-500"></div>
              <div>
                <div className="font-medium">Accent</div>
                <div className="text-xs text-muted-foreground">Energy & Action</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-secondary border"></div>
              <div>
                <div className="font-medium">Secondary</div>
                <div className="text-xs text-muted-foreground">Subtle Elements</div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-2 border-b">4. Core Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-3">🔝 Header</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Responsive navigation</li>
                <li>• Search functionality</li>
                <li>• User account access</li>
                <li>• Shopping cart with counter</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-3">🎯 Hero Section</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Compelling CTA</li>
                <li>• Featured promotions</li>
                <li>• Value propositions</li>
                <li>• Quick action buttons</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-3">📦 Product Display</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 8 featured products</li>
                <li>• Product badges</li>
                <li>• Ratings & reviews</li>
                <li>• Add to cart functionality</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-3">🏷️ Categories</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Power Tools</li>
                <li>• Building Materials</li>
                <li>• Safety Equipment</li>
                <li>• Hand Tools, Plumbing, Electrical</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Product Catalog */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-2 border-b">5. Product Catalog</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-3 text-left">Product</th>
                  <th className="border p-3 text-right">Price (KES)</th>
                  <th className="border p-3 text-center">Rating</th>
                  <th className="border p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Professional Cordless Drill Set", price: "24,500", rating: "4.8", status: "Best Seller" },
                  { name: "Premium Portland Cement 50kg", price: "850", rating: "4.6", status: "-" },
                  { name: "Industrial Safety Helmet", price: "1,800", rating: "4.9", status: "20% OFF" },
                  { name: "Heavy Duty Tool Box Set", price: "5,500", rating: "4.7", status: "-" },
                  { name: "Circular Saw 7-1/4 Inch", price: "16,500", rating: "4.5", status: "Hot Deal" },
                  { name: "Measuring Tape Set (3-Pack)", price: "1,200", rating: "4.4", status: "-" },
                  { name: "Professional Paint Brushes Set", price: "2,800", rating: "4.6", status: "-" },
                  { name: "Steel Reinforcement Bars", price: "8,500", rating: "4.8", status: "New" },
                ].map((product, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                    <td className="border p-3">{product.name}</td>
                    <td className="border p-3 text-right font-medium">{product.price}</td>
                    <td className="border p-3 text-center">⭐ {product.rating}</td>
                    <td className="border p-3">
                      {product.status !== "-" && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                          {product.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Future Roadmap */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-2 border-b">6. Future Roadmap</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">Phase 1: Backend Integration</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>☐ User authentication (Login/Register)</li>
                <li>☐ Shopping cart persistence</li>
                <li>☐ Order management system</li>
                <li>☐ M-Pesa payment integration</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Phase 2: Enhanced Features</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>☐ Product search with filters</li>
                <li>☐ Product detail pages</li>
                <li>☐ User reviews and ratings</li>
                <li>☐ Wishlist functionality</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Phase 3: Advanced Features</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>☐ Inventory management</li>
                <li>☐ Vendor/supplier portal</li>
                <li>☐ Delivery tracking</li>
                <li>☐ Mobile app (PWA)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-2 border-b">7. Competitive Advantages</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { num: "01", title: "Local Focus", desc: "Tailored for Kenyan construction market" },
              { num: "02", title: "M-Pesa Ready", desc: "Integration with Kenya's most popular payment method" },
              { num: "03", title: "Mobile-First", desc: "Optimized for the mobile-heavy Kenyan market" },
              { num: "04", title: "Scalable", desc: "Built to grow with business needs" },
              { num: "05", title: "Modern Tech", desc: "Using latest web development standards" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary/30">{item.num}</div>
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="text-center py-12 border-t">
          <p className="text-muted-foreground">Document prepared for FundiMart Board Presentation</p>
          <p className="text-sm text-muted-foreground mt-1">Generated: January 2026</p>
        </section>
      </div>
    </div>
  );
};

export default BoardPresentation;
