import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Loader2 } from "lucide-react";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => void;
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

const UNITS = [
  "kg",
  "50kg bag",
  "ton",
  "piece",
  "meter",
  "feet",
  "liter",
  "box",
  "set",
  "trip / lorry",
];

export const ProductForm = ({ initialData, onSubmit, isLoading = false }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || 0,
    unit: initialData?.unit || "",
    stock: initialData?.stock || 0,
    quality: initialData?.quality || "",
    description: initialData?.description || "",
    photos: initialData?.photos || (initialData?.image ? [initialData.image] : []),
    sellerContact: initialData?.sellerContact || "",
    warehouseLocation: initialData?.warehouseLocation || "",
  });

  const [uploading, setUploading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    const validPhotos: string[] = [];
    let count = 0;

    files.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 2MB`);
        count++;
        if (count === files.length) setUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        validPhotos.push(dataUrl);
        count++;

        if (count === files.length) {
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, ...validPhotos],
          }));
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input value to allow uploading the same file again
    e.target.value = "";
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
    if (!formData.unit) {
      toast.error("Please select or enter a unit of measurement");
      return;
    }
    if (formData.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    const payload: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
      name: formData.name,
      category: formData.category,
      price: formData.price,
      unit: formData.unit,
      stock: formData.stock,
      quality: formData.quality,
      description: formData.description,
      photos: formData.photos,
      image: formData.photos[0] || "",
      sellerContact: formData.sellerContact,
      warehouseLocation: formData.warehouseLocation,
      sellerId: initialData?.sellerId || "",
      sellerName: initialData?.sellerName || "",
      status: initialData?.status || "PENDING",
      rating: initialData?.rating,
      reviews: initialData?.reviews,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base font-medium">
          Product Name *
        </Label>
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
        <Label htmlFor="category" className="text-base font-medium">
          Category *
        </Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
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

      {/* Price, Unit & Stock Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-base font-medium">
            Price (KES) *
          </Label>
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

        {/* Unit Selector */}
        <div className="space-y-2">
          <Label htmlFor="unit" className="text-base font-medium">
            Unit *
          </Label>
          <Select
            value={formData.unit}
            onValueChange={(value) => setFormData({ ...formData, unit: value })}
          >
            <SelectTrigger id="unit">
              <SelectValue placeholder="Select unit (e.g. 50kg bag)" />
            </SelectTrigger>
            <SelectContent>
              {UNITS.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock" className="text-base font-medium">
            Quantity in Stock *
          </Label>
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
        <Label htmlFor="quality" className="text-base font-medium">
          Quality/Grade
        </Label>
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
          <Label htmlFor="sellerContact" className="text-base font-medium">
            Seller Contact Number
          </Label>
          <Input
            id="sellerContact"
            type="tel"
            placeholder="e.g., +254 7XX XXX XXX"
            value={formData.sellerContact}
            onChange={(e) => setFormData({ ...formData, sellerContact: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="warehouseLocation" className="text-base font-medium">
            Warehouse/Pickup Location
          </Label>
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
        <Label htmlFor="description" className="text-base font-medium">
          Description
        </Label>
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
          <div className="border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-input"
              disabled={uploading}
            />
            <label htmlFor="photo-input" className="flex flex-col items-center gap-2 cursor-pointer">
              {uploading ? (
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              ) : (
                <Upload className="h-6 w-6 text-muted-foreground" />
              )}
              <div className="text-sm text-muted-foreground text-center">
                <p className="font-medium text-foreground">
                  {uploading ? "Processing photos..." : "Click to upload photos"}
                </p>
                <p>Upload one or multiple images (Max 2MB per file)</p>
              </div>
            </label>
          </div>

          {formData.photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
                  <img
                    src={photo}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Cover Image
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-90 hover:opacity-100 transition-opacity"
                    title="Remove photo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {formData.photos.length} photo(s) selected
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full font-bold" size="lg" disabled={isLoading || uploading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving Listing...
          </>
        ) : initialData ? (
          "Update Product"
        ) : (
          "Add Product"
        )}
      </Button>
    </form>
  );
};