import { Page } from "@playwright/test";

export const SELLER_USER = {
  id: "seller_1",
  email: "seller@fundimart.test",
  firstName: "Kim",
  lastName: "Karani",
  phone: "+254700000000",
  role: "seller",
  createdAt: 1700000000000,
  seller: {
    id: "seller_1",
    userId: "seller_1",
    hardwareName: "Karani Hardware",
    location: "Nairobi, CBD",
    firmEmail: "orders@karanihardware.com",
    isVerified: true,
    createdAt: 1700000000000,
  },
};

export const SEED_PRODUCTS = [
  {
    id: "prod_cement_1",
    name: "Simba Cement 50kg",
    category: "Cement",
    price: 750,
    unit: "bag",
    stock: 200,
    quality: "Best Seller",
    description: "High-strength Portland cement for general construction.",
    photos: ["https://via.placeholder.com/300x300?text=Cement"],
    sellerId: "seller_1",
    sellerName: "Karani Hardware",
    sellerContact: "+254711111111",
    warehouseLocation: "Industrial Area, Nairobi",
    status: "active",
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    rating: 4.8,
    reviews: 34,
  },
  {
    id: "prod_steel_1",
    name: "Rebar 12mm (Bundles)",
    category: "Steel",
    price: 2600,
    unit: "bundle",
    stock: 80,
    quality: "New",
    description: "Torsion steel bars for reinforcement.",
    photos: ["https://via.placeholder.com/300x300?text=Rebar"],
    sellerId: "seller_1",
    sellerName: "Karani Hardware",
    sellerContact: "+254711111111",
    warehouseLocation: "Industrial Area, Nairobi",
    status: "active",
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    rating: 4.5,
    reviews: 12,
  },
  {
    id: "prod_timber_1",
    name: "Timber Plank 2x4",
    category: "Timber",
    price: 450,
    unit: "piece",
    stock: 500,
    quality: "Hot Deal",
    description: "Kiln-dried softwood timber plank.",
    photos: ["https://via.placeholder.com/300x300?text=Timber"],
    sellerId: "seller_1",
    sellerName: "Karani Hardware",
    sellerContact: "+254711111111",
    warehouseLocation: "Industrial Area, Nairobi",
    status: "active",
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    rating: 4.2,
    reviews: 8,
  },
];

export function seedFundiMartData(page: Page): Promise<void> {
  return page.addInitScript(
    ({ products, users }) => {
      localStorage.setItem("fundimart_products", JSON.stringify(products));
      localStorage.setItem("fundimart_users", JSON.stringify(users));
    },
    { products: SEED_PRODUCTS, users: [SELLER_USER] }
  );
}
