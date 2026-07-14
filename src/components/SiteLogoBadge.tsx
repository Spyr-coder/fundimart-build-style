// src/components/SiteLogoBadge.tsx
import { Link } from "react-router-dom";
import fundimartLogo from "@/assets/fundimart-logo.jpeg";

const SiteLogoBadge = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 15px var(--primary-glow, rgba(59, 130, 246, 0.4))); }
          50% { filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 0 30px var(--primary-glow, rgba(59, 130, 246, 0.8))); }
        }
        .animate-eye-catcher {
          animation: float 4s ease-in-out infinite, pulseGlow 3s ease-in-out infinite;
        }
      `}</style>
      <Link to="/" className="block group animate-eye-catcher">
        <img
          src={fundimartLogo}
          alt="FundiMart Logo"
          // Replaced non-standard w-70 with clean, massive Tailwind sizing and added a crisp border look
          className="w-44 h-44 sm:w-56 sm:h-56 object-contain rounded-full bg-white/90 p-2 border-2 border-primary/20 transition-transform duration-300 group-hover:scale-110"
        />
      </Link>
    </div>
  );
};

export default SiteLogoBadge;