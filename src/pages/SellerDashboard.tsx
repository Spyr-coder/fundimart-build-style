import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Plus, LogOut, Store, MapPin, Mail, Phone, BarChart3, Package, DollarSign, ShoppingBag, Wallet, CreditCard } from "lucide-react";
import { ProductForm } from "@/components/ProductForm";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types/product";
import { toast } from "sonner";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isSeller } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Stats
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    activeListings: 0,
    outOfStock: 0,
    walletBalance: 0,
    commissionPaid: 0
  });
  
  const [recentSales, setRecentSales] = useState<any[]>([]);

  // Redirect if not a seller
  useEffect(() => {
    if (!isSeller()) {
      navigate("/auth");
    }
  }, [isSeller, navigate]);

  // Load products and calculate stats from localStorage
  useEffect(() => {
    if (user?.id) {
      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const sellerProducts = allProducts.filter((p: Product) => p.sellerId === user.id);
      setProducts(sellerProducts);
      
      const allOrders = JSON.parse(localStorage.getItem("fundimart_orders") || "[]");
      
      // Calculate seller specific stats from orders
      let sellerRevenue = 0;
      let sellerSalesCount = 0;
      const sellerOrderItems: any[] = [];
      
      allOrders.forEach((order: any) => {
        order.items.forEach((item: any) => {
          if (item.sellerId === user.id) {
            sellerRevenue += item.price * item.quantity;
            sellerSalesCount += item.quantity;
            sellerOrderItems.push({
              id: order.id,
              productName: item.name,
              quantity: item.quantity,
              amount: item.price * item.quantity,
              date: order.createdAt,
              customer: order.phoneNumber
            });
          }
        });
      });
      
      // Calculate Commission (e.g., 5%)
      const commissionRate = 0.05;
      const commission = sellerRevenue * commissionRate;
      const balance = sellerRevenue - commission;

      setStats({
        totalSales: sellerSalesCount,
        totalRevenue: sellerRevenue,
        activeListings: sellerProducts.length,
        outOfStock: sellerProducts.filter((p: Product) => p.stock === 0).length,
        walletBalance: balance,
        commissionPaid: commission
      });
      
      setRecentSales(sellerOrderItems.sort((a, b) => b.date - a.date).slice(0, 5));
    }
  }, [user]);

  const handleAddProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newProduct: Product = {
        ...data,
        id: `product_${Date.now()}`,
        sellerId: user?.id || "",
        sellerName: user?.seller?.hardwareName || `${user?.firstName} ${user?.lastName}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: "active",
      };

      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      allProducts.push(newProduct);
      localStorage.setItem("fundimart_products", JSON.stringify(allProducts));

      setProducts([...products, newProduct]);
      setIsAddingProduct(false);
      
      setStats(prev => ({ ...prev, activeListings: prev.activeListings + 1 }));
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProduct) return;
    setIsLoading(true);
    try {
      const updatedProduct: Product = {
        ...editingProduct,
        ...data,
        // Ensure critical fields are preserved and not overwritten by empty strings from form
        sellerId: editingProduct.sellerId,
        sellerName: editingProduct.sellerName,
        status: data.status || editingProduct.status,
        updatedAt: Date.now(),
      };
      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const index = allProducts.findIndex((p: Product) => p.id === editingProduct.id);
      if (index !== -1) {
        allProducts[index] = updatedProduct;
        localStorage.setItem("fundimart_products", JSON.stringify(allProducts));
      }
      setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)));
      setEditingProduct(null);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProductId) return;
    setIsLoading(true);
    try {
      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const filtered = allProducts.filter((p: Product) => p.id !== deletingProductId);
      localStorage.setItem("fundimart_products", JSON.stringify(filtered));
      setProducts(products.filter((p) => p.id !== deletingProductId));
      setDeletingProductId(null);
      setStats(prev => ({ ...prev, activeListings: prev.activeListings - 1 }));
      alert("Product deleted successfully!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleWithdraw = () => {
      alert(`Withdrawal request for KES ${stats.walletBalance.toLocaleString()} initiated. Funds will be sent to your registered M-Pesa number.`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border py-6 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {user?.firstName}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="wallet">Wallet & Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
                 {/* Progress Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        Total Revenue
                    </CardDescription>
                    <CardTitle className="text-2xl">KES {stats.totalRevenue.toLocaleString()}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                        Total Sales
                    </CardDescription>
                    <CardTitle className="text-2xl">{stats.totalSales} items</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        Active Products
                    </CardDescription>
                    <CardTitle className="text-2xl">{stats.activeListings}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className={`${stats.outOfStock > 0 ? 'bg-red-500/5 border-red-500/20' : 'bg-primary/5 border-primary/20'}`}>
                    <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        Out of Stock
                    </CardDescription>
                    <CardTitle className={`text-2xl ${stats.outOfStock > 0 ? 'text-red-500' : ''}`}>{stats.outOfStock}</CardTitle>
                    </CardHeader>
                </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Sales Section */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Recent Sales
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    {recentSales.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No sales yet.</p>
                    ) : (
                        <div className="space-y-4">
                        {recentSales.map((sale, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                            <div>
                                <p className="font-medium text-sm">{sale.productName}</p>
                                <p className="text-xs text-muted-foreground">{new Date(sale.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm">KES {sale.amount.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">Qty: {sale.quantity}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    )}
                    </CardContent>
                </Card>

                {/* Store Information Card */}
                {user?.seller && (
                    <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Store className="h-5 w-5" />
                        Store Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                            <p className="text-sm text-muted-foreground">Store Name</p>
                            <p className="text-lg font-semibold">{user.seller.hardwareName}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{user.seller.location}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{user.seller.firmEmail}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{user.phone}</span>
                            </div>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                )}
                </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                    <h2 className="text-2xl font-bold text-foreground">Manage Inventory</h2>
                    <p className="text-muted-foreground mt-1">{products.length} product(s) in your catalog</p>
                    </div>
                    <Button onClick={() => setIsAddingProduct(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                    </Button>
                </div>

                {products.length === 0 ? (
                    <Card className="text-center py-12">
                    <CardContent>
                        <p className="text-muted-foreground mb-4">No products yet. Start by adding your first product!</p>
                        <Button onClick={() => setIsAddingProduct(true)} className="flex items-center gap-2 mx-auto">
                        <Plus className="h-4 w-4" />
                        Add Your First Product
                        </Button>
                    </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-border/50">
                        <div className="h-48 bg-muted overflow-hidden relative">
                            <img
                            src={product.photos[0] || "https://via.placeholder.com/400x300?text=" + encodeURIComponent(product.name)}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                            {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <Badge variant="destructive" className="text-sm px-3 py-1">OUT OF STOCK</Badge>
                            </div>
                            )}
                        </div>

                        <CardContent className="flex-1 flex flex-col pt-4">
                            <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                            <Badge variant="secondary">{product.category}</Badge>
                            </div>

                            <p className="text-2xl font-bold text-primary mb-2">KES {product.price.toLocaleString()}</p>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                                <p className="text-muted-foreground">Current Stock</p>
                                <p className={`font-semibold ${product.stock < 5 ? 'text-red-500' : ''}`}>{product.stock} units</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Quality</p>
                                <p className="font-semibold">{product.quality || "Standard"}</p>
                            </div>
                            </div>

                            <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 flex items-center gap-2"
                                onClick={() => setEditingProduct(product)}
                            >
                                <Edit className="h-4 w-4" />
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="flex-1 flex items-center gap-2"
                                onClick={() => setDeletingProductId(product.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                            </div>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
                         <CardHeader>
                             <CardTitle className="flex items-center gap-2 text-slate-300">
                                 <Wallet className="w-5 h-5" /> Wallet Balance
                             </CardTitle>
                         </CardHeader>
                         <CardContent>
                             <div className="mb-6">
                                 <p className="text-4xl font-bold">KES {stats.walletBalance.toLocaleString()}</p>
                                 <p className="text-sm text-slate-400 mt-2">Available for withdrawal</p>
                             </div>
                             <Button onClick={handleWithdraw} className="w-full bg-green-600 hover:bg-green-700 text-white">
                                 <CreditCard className="w-4 h-4 mr-2" /> Withdraw Funds
                             </Button>
                         </CardContent>
                     </Card>

                     <Card>
                         <CardHeader>
                             <CardTitle>Financial Summary</CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                             <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                 <span className="text-muted-foreground">Total Revenue Generated</span>
                                 <span className="font-semibold">KES {stats.totalRevenue.toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                 <span className="text-muted-foreground">Platform Commission (5%)</span>
                                 <span className="font-semibold text-red-500">- KES {stats.commissionPaid.toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                 <span className="text-muted-foreground">Net Earnings</span>
                                 <span className="font-semibold text-green-600">KES {(stats.totalRevenue - stats.commissionPaid).toLocaleString()}</span>
                             </div>
                         </CardContent>
                     </Card>
                 </div>

                 <Card>
                     <CardHeader>
                         <CardTitle>Transaction History</CardTitle>
                         <CardDescription>Recent earnings and withdrawals</CardDescription>
                     </CardHeader>
                     <CardContent>
                         {recentSales.length === 0 ? (
                             <p className="text-center py-8 text-muted-foreground">No transactions yet.</p>
                         ) : (
                             <table className="w-full text-sm text-left">
                                 <thead className="bg-muted text-muted-foreground uppercase">
                                     <tr>
                                         <th className="px-4 py-3">Date</th>
                                         <th className="px-4 py-3">Description</th>
                                         <th className="px-4 py-3">Amount</th>
                                         <th className="px-4 py-3">Status</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-border">
                                     {recentSales.map((sale, i) => (
                                         <tr key={i}>
                                             <td className="px-4 py-3">{new Date(sale.date).toLocaleDateString()}</td>
                                             <td className="px-4 py-3">Sale - {sale.productName}</td>
                                             <td className="px-4 py-3 font-semibold text-green-600">+ KES {(sale.amount * 0.95).toLocaleString()}</td>
                                             <td className="px-4 py-3"><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge></td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         )}
                     </CardContent>
                 </Card>
            </TabsContent>
        </Tabs>
      </main>

      {/* Add Product Dialog */}
      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details for your new product
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSubmit={handleAddProduct} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for your product
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm initialData={editingProduct} onSubmit={handleUpdateProduct} isLoading={isLoading} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingProductId} onOpenChange={() => setDeletingProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SellerDashboard;
