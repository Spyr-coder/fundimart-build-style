import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, ShieldCheck, ShoppingCart, Truck, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Product Exploration",
      description: "Browse through our wide range of construction materials. Filter by category, price, and quality to find exactly what you need for your project.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "2. Seller Verification",
      description: "We take trust seriously. Every seller on FundiMart must undergo a rigorous verification process by our admin team before their products are listed.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: ShoppingCart,
      title: "3. Easy Order Placement",
      description: "Add items to your cart and checkout securely. We support multiple payment methods including M-Pesa for your convenience.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Truck,
      title: "4. Fast & Reliable Shipping",
      description: "Our dedicated logistics partners ensure your materials are delivered to your site safely and on time. Track your order in real-time.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Star,
      title: "5. Reviews & Feedback",
      description: "After delivery, share your experience. Your reviews help maintain high standards and assist other builders in making informed decisions.",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How FundiMart Works</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From the moment you start searching for materials to the final delivery at your construction site, we've designed every step to be seamless, secure, and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-6`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4">Ready to start building?</h2>
              <p className="text-muted-foreground mb-0 max-w-xl">
                Join thousands of builders and developers who trust FundiMart for their construction needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Browse Products <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/auth?tab=register&role=seller">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Become a Seller
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
