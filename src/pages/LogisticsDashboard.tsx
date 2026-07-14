import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Package, Clock, CheckCircle, BarChart3, User } from "lucide-react";

// Mock Data Types
interface Delivery {
  id: string;
  orderId: string;
  customerName: string;
  location: string;
  status: "pending" | "assigned" | "in-transit" | "delivered";
  driverId?: string;
  driverName?: string;
  estimatedTime?: string;
}

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  vehicleType: string;
  status: "available" | "busy" | "offline";
  rating: number;
  totalDeliveries: number;
}

export default function LogisticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    // Mock Data Initialization
    const mockDeliveries: Delivery[] = [
      { id: "DEL-001", orderId: "ORD-1234", customerName: "John Doe", location: "Westlands, Nairobi", status: "in-transit", driverId: "DRV-001", driverName: "Samuel Kamau", estimatedTime: "2 hours" },
      { id: "DEL-002", orderId: "ORD-5678", customerName: "Jane Smith", location: "Thika Road, Ruiru", status: "pending", driverId: undefined, driverName: undefined },
      { id: "DEL-003", orderId: "ORD-9012", customerName: "Construction Co.", location: "Mombasa Road, Syokimau", status: "delivered", driverId: "DRV-002", driverName: "Peter Ochieng", estimatedTime: "Delivered" },
    ];

    const mockDrivers: Driver[] = [
      { id: "DRV-001", firstName: "Samuel", lastName: "Kamau", vehicleType: "Canter", status: "busy", rating: 4.8, totalDeliveries: 154 },
      { id: "DRV-002", firstName: "Peter", lastName: "Ochieng", vehicleType: "Pickup", status: "available", rating: 4.9, totalDeliveries: 210 },
      { id: "DRV-003", firstName: "David", lastName: "Njoroge", vehicleType: "Lorry", status: "offline", rating: 4.5, totalDeliveries: 89 },
    ];
    
    // Merge with any registered drivers from localStorage
    const storedDrivers = JSON.parse(localStorage.getItem("fundimart_drivers") || "[]");
    const formattedStoredDrivers = storedDrivers.map((d: any) => ({
        id: d.id,
        firstName: d.firstName,
        lastName: d.lastName,
        vehicleType: d.vehicleType,
        status: "pending_approval",
        rating: 0,
        totalDeliveries: 0
    }));

    setDeliveries(mockDeliveries);
    setDrivers([...mockDrivers, ...formattedStoredDrivers]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "assigned": return "bg-blue-100 text-blue-800";
      case "in-transit": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Logistics Dashboard</h1>
            <p className="text-gray-500">Manage deliveries, drivers, and routes</p>
          </div>
          <Button>Create Delivery Request</Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{deliveries.filter(d => d.status === 'in-transit').length}</div>
                    <p className="text-xs text-muted-foreground">2 urgent</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{deliveries.filter(d => d.status === 'pending').length}</div>
                    <p className="text-xs text-muted-foreground">Needs assignment</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Available Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{drivers.filter(d => d.status === 'available').length}</div>
                    <p className="text-xs text-muted-foreground">Out of {drivers.length} total</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground text-green-600">+15% from yesterday</p>
                </CardContent>
            </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex gap-2"><BarChart3 className="w-4 h-4"/> Overview</TabsTrigger>
            <TabsTrigger value="deliveries" className="flex gap-2"><Package className="w-4 h-4"/> Deliveries</TabsTrigger>
            <TabsTrigger value="drivers" className="flex gap-2"><Truck className="w-4 h-4"/> Fleet Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {deliveries.map(delivery => (
                                <div key={delivery.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-full ${delivery.status === 'delivered' ? 'bg-green-100' : 'bg-blue-100'}`}>
                                            {delivery.status === 'delivered' ? <CheckCircle className="w-4 h-4 text-green-600"/> : <Truck className="w-4 h-4 text-blue-600"/>}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{delivery.orderId} - {delivery.customerName}</p>
                                            <p className="text-xs text-muted-foreground">{delivery.location}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={getStatusColor(delivery.status)}>{delivery.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Route Map</CardTitle>
                        <CardDescription>Live tracking of active vehicles</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] bg-slate-100 rounded-md flex items-center justify-center relative overflow-hidden">
                        {/* Mock Map Placeholder */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Nairobi_OpenStreetMap.png')] bg-cover bg-center"></div>
                        <div className="relative z-10 text-center">
                            <MapPin className="w-8 h-8 text-red-500 mx-auto animate-bounce" />
                            <p className="text-sm font-semibold text-slate-600 mt-2">Live Map Integration Pending</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </TabsContent>

          <TabsContent value="deliveries">
            <Card>
                <CardHeader>
                    <CardTitle>Delivery Requests</CardTitle>
                    <CardDescription>Manage and assign incoming delivery orders</CardDescription>
                </CardHeader>
                <CardContent>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase">
                            <tr>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Assigned To</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {deliveries.map(delivery => (
                                <tr key={delivery.id}>
                                    <td className="px-4 py-3 font-medium">{delivery.orderId}</td>
                                    <td className="px-4 py-3">{delivery.customerName}</td>
                                    <td className="px-4 py-3 flex items-center gap-1"><MapPin className="w-3 h-3 text-gray-400"/> {delivery.location}</td>
                                    <td className="px-4 py-3">{delivery.driverName || <span className="text-gray-400 italic">Unassigned</span>}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant="outline" className={getStatusColor(delivery.status)}>{delivery.status}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Button variant="outline" size="sm">Manage</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers">
            <Card>
                <CardHeader>
                    <CardTitle>Driver & Fleet Management</CardTitle>
                    <CardDescription>Monitor driver performance and vehicle status</CardDescription>
                </CardHeader>
                <CardContent>
                     <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase">
                            <tr>
                                <th className="px-4 py-3">Driver Name</th>
                                <th className="px-4 py-3">Vehicle</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Rating</th>
                                <th className="px-4 py-3">Total Jobs</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {drivers.map(driver => (
                                <tr key={driver.id}>
                                    <td className="px-4 py-3 font-medium flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                            <User className="w-4 h-4 text-slate-500"/>
                                        </div>
                                        {driver.firstName} {driver.lastName}
                                    </td>
                                    <td className="px-4 py-3">{driver.vehicleType}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            driver.status === 'available' ? 'bg-green-100 text-green-800' :
                                            driver.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {driver.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">⭐ {driver.rating > 0 ? driver.rating : 'N/A'}</td>
                                    <td className="px-4 py-3">{driver.totalDeliveries}</td>
                                    <td className="px-4 py-3">
                                        <Button variant="ghost" size="sm">View Profile</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
