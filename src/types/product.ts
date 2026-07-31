export interface Seller {
  id: string;
  userId: string;
  hardwareName: string;
  location: string;
  firmEmail: string;
  isVerified?: boolean;
  createdAt: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "buyer" | "seller";
  seller?: Seller;
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  quality?: string;
  description?: string;
  photos: string[];
  sellerId: string;
  sellerName: string;
  sellerContact?: string;
  warehouseLocation?: string;
  status: string;
  createdAt: number;
  updatedAt: number;
<<<<<<< HEAD
=======
  // Missing properties added to clear out TypeScript compilation blocks:
  rating?: number;
  reviews?: number;
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: number;
<<<<<<< HEAD
}
=======
}
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
