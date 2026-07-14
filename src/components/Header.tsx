import { Search, Menu, User, LogOut, ShoppingBag, PhoneCall, HelpCircle } from "lucide-react";
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
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="h-1 bg-dynamic-gradient w-full"></div>
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-xs font-medium border-b border-border/50">
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground flex items-center gap-1">
              <ShoppingBag className="w-3 h-3 text-primary" />
             ENJOY YOUR SHOPPING EXPERIENCE WITH FUNDIMART!
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to={user?.role === 'seller' ? "/seller/dashboard" : "/seller/login"} 
              className="text-primary hover:text-accent transition-colors flex items-center gap-1 font-bold"
            >
              Hardware Seller Portal
            </Link>
            <div className="w-px h-3 bg-border" />
            <Link to="/help" className="text-muted-foreground hover:text-primary flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Help Center
            </Link>
            <Link to="/track-order" className="text-muted-foreground hover:text-primary">Track Order</Link>
            {user && (
              <Link to="/logout" className="text-destructive font-medium hover:underline flex items-center gap-1">
                <LogOut className="w-3 h-3" />
                Logout
              </Link>
            )}
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
                <div className="absolute -inset-1 bg-dynamic-gradient rounded-lg blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                <img
                src={fundimartLogo}
                alt="FundiMart Logo"
                className="h-12 md:h-16 w-auto rounded-lg relative border border-white/50"
                />
            </div>
            <span className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">
              Fundi<span className="text-accent">Mart</span>
            </span>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div className="absolute -inset-0.5 bg-dynamic-gradient rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-opacity"></div>
              <Input
                type="text"
                placeholder="Search for tools, materials, equipment..."
                className="w-full pl-5 pr-14 py-6 rounded-xl border-2 border-muted focus:border-primary bg-muted/30 relative"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="dynamic" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg">
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 mr-2">
                <Link to="/planner" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">Planner</Link>
                <Link to="/compare" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">Compare</Link>
            </div>
            <ThemeToggle />
            {!user ? (
              <Link to="/auth" className="flex flex-col items-center group">
                <Button variant="ghost" size="icon" className="group-hover:bg-primary/10 group-hover:text-primary">
                  <User className="w-5 h-5" />
                </Button>
                <span className="text-[10px] font-bold text-foreground">Login</span>
              </Link>
            ) : (
              <Link to={user.role === 'seller' ? '/seller/dashboard' : '/profile'} className="flex flex-col items-center group">
                <Button variant="ghost" size="icon" className="group-hover:bg-primary/10 group-hover:text-primary">
                  <User className="w-5 h-5" />
                </Button>
                <span className="text-[10px] font-bold text-foreground truncate max-w-[60px]">{user.role === 'seller' ? 'Seller' : 'Profile'}</span>
              </Link>
            )}
            <CartSheet />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border animate-in slide-in-from-top-5 duration-300">
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-5 pr-14 h-12 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="dynamic" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10">
                <Search className="w-5 h-5" />
              </Button>
            </form>
            <nav className="flex flex-col gap-1">
              <Link 
                to="/planner"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary font-bold mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Project Planner
              </Link>
              <Link 
                to="/compare"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/5 text-accent font-bold mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Product Comparison
              </Link>
              <div className="h-px bg-border mb-4" />
              {categoryItems.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="px-4 py-3 rounded-xl hover:bg-muted font-medium transition-colors"
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
