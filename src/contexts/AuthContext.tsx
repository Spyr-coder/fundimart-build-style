import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Seller } from "@/types/product";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  registerBuyer: (firstName: string, lastName: string, email: string, phone: string, password: string) => Promise<void>;
  registerSeller: (firstName: string, lastName: string, email: string, phone: string, password: string, hardwareName: string, location: string, firmEmail: string) => Promise<void>;
  logout: () => void;
  isSeller: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [otps, setOtps] = useState<Record<string, string>>({});

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("fundimart_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("fundimart_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Invalid email or password");
      }

      // Map backend response user model (name) to frontend user model (firstName, lastName)
      const [firstName = "", ...lastNameParts] = (result.user.name || "").split(" ");
      const lastName = lastNameParts.join(" ");

      const mappedUser: User = {
        id: result.user.id,
        email: result.user.email,
        firstName,
        lastName,
        phone: "", // Backend response does not contain phone
        role: result.user.role === "admin" ? "seller" : "buyer",
        createdAt: Date.now(),
      };

      setUser(mappedUser);
      localStorage.setItem("fundimart_token", result.token);
      localStorage.setItem("fundimart_user", JSON.stringify(mappedUser));
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (email: string) => {
    setIsLoading(true);
    try {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store it temporarily
      setOtps(prev => ({ ...prev, [email]: otp }));
      
      // Mock sending email
      console.log(`[AUTH] OTP for ${email}: ${otp}`);
      toast.info(`OTP sent to ${email} (Check console for demo)`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    return otps[email] === otp;
  };

  const registerBuyer = async (firstName: string, lastName: string, email: string, phone: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      const mappedUser: User = {
        id: result.user.id,
        email: result.user.email,
        firstName,
        lastName,
        phone,
        role: "buyer",
        createdAt: Date.now(),
      };

      setUser(mappedUser);
      localStorage.setItem("fundimart_token", result.token);
      localStorage.setItem("fundimart_user", JSON.stringify(mappedUser));
    } finally {
      setIsLoading(false);
    }
  };

  const registerSeller = async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    hardwareName: string,
    location: string,
    firmEmail: string
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      const sellerId = `seller_${Date.now()}`;
      const seller: Seller = {
        id: sellerId,
        userId: result.user.id,
        hardwareName,
        location,
        firmEmail,
        isVerified: true,
        createdAt: Date.now(),
      };

      const mappedUser: User = {
        id: result.user.id,
        email: result.user.email,
        firstName,
        lastName,
        phone,
        role: "seller",
        seller,
        createdAt: Date.now(),
      };

      setUser(mappedUser);
      localStorage.setItem("fundimart_token", result.token);
      localStorage.setItem("fundimart_user", JSON.stringify(mappedUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fundimart_user");
    localStorage.removeItem("fundimart_token");
  };

  const isSeller = () => {
    return user?.role === "seller";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, sendOTP, verifyOTP, registerBuyer, registerSeller, logout, isSeller }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
