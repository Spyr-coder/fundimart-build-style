export interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  description: string;
  photos?: string[];
  quality?: string;
  sellerId?: string;
  sellerName?: string;
  sellerContact?: string;
  warehouseLocation?: string;
}

// Hardcoded mock items completely removed for the live production database environment.
export const products: Product[] = [];

export const categories = [
  { slug: "cement", name: "Cement", count: "0 items" },
  { slug: "steel", name: "Steel", count: "0 items" },
  { slug: "timber", name: "Timber", count: "0 items" },
  { slug: "sand-and-ballast", name: "Sand and Ballast", count: "0 items" },
  { slug: "roofing-materials", name: "Roofing Materials", count: "0 items" },
  { slug: "plumbing-materials", name: "Plumbing Materials", count: "0 items" },
  { slug: "electrical-materials", name: "Electrical Materials", count: "0 items" },
  { slug: "tiles-and-finishing-materials", name: "Tiles and Finishing Materials", count: "0 items" },
];