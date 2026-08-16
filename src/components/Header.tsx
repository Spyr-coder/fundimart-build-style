import { Search, Menu, User, LogOut, ShoppingBag, HelpCircle, ChevronDown, ShieldCheck, Globe, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fundimartLogo from "@/assets/fundimart-logo.jpeg";
import CartSheet from "@/components/CartSheet";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { categoryItems } from "@/data/categories";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      const categoryParam = selectedCategory !== "All" ? `&category=${encodeURIComponent(selectedCategory)}` : "";
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}${categoryParam}`);
      setIsMenuOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="h-1 bg-dynamic-gradient w-full"></div>
      
      {/* 1. Alibaba-style Utility Top Bar */}
      <div className="bg-muted/40 border-b border-border/50 text-xs font-medium py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-1.5 font-semibold text-foreground">
              <Globe className="w-3.5 h-3.5 text-primary" />
              KE / KES
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              FundiMart Verified Guarantees
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <ShoppingBag className="w-3 h-3 text-primary" />
              Direct Factory & Construction Sourcing
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to={user?.role === 'seller' ? "/seller/dashboard" : "/seller/login"} 
              className="text-primary hover:text-accent transition-colors flex items-center gap-1 font-bold"
            >
              Supplier Hub / Seller Portal
            </Link>
            <div className="w-px h-3 bg-border" />
            <Link to="/help" className="text-muted-foreground hover:text-primary flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> Help Center
            </Link>
            
            {user && (
              <>
                <div className="w-px h-3 bg-border" />
                <Link to="/logout" className="text-destructive font-medium hover:underline flex items-center gap-1">
                  <LogOut className="w-3 h-3" />
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Search & Action Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4 md:gap-8">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-dynamic-gradient rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img
                src={fundimartLogo}
                alt="FundiMart Logo"
                className="h-10 md:h-12 w-auto rounded-md relative border border-border"
              />
            </div>
            <span className="text-2xl md:text-3xl font-black text-foreground tracking-tighter">
              Fundi<span className="text-accent">Mart</span>
            </span>
          </Link>

          {/* Alibaba Search Engine Module (Integrated Dropdown + Input + Action CTA) */}
          <div className="hidden md:flex flex-1 max-w-3xl">
            <form onSubmit={handleSearch} className="flex w-full rounded-lg border-2 border-primary overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-primary/20 bg-background">
              {/* Category Dropdown */}
              <div className="relative border-r border-border bg-muted/30 hidden lg:flex items-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-full px-3 text-xs font-semibold bg-transparent border-none outline-none cursor-pointer pr-7 text-foreground capitalize"
                >
                  <option value="All">All Categories</option>
                  {categoryItems.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none text-muted-foreground" />
              </div>

              {/* Search Input */}
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="What hardware, tools, or building materials are you looking for?"
                  className="w-full h-11 border-none focus-visible:ring-0 rounded-none bg-transparent px-4 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Search Trigger CTA */}
              <Button type="submit" className="h-11 rounded-none px-6 font-bold bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Button>
            </form>
          </div>

          {/* User Utility Actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <ThemeToggle />

            {!user ? (
              <Link to="/auth" className="flex flex-col items-center justify-center px-2 py-1 text-xs hover:text-primary transition-colors">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="font-semibold text-[11px] mt-0.5">Sign In</span>
              </Link>
            ) : (
              <Link to={user.role === 'seller' ? '/seller/dashboard' : '/profile'} className="flex flex-col items-center justify-center px-2 py-1 text-xs hover:text-primary transition-colors">
                <User className="w-5 h-5 text-primary" />
                <span className="font-semibold text-[11px] mt-0.5 max-w-[65px] truncate">
                  {user.role === 'seller' ? 'Seller Hub' : 'My Account'}
                </span>
              </Link>
            )}

            <CartSheet />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* 3. Alibaba Category & Sub-Navigation Strip */}
        <div className="hidden md:flex items-center justify-between py-2 border-t border-border/60 text-xs font-semibold">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-1.5 font-bold text-foreground hover:text-primary py-1">
                <Menu className="w-4 h-4 text-primary" />
                <span>All Categories</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>

              {/* Hover Dropdown Menu */}
              <div className="absolute top-full left-0 w-64 bg-background border border-border rounded-b-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 py-2">
                {categoryItems.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    className="block px-4 py-2 hover:bg-muted text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-px h-3 bg-border" />

            <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-accent" />
              Ready to Ship / In Stock
            </Link>
            <Link to="/planner" className="text-muted-foreground hover:text-primary transition-colors">
              Project Planner
            </Link>
            <Link to="/compare" className="text-muted-foreground hover:text-primary transition-colors">
              Product Comparison
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-primary">
            <Link to="/how-it-works" className="hover:underline">
              Buyer Protection & RFQ
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-3 duration-200">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Search tools, materials, equipment..."
                className="w-full pl-4 pr-12 h-11 rounded-lg border-2 border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-md bg-primary text-primary-foreground">
                <Search className="w-4 h-4" />
              </Button>
            </form>

            <nav className="flex flex-col gap-1 text-sm font-medium">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <Link 
                  to="/planner"
                  className="flex items-center justify-center p-2.5 rounded-lg bg-primary/10 text-primary font-bold text-xs"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Project Planner
                </Link>
                <Link 
                  to="/compare"
                  className="flex items-center justify-center p-2.5 rounded-lg bg-accent/10 text-accent font-bold text-xs"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Compare Tools
                </Link>
              </div>

              <p className="text-xs font-bold text-muted-foreground px-2 py-1 uppercase tracking-wider">Product Categories</p>
              {categoryItems.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="px-3 py-2 rounded-lg hover:bg-muted font-medium transition-colors text-xs"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;