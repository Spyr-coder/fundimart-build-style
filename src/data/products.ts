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
}

export const products: Product[] = [
  // CEMENT
  {
    id: "bamburi-nguvu-50kg",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    name: "Bamburi Nguvu Cement 50kg",
    price: 885,
    rating: 4.8,
    reviews: 324,
    badge: "Best Seller",
    category: "Cement",
    description: "Multipurpose Portland Pozzolana Cement. Ideal for concrete, mortar, and plaster.",
  },
  {
    id: "bamburi-fundi-50kg",
    image: "https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=400&h=400&fit=crop",
    name: "Bamburi Fundi Cement 50kg",
    price: 790,
    rating: 4.6,
    reviews: 156,
    category: "Cement",
    description: "Specially formulated for masonry, plastering, and jointing.",
  },
  {
    id: "bamburi-tembo-50kg",
    image: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=400&h=400&fit=crop",
    name: "Bamburi Tembo Cement 50kg",
    price: 850,
    rating: 4.7,
    reviews: 210,
    category: "Cement",
    description: "Reliable and versatile cement for general construction.",
  },
  {
    id: "simba-cement-50kg",
    image: "https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=400&h=400&fit=crop",
    name: "Simba Cement 32.5R 50kg",
    price: 950,
    rating: 4.7,
    reviews: 189,
    category: "Cement",
    description: "High-quality cement suitable for all construction projects.",
  },

  // STEEL (REINFORCEMENT BARS)
  {
    id: "steel-bar-d8",
    image: "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=400&h=400&fit=crop",
    name: "Deformed Steel Bar D8 (12m)",
    price: 520,
    rating: 4.5,
    reviews: 87,
    category: "Steel",
    description: "12m Deformed Steel Bar D8 for structural reinforcement.",
  },
  {
    id: "steel-bar-d10",
    image: "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=400&h=400&fit=crop",
    name: "Deformed Steel Bar D10 (12m)",
    price: 770,
    rating: 4.6,
    reviews: 92,
    category: "Steel",
    description: "12m Deformed Steel Bar D10 for structural reinforcement.",
  },
  {
    id: "steel-bar-d12",
    image: "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=400&h=400&fit=crop",
    name: "Deformed Steel Bar D12 (12m)",
    price: 1150,
    rating: 4.9,
    reviews: 142,
    badge: "Hot Deal",
    category: "Steel",
    description: "12m Deformed Steel Bar D12 for structural reinforcement.",
  },
  {
    id: "high-tensile-16mm",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&h=400&fit=crop",
    name: "High Tensile Steel 16mm (per kg)",
    price: 145,
    rating: 4.6,
    reviews: 98,
    category: "Steel",
    description: "High Tensile Steel 16mm sold per kg.",
  },

  // WOOD (TIMBER)
  {
    id: "cypress-4x2",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=400&h=400&fit=crop",
    name: "Cypress Timber 4×2 (per ft)",
    price: 55,
    rating: 4.5,
    reviews: 234,
    category: "Timber",
    description: "Cypress Timber 4x2 sold per foot.",
  },
  {
    id: "pine-4x2",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    name: "Pine Timber 4×2 (per ft)",
    price: 38,
    rating: 4.4,
    reviews: 178,
    category: "Timber",
    description: "Pine Timber 4x2 sold per foot.",
  },
  {
    id: "cypress-2x2",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=400&h=400&fit=crop",
    name: "Cypress Timber 2×2 (per ft)",
    price: 28,
    rating: 4.3,
    reviews: 110,
    category: "Timber",
    description: "Cypress Timber 2x2 sold per foot.",
  },

  // PLUMBING MATERIALS
  {
    id: "pvc-32mm",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop",
    name: "PVC Pipe 32mm (6m)",
    price: 350,
    rating: 4.4,
    reviews: 65,
    category: "Plumbing Materials",
    description: "Standard 32mm PVC pipe for drainage.",
  },
  {
    id: "pvc-110mm",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop",
    name: "PVC Pipe 110mm (6m)",
    price: 2730,
    rating: 4.7,
    reviews: 87,
    category: "Plumbing Materials",
    description: "Heavy-duty 110mm PVC pipe for main drainage lines.",
  },
  {
    id: "hdpe-coupling-50mm",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop",
    name: "HDPE Coupling 50mm",
    price: 550,
    rating: 4.5,
    reviews: 42,
    category: "Plumbing Materials",
    description: "50mm HDPE coupling for water pipes.",
  },
  {
    id: "hdpe-elbow-40mm",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop",
    name: "HDPE Elbow Connector 40mm",
    price: 350,
    rating: 4.4,
    reviews: 38,
    category: "Plumbing Materials",
    description: "40mm HDPE elbow for pipe turns.",
  },
  {
    id: "pvc-tee",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop",
    name: "PVC Tee Connector",
    price: 200,
    rating: 4.2,
    reviews: 120,
    category: "Plumbing Materials",
    description: "Standard PVC Tee connector.",
  },
  {
    id: "magic-connector-4",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop",
    name: "Magic Connector 4\"",
    price: 300,
    rating: 4.8,
    reviews: 156,
    category: "Plumbing Materials",
    description: "Flexible Magic Connector 4\" for waste pipes.",
  },

  // ELECTRICAL MATERIALS
  {
    id: "pvc-conduit-20mm",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    name: "PVC Electrical Conduit 20mm (4m)",
    price: 120,
    rating: 4.5,
    reviews: 210,
    category: "Electrical Materials",
    description: "Protective PVC conduit for wiring.",
  },
  {
    id: "flexible-conduit-25mm",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    name: "Flexible Conduit 25mm (roll)",
    price: 2500,
    rating: 4.6,
    reviews: 78,
    category: "Electrical Materials",
    description: "Flexible conduit roll for versatile routing.",
  },

  // AGGREGATES (SAND AND BALLAST)
  {
    id: "fine-sand",
    image: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=400&h=400&fit=crop",
    name: "Fine Sand (per m³)",
    price: 3609,
    rating: 4.7,
    reviews: 312,
    category: "Sand and Ballast",
    description: "Fine sand for construction and plastering.",
  },
  {
    id: "ballast-m3",
    image: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=400&h=400&fit=crop",
    name: "Ballast / Coarse Aggregate (per m³)",
    price: 4467,
    rating: 4.8,
    reviews: 156,
    category: "Sand and Ballast",
    description: "Clean ballast for concrete mixes.",
  },

  // ROOFING MATERIALS
  {
    id: "roofing-sheet-box",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&h=400&fit=crop",
    name: "Box Profile Roofing Sheet (m)",
    price: 1200,
    rating: 4.7,
    reviews: 45,
    category: "Roofing Materials",
    description: "Durable box profile roofing sheets.",
  },

  // TILES AND FINISHING MATERIALS
  {
    id: "floor-tiles-60x60",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&h=400&fit=crop",
    name: "Floor Tiles 60x60 (per box)",
    price: 1850,
    rating: 4.8,
    reviews: 67,
    category: "Tiles and Finishing Materials",
    description: "High-quality ceramic floor tiles.",
  }
];

export const categories = [
  { slug: "cement", name: "Cement", count: "4 items" },
  { slug: "steel", name: "Steel", count: "4 items" },
  { slug: "timber", name: "Timber", count: "3 items" },
  { slug: "sand-and-ballast", name: "Sand and Ballast", count: "2 items" },
  { slug: "roofing-materials", name: "Roofing Materials", count: "1 item" },
  { slug: "plumbing-materials", name: "Plumbing Materials", count: "6 items" },
  { slug: "electrical-materials", name: "Electrical Materials", count: "2 items" },
  { slug: "tiles-and-finishing-materials", name: "Tiles and Finishing Materials", count: "1 item" },
];