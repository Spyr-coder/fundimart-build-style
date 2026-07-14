import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
}

interface AddProductModalProps {
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

export default function AddProductModal({ onClose, onSubmit }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active' as const,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError(null);

    // Validate inputs
    if (!formData.name.trim()) {
      setError("Please enter a product name");
      return;
    }
    if (!formData.category) {
      setError("Please select a category");
      return;
    }
    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) {
      setError("Please enter a valid price (must be greater than 0)");
      return;
    }
    const stock = parseInt(formData.stock);
    if (formData.stock === "" || isNaN(stock) || stock < 0) {
      setError("Please enter a valid stock quantity");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate a brief delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));
      onSubmit({
        name: formData.name,
        category: formData.category,
        price,
        stock,
        status: formData.status,
      });
    } catch (err) {
      setError("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 max-w-md sm:max-w-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Add New Product</DialogTitle>
          <DialogDescription className="text-slate-400">
            Fill in the product details to add a new item to your catalog.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300 font-medium">
              Product Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white focus:ring-primary"
              placeholder="e.g. Portland Cement 50kg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-300 font-medium">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:ring-primary">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="cement-concrete">Cement & Concrete</SelectItem>
                <SelectItem value="steel-reinforcement">Steel & Reinforcement</SelectItem>
                <SelectItem value="timber-wood">Timber & Wood</SelectItem>
                <SelectItem value="aggregates">Aggregates</SelectItem>
                <SelectItem value="power-tools">Power Tools</SelectItem>
                <SelectItem value="hand-tools">Hand Tools</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="safety-gear">Safety Gear</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-slate-300 font-medium">
                Price (KES)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white focus:ring-primary"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-slate-300 font-medium">
                Stock Quantity
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white focus:ring-primary"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-slate-300 font-medium">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as 'active' | 'inactive' })}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:ring-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Product'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
