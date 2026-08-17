import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Plus, LogOut, Store, MapPin, Mail, Phone, BarChart3, Package, ShoppingBag, MessageCircle, CheckCircle, XCircle, Clock } from "lucide-react";
import { ProductForm } from "@/components/ProductForm";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { placeholderImage } from "@/lib/utils";

interface SellerOrder {
  id: string;
  createdAt: number;
  phoneNumber?: string;
  status?: string;
  totalAmount?: number;
  items: Array<{
    id: string;
    sellerId?: string;
    price: number;
    quantity: number;
  }>;
}

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isSeller } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    activeListings: 0,
    outOfStock: 0,
  });
  
  const [orders, setOrders] = useState<SellerOrder[]>([]);

  useEffect(() => {
    if (!isSeller()) {
      navigate("/auth");
    }
  }, [isSeller, navigate]);

  const getAuthToken = () => {
    return localStorage.getItem("fundimart_token") || localStorage.getItem("token") || ""; 
  };

  const fetchSellerProducts = async () => {
    if (!user?.id) return;
    try {
      const token = getAuthToken();
      const response = await fetch("/api/products?limit=100&status=ALL", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to load DB products");
      const result = await response.json();
      const dbProducts = ((result.data || []) as Product[]).filter((p) => p.sellerId === user.id);
      setProducts(dbProducts);
      setStats(prev => ({ 
        ...prev, 
        activeListings: dbProducts.length, 
        outOfStock: dbProducts.filter((p) => p.stock === 0).length 
      }));
    } catch (error) {
      console.warn("Error fetching seller products, falling back to localStorage:", error);
      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const sellerProducts = allProducts.filter((p: Product) => p.sellerId === user.id);
      setProducts(sellerProducts);
      setStats(prev => ({ 
        ...prev, 
        activeListings: sellerProducts.length, 
        outOfStock: sellerProducts.filter((p: Product) => p.stock === 0).length 
      }));
    }
  };

  useEffect(() => {
    fetchSellerProducts();

    if (user?.id) {
      const allOrders: SellerOrder[] = JSON.parse(localStorage.getItem("fundimart_orders") || "[]");
      let sellerRevenue = 0;
      let sellerSalesCount = 0;
      const sellerOrders: SellerOrder[] = [];

      allOrders.forEach((order) => {
        order.items.forEach((item) => {
          if (item.sellerId === user.id) {
            sellerRevenue += item.price * item.quantity;
            sellerSalesCount += item.quantity;
          }
        });
        const hasSellerItem = order.items?.some((item) => item.sellerId === user.id);
        if (hasSellerItem) {
          sellerOrders.push(order);
        }
      });

      setStats(prev => ({
        ...prev,
        totalSales: sellerSalesCount,
        totalRevenue: sellerRevenue,
      }));

      setOrders(sellerOrders.sort((a, b) => b.createdAt - a.createdAt));
    }
  }, [user]);

  const handleAddProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const token = getAuthToken();

      const photosArray = data.photos && data.photos.length > 0 
        ? data.photos 
        : (data as any).image ? [(data as any).image] : [];
      
      const singleImage = photosArray[0] || (data as any).image || "";

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ 
          name: data.name, 
          price: data.price, 
          unit: data.unit, 
          stock: data.stock, 
          category: data.category || "general", 
          description: data.description || "",
          photos: photosArray,
          image: singleImage
        })
      });

      if (!response.ok) throw new Error("Failed to add product");

      const result = await response.json();
      const createdDbProduct = result.data || result.product || {};

      const newLocalProduct: Product = {
        ...data,
        id: createdDbProduct.id || `prod_${Date.now()}`,
        sellerId: user?.id || "",
        sellerName: user?.seller?.hardwareName || `${user?.firstName} ${user?.lastName}`,
        photos: photosArray,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: "active",
      };

      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      allProducts.push(newLocalProduct);
      localStorage.setItem("fundimart_products", JSON.stringify(allProducts));

      toast.success("Product added successfully!");
      setIsAddingProduct(false);
      fetchSellerProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProduct) return;
    setIsLoading(true);
    try {
      const token = getAuthToken();

      const photosArray = data.photos && data.photos.length > 0 
        ? data.photos 
        : (data as any).image ? [(data as any).image] : [];
      const singleImage = photosArray[0] || (data as any).image || "";

      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          ...data,
          photos: photosArray,
          image: singleImage
        })
      });

      if (!response.ok) throw new Error("Failed to update product");

      const updatedProduct: Product = { 
        ...editingProduct, 
        ...data, 
        photos: photosArray,
        updatedAt: Date.now() 
      };

      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const index = allProducts.findIndex((p: Product) => p.id === editingProduct.id);
      if (index !== -1) {
        allProducts[index] = updatedProduct;
        localStorage.setItem("fundimart_products", JSON.stringify(allProducts));
      }

      toast.success("Product updated successfully!");
      setEditingProduct(null);
      fetchSellerProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProductId) return;
    setIsLoading(true);
    try {
      const token = getAuthToken();
      await fetch(`/api/products/${deletingProductId}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });

      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      localStorage.setItem("fundimart_products", JSON.stringify(allProducts.filter((p: Product) => p.id !== deletingProductId)));

      toast.success("Product deleted successfully!");
      setDeletingProductId(null);
      fetchSellerProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Deletion failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const allOrders: SellerOrder[] = JSON.parse(localStorage.getItem("fundimart_orders") || "[]");
    const updated = allOrders.map((o) => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem("fundimart_orders", JSON.stringify(updated));
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Order marked as ${newStatus}`);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "accepted": return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Accepted</Badge>;
      case "preparing": return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Preparing</Badge>;
      case "delivered": return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Delivered</Badge>;
      case "cancelled": return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Cancelled</Badge>;
      default: return <Badge variant="outline">Pending</Badge>;
    }
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
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    Total Revenue
                  </CardDescription>
                  <CardTitle className="text-2xl">KES {stats.totalRevenue.toLocaleString()}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
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
                    <Package className="h-4 w-4 text-primary" />
                    Out of Stock
                  </CardDescription>
                  <CardTitle className={`text-2xl ${stats.outOfStock > 0 ? 'text-red-500' : ''}`}>{stats.outOfStock}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No orders yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                          <div>
                            <p className="font-medium text-sm">Order #{order.id?.slice(-8)}</p>
                            <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm">KES {(order.totalAmount || 0).toLocaleString()}</p>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

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

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Orders</CardTitle>
                <CardDescription>Review and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-center py-12 text-muted-foreground">No incoming orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border-border/50">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <p className="font-bold text-lg">Order #{order.id?.slice(-8)}</p>
                              <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{order.phoneNumber}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <a
                                href={`tel:${order.phoneNumber}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                              >
                                <Phone className="w-4 h-4" /> Call
                              </a>
                              <a
                                href={`https://wa.me/${order.phoneNumber?.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                              >
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                              </a>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" className="border-green-500 text-green-600" onClick={() => updateOrderStatus(order.id, "accepted")}>
                              <CheckCircle className="w-4 h-4 mr-1" /> Accept
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-500 text-blue-600" onClick={() => updateOrderStatus(order.id, "preparing")}>
                              <Clock className="w-4 h-4 mr-1" /> Preparing
                            </Button>
                            <Button size="sm" variant="outline" className="border-green-500 text-green-600" onClick={() => updateOrderStatus(order.id, "delivered")}>
                              <CheckCircle className="w-4 h-4 mr-1" /> Delivered
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-500 text-red-600" onClick={() => updateOrderStatus(order.id, "cancelled")}>
                              <XCircle className="w-4 h-4 mr-1" /> Reject
                            </Button>
                          </div>
                          {order.status && (
                            <div className="mt-3">
                              {getStatusBadge(order.status)}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
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
                        src={product.photos?.[0] || placeholderImage(product.name, 400, 300)}
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
                        <Button variant="outline" size="sm" className="flex-1 flex items-center gap-2" onClick={() => setEditingProduct(product)}>
                          <Edit className="h-4 w-4" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1 flex items-center gap-2" onClick={() => setDeletingProductId(product.id)}>
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Fill in the details for your new product</DialogDescription>
          </DialogHeader>
          <ProductForm onSubmit={handleAddProduct} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the details for your product</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm initialData={editingProduct} onSubmit={handleUpdateProduct} isLoading={isLoading} />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingProductId} onOpenChange={() => setDeletingProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this product? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SellerDashboard;