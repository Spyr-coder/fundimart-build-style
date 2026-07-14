import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="py-10 md:py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <span className="inline-block px-3 py-1 md:px-4 md:py-1 bg-white/20 text-primary-foreground rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3 md:mb-4">
              Get 25% Off on All Power Tools
            </h2>
            <p className="text-sm md:text-base text-primary-foreground/80 max-w-lg">
              Professional-grade power tools for contractors and DIY enthusiasts. 
              Use code <span className="font-bold text-white">POWER25</span> at checkout.
            </p>
          </div>
          <Button variant="secondary" size="lg" className="group whitespace-nowrap w-full sm:w-auto">
            Shop Power Tools
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
