import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Home, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout on mount
    logout();
    
    // Optional: auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-[500px] text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8 text-primary">
            <LogOut className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">Logged Out Successfully</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Thank you for using FundiMart. You have been safely signed out of your account.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="w-5 h-5" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/auth">
                Sign In Again
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            Redirecting to home in a few seconds...
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Logout;
