import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from '@/components/ProductForm';
<<<<<<< HEAD
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { toast } from 'sonner';
import { products as staticProducts } from '@/data/products';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 1. Get existing products from localStorage
    const storedProductsRaw = localStorage.getItem("fundimart_products");
    let storedProducts = [];
    
    if (storedProductsRaw) {
      storedProducts = JSON.parse(storedProductsRaw);
    } else {
      // 2. If empty, initialize with static products to make them dynamic
      storedProducts = staticProducts.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        stock: 100,
        photos: [p.image],
        sellerId: "admin-static",
        sellerName: "System",
        status: "active",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        quality: p.badge || "Premium",
        description: p.description
      }));
      localStorage.setItem("fundimart_products", JSON.stringify(storedProducts));
    }
    
    setProducts(storedProducts);
  }, []);

  const handleAddProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newProduct: Product = {
        ...data,
        id: `admin_prod_${Date.now()}`,
        sellerId: "admin",
        sellerName: "Fundimart Admin",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: "active",
      };

      const allStoredProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      allStoredProducts.push(newProduct);
      localStorage.setItem("fundimart_products", JSON.stringify(allStoredProducts));

      setProducts(allStoredProducts);
      setShowAddModal(false);
      toast.success("Product added successfully!");
=======
import { Edit2, Trash2, Plus, Check, X, Loader2 } from 'lucide-react';
import { Product } from '@/types/product';
import { toast } from 'sonner';

// Custom type extension matching the backend Product model properties
interface APIProduct extends Omit<Product, 'status'> {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function AdminProducts() {
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<APIProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  // Get administrative auth headers
  const getHeaders = () => {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Fetch all products on mount (admin bypass filters to see PENDING and REJECTED)
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Adding status filter query parameter as admin to fetch everything
      const response = await fetch('/api/products?limit=100', {
        headers: getHeaders()
      });
      const resData = await response.json();
      
      if (resData.success && Array.isArray(resData.data)) {
        setProducts(resData.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      toast.error("Failed to load products from server");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update Product Status (Approve or Reject)
  const handleStatusUpdate = async (id: string, newStatus: 'APPROVED' | 'REJECTED' | 'PENDING') => {
    setIsActionLoading(id);
    try {
      const response = await fetch(`/api/products/${id}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();

      if (data.success) {
        toast.success(`Product state updated to ${newStatus}`);
        setProducts((prev) => 
          prev.map((p) => p.id === id ? { ...p, status: newStatus } : p)
        );
      } else {
        toast.error(data.message || "Failed to update product status");
      }
    } catch (error) {
      toast.error("An error occurred updating status");
    } finally {
      setIsActionLoading(null);
    }
  };

  // Add a new product via Backend API
  const handleAddProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      const resData = await response.json();

      if (resData.success) {
        toast.success("Product created successfully!");
        setShowAddModal(false);
        fetchProducts(); // Refresh listings
      } else {
        toast.error(resData.message || "Failed to create product");
      }
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
=======
  // Edit existing product details via Backend API
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
  const handleEditProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProduct) return;
    setIsLoading(true);
    try {
<<<<<<< HEAD
      const updatedProduct: Product = {
        ...editingProduct,
        ...data,
        updatedAt: Date.now(),
      };

      const allStoredProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const index = allStoredProducts.findIndex((p: Product) => p.id === editingProduct.id);
      if (index !== -1) {
        allStoredProducts[index] = updatedProduct;
        localStorage.setItem("fundimart_products", JSON.stringify(allStoredProducts));
      }

      setProducts(allStoredProducts);
      setEditingProduct(null);
      toast.success("Product updated successfully!");
=======
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      const resData = await response.json();

      if (resData.success) {
        toast.success("Product updated successfully! Sent to pending review.");
        setEditingProduct(null);
        fetchProducts(); // Refresh listings
      } else {
        toast.error(resData.message || "Failed to update product");
      }
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const allStoredProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
        const filtered = allStoredProducts.filter((p: Product) => p.id !== id);
        localStorage.setItem("fundimart_products", JSON.stringify(filtered));
        setProducts(filtered);
        toast.success("Product deleted successfully");
=======
  // Delete a product permanently from Database
  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this product?")) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        const data = await response.json();

        if (data.success) {
          toast.success("Product deleted successfully");
          setProducts(prev => prev.filter(p => p.id !== id));
        } else {
          toast.error(data.message || "Failed to delete product");
        }
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

<<<<<<< HEAD
=======
  // Generate CSS styling class based on status
  const getStatusBadge = (status: APIProduct['status']) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-950 text-green-400 border border-green-800';
      case 'REJECTED':
        return 'bg-red-950 text-red-400 border border-red-800';
      case 'PENDING':
      default:
        return 'bg-amber-950 text-amber-400 border border-amber-800';
    }
  };

>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Products Management</CardTitle>
          <p className="text-sm text-slate-400 mt-1">{products.length} total products in database</p>
        </div>
<<<<<<< HEAD
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
=======
        <Button onClick={() => setShowAddModal(true)} className="gap-2 bg-amber-600 hover:bg-amber-700 text-white">
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
          <Plus size={18} />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
<<<<<<< HEAD
              <TableRow className="border-slate-700">
=======
              <TableRow className="border-slate-700 hover:bg-transparent">
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
                <TableHead className="text-slate-300">Name</TableHead>
                <TableHead className="text-slate-300">Category</TableHead>
                <TableHead className="text-slate-300">Price (KES)</TableHead>
                <TableHead className="text-slate-300">Stock</TableHead>
<<<<<<< HEAD
                <TableHead className="text-slate-300">Seller</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-400">
=======
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300 text-center">Approval Actions</TableHead>
                <TableHead className="text-slate-300 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
                    Fetching products from database...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-400">
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
                    No products found in the database.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => {
                  return (
<<<<<<< HEAD
                    <TableRow key={product.id} className="border-slate-700">
                      <TableCell className="text-white font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-slate-300">{product.category}</TableCell>
                      <TableCell className="text-slate-300">KES {product.price.toLocaleString()}</TableCell>
                      <TableCell className="text-slate-300">{product.stock} units</TableCell>
                      <TableCell className="text-slate-300">
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-700">
                          {product.sellerName}
                        </span>
                      </TableCell>
                      <TableCell className="space-x-2">
=======
                    <TableRow key={product.id} className="border-slate-700 hover:bg-slate-700/30">
                      <TableCell className="text-white font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-slate-300 capitalize">{product.category}</TableCell>
                      <TableCell className="text-slate-300">KES {product.price.toLocaleString()}</TableCell>
                      <TableCell className="text-slate-300">{product.stock} units</TableCell>
                      <TableCell className="text-slate-300">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusBadge(product.status)}`}>
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isActionLoading !== null}
                            onClick={() => handleStatusUpdate(product.id, 'APPROVED')}
                            className="bg-green-950/40 hover:bg-green-900 border-green-800 text-green-400 h-8 w-8 p-0"
                            title="Approve Listing"
                          >
                            {isActionLoading === product.id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <Check size={14} />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isActionLoading !== null}
                            onClick={() => handleStatusUpdate(product.id, 'REJECTED')}
                            className="bg-red-950/40 hover:bg-red-900 border-red-800 text-red-400 h-8 w-8 p-0"
                            title="Reject Listing"
                          >
                            {isActionLoading === product.id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <X size={14} />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
<<<<<<< HEAD
                          className="gap-2"
                        >
                          <Edit2 size={16} />
                          Edit
=======
                          className="gap-2 border-slate-600 hover:bg-slate-700 text-slate-300"
                        >
                          <Edit2 size={14} />
                          <span className="hidden lg:inline">Edit</span>
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="gap-2"
                        >
<<<<<<< HEAD
                          <Trash2 size={16} />
                          Delete
=======
                          <Trash2 size={14} />
                          <span className="hidden lg:inline">Delete</span>
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add Product Dialog */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="fixed left-[50%] top-[50%] z-50 max-w-2xl w-full max-h-[85vh] translate-x-[-50%] translate-y-[-50%] overflow-y-auto bg-slate-900 border-slate-700 text-white p-6 shadow-lg duration-200">
          <DialogHeader>
            <DialogTitle>Add New Product (Admin)</DialogTitle>
            <DialogDescription className="text-slate-400">
              Fill in the details for the new product to be listed on the website.
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSubmit={handleAddProduct} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="fixed left-[50%] top-[50%] z-50 max-w-2xl w-full max-h-[85vh] translate-x-[-50%] translate-y-[-50%] overflow-y-auto bg-slate-900 border-slate-700 text-white p-6 shadow-lg duration-200">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
<<<<<<< HEAD
            <DialogDescription className="text-slate-9500">
              Update the details for this product.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm initialData={editingProduct} onSubmit={handleEditProduct} isLoading={isLoading} />
=======
            <DialogDescription className="text-slate-400">
              Update the details for this product. Editing will reset status to PENDING.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm 
              initialData={{
                ...editingProduct,
                // Maps your string single-image fallback arrays into a valid type format
                photos: editingProduct.photos || []
              } as unknown as Product} 
              onSubmit={handleEditProduct} 
              isLoading={isLoading} 
            />
>>>>>>> b7d4a3936449421f9ca19730c2603ba6e0185db8
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}