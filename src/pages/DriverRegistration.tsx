import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Truck, User, MapPin, FileText } from "lucide-react";

const DriverRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleType: "",
    licensePlate: "",
    licenseNumber: "",
    operatingArea: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, vehicleType: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Save to localStorage for demo purposes
      const drivers = JSON.parse(localStorage.getItem("fundimart_drivers") || "[]");
      drivers.push({
        ...formData,
        id: `driver_${Date.now()}`,
        status: "pending_approval",
        joinedAt: Date.now()
      });
      localStorage.setItem("fundimart_drivers", JSON.stringify(drivers));

      toast.success("Registration submitted successfully! We will review your application.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        vehicleType: "",
        licensePlate: "",
        licenseNumber: "",
        operatingArea: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Become a Delivery Partner</h1>
            <p className="text-muted-foreground">Join our logistics network and earn by delivering construction materials.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Driver Registration</CardTitle>
              <CardDescription>Fill in your details and vehicle information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-2">
                        <User className="w-4 h-4" /> First Name
                    </Label>
                    <Input id="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="07XX XXXXXX" />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5" /> Vehicle Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Select onValueChange={handleSelectChange} value={formData.vehicleType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pickup">Pickup Truck (1T - 3T)</SelectItem>
                          <SelectItem value="canter">Canter (3T - 5T)</SelectItem>
                          <SelectItem value="lorry">Lorry (7T+)</SelectItem>
                          <SelectItem value="tipper">Tipper</SelectItem>
                          <SelectItem value="motorbike">Motorbike (Small items)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licensePlate">License Plate</Label>
                      <Input id="licensePlate" value={formData.licensePlate} onChange={handleChange} required placeholder="KXX 000X" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="licenseNumber" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Driving License No.
                        </Label>
                        <Input id="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="operatingArea" className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Preferred Operating Area
                        </Label>
                        <Input id="operatingArea" value={formData.operatingArea} onChange={handleChange} required placeholder="e.g., Nairobi, Kiambu, Mombasa" />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Submitting Application..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DriverRegistration;
