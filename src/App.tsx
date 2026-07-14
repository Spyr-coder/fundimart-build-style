import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import SiteLogoBadge from "@/components/SiteLogoBadge";
import Auth from "./pages/Auth";
import SellerLogin from "./pages/SellerLogin";
import Logout from "./pages/Logout";
import Category from "./pages/Category";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import SellerDashboard from "./pages/SellerDashboard";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import About from "./pages/About";
import HelpCenter from "./pages/HelpCenter";
import TrackOrder from "./pages/TrackOrder";
import OrderSuccess from "./pages/OrderSuccess";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import DriverRegistration from "./pages/DriverRegistration";
import LogisticsDashboard from "./pages/LogisticsDashboard";
import Contact from "./pages/Contact";
import ProjectPlanner from "./pages/ProjectPlanner";
import ProductComparison from "./pages/ProductComparison";
import FundiAI from "@/components/FundiAI";
import PaymentCallback from "./pages/PaymentCallback";
import ScrollToTop from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const API_URL = "https://jengamart-0.onrender.com";
const AppContent = () => {
  useEffect(() => {
    const handleThemeChange = (e: any) => {
      const isDark = e.detail?.theme === "dark";
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/seller/login" element={<SellerLogin />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* Logistics Pages */}
                <Route path="/driver/register" element={<DriverRegistration />} />
                <Route path="/logistics/dashboard" element={<LogisticsDashboard />} />
                {/* Info & Legal Pages */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                {/* Footer Link Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/planner" element={<ProjectPlanner />} />
                <Route path="/compare" element={<ProductComparison />} />
                <Route path="/payment/callback" element={<PaymentCallback />} />
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FundiAI />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
    <AppContent />
  </ThemeProvider>
);

export default App;
