import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isLoading?: boolean;
}

const CATEGORIES = [
  "Cement",
  "Steel",
  "Timber",
  "Sand and Ballast",
  "Roofing Materials",
  "Plumbing Materials",
  "Electrical Materials",
  "Tiles and Finishing Materials",
  "Power Tools",
  "Hand Tools",
  "Safety Gear",
  "Other",
];

export const ProductForm = ({ initialData, onSubmit, isLoading = false }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    quality: initialData?.quality || "",
    description: initialData?.description || "",
    photos: initialData?.photos || [],
    sellerContact: initialData?.sellerContact || "",
    warehouseLocation: initialData?.warehouseLocation || "",
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Photo size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, dataUrl],
      }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Please enter a product name");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    if (formData.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    onSubmit({
      ...formData,
      sellerId: initialData?.sellerId || "",
      sellerName: initialData?.sellerName || "",
      status: initialData?.status || "active",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base font-medium">Product Name *</Label>
        <Input
          id="name"
          type="text"
          placeholder="e.g., Portland Cement 50kg"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-base font-medium">Category *</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price & Stock Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-base font-medium">Price (KES) *</Label>
          <Input
            id="price"
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock" className="text-base font-medium">Quantity in Stock *</Label>
          <Input
            id="stock"
            type="number"
            placeholder="0"
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
            required
          />
        </div>
      </div>

      {/* Quality */}
      <div className="space-y-2">
        <Label htmlFor="quality" className="text-base font-medium">Quality/Grade</Label>
        <Input
          id="quality"
          type="text"
          placeholder="e.g., Grade A, Premium, Standard"
          value={formData.quality}
          onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
        />
      </div>

      {/* Seller & Warehouse Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sellerContact" className="text-base font-medium">Seller Contact Number</Label>
          <Input
            id="sellerContact"
            type="tel"
            placeholder="e.g., +254 7XX XXX XXX"
            value={formData.sellerContact}
            onChange={(e) => setFormData({ ...formData, sellerContact: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="warehouseLocation" className="text-base font-medium">Warehouse/Pickup Location</Label>
          <Input
            id="warehouseLocation"
            type="text"
            placeholder="e.g., Industrial Area, Nairobi"
            value={formData.warehouseLocation}
            onChange={(e) => setFormData({ ...formData, warehouseLocation: e.target.value })}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base font-medium">Description</Label>
        <Textarea
          id="description"
          placeholder="Add product details, specifications, usage instructions, etc."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
        />
      </div>

      {/* Photos */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Product Photos</Label>
        <div className="space-y-4">
          {/* Photo Upload */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-input"
            />
            <label htmlFor="photo-input" className="flex flex-col items-center gap-2 cursor-pointer">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <div className="text-sm text-muted-foreground text-center">
                <p className="font-medium text-foreground">Click to upload photos</p>
                <p>or drag and drop</p>
              </div>
            </label>
          </div>

          {/* Photo Preview Grid */}
          {formData.photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {formData.photos.length} photo(s) uploaded (Max 2MB per photo)
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? "Saving..." : initialData ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
};
