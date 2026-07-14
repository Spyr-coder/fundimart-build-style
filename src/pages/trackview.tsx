import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Truck, Package, CheckCircle2, Navigation, Search, Clock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Import Leaflet standard components
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default marker icon paths
const warehouseIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const siteIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const truckIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// TypeScript interface defining exactly what the network returns
interface TrackingData {
  trackingNumber: string;
  status: number;
  truckLatitude: number;
  truckLongitude: number;
  driverName: string;
  driverPhone: string;
  vehiclePlate: string;
  estimatedArrival: string;
  currentLocationName: string;
  speedKmh: number;
}

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Real database metrics state storage
  const [liveData, setLiveData] = useState<TrackingData | null>(null);

  // Fixed coordinates for physical reference layout points
  const warehousePos: [number, number] = [-1.2921, 36.8219]; 
  const sitePos: [number, number] = [-1.1921, 36.9219];      

  // Network Fetch Action Logic
  const fetchOrderUpdates = async (showLoader = false) => {
    if (showLoader) setIsLoading(true);
    
    try {
      const response = await fetch(`/api/orders/track?id=${trackingNumber}`);
      
      if (!response.ok) {
        throw new Error("Invalid Tracking ID or order record not found");
      }
      
      const data: TrackingData = await response.json();
      setLiveData(data);
      setIsTracking(true);
    } catch (error: any) {
      console.error("Tracking network sync failure:", error);
      toast.error(error.message || "Network communication error occurred");
      setIsTracking(false);
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error("Please provide a valid tracking reference identifier");
      return;
    }
    fetchOrderUpdates(true);
  };

  // Automated Polling Pipeline Loop Setup
  useEffect(() => {
    if (!isTracking || !trackingNumber) return;

    // FIX: Explicitly typed using browser-native interval types instead of NodeJS namespace
    const pollInterval: ReturnType<typeof setInterval> = setInterval(() => {
      fetchOrderUpdates(false);
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [isTracking, trackingNumber]);

  const stages = [
    { title: "Confirmed", icon: CheckCircle2 },
    { title: "Processing", icon: Package },
    { title: "On the Way", icon: Truck },
    { title: "Delivered", icon: Navigation },
  ];

  // Safely fallback to warehouse coordinates if live latitude hasn't completed loading
  const currentTruckPos: [number, number] = liveData 
    ? [liveData.truckLatitude, liveData.truckLongitude] 
    : warehousePos;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Navigation className="w-10 h-10 text-primary animate-pulse" />
              Live Order Tracking
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitor your delivery status metrics directly via real-time GPS synchronization channels.
            </p>
          </div>

          <form onSubmit={handleTrackSubmit} className="mb-8">
            <Card className="border-none shadow-xl bg-primary/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input 
                      placeholder="Enter Tracking ID (e.g., FM-2025-XXXX)" 
                      className="pl-12 h-14 bg-background text-lg"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-14 px-10 gap-2 text-lg" disabled={isLoading}>
                    {isLoading ? (
                      <>Connecting... <Loader2 className="w-5 h-5 animate-spin" /></>
                    ) : (
                      <>Track Order <Navigation className="w-5 h-5" /></>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>

          <AnimatePresence>
            {isTracking && liveData && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Status Timeline */}
                <Card className="lg:col-span-1 border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Status Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {stages.map((stage, index) => (
                      <div key={index} className="flex gap-4 relative">
                        {index < stages.length - 1 && (
                          <div className={`absolute left-6 top-10 w-0.5 h-10 ${index < liveData.status ? 'bg-primary' : 'bg-muted'}`} />
                        )}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-[1000] ${
                          index <= liveData.status ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground'
                        }`}>
                          <stage.icon className="w-6 h-6" />
                        </div>
                        <div className="pt-2">
                          <p className={`font-bold ${index <= liveData.status ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {stage.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {index <= liveData.status ? "Status Verified" : "Pending Action"}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-8 p-4 bg-muted/50 rounded-xl border border-dashed">
                      <p className="text-sm font-medium mb-2">Delivery Details</p>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <p>Driver: {liveData.driverName} ({liveData.driverPhone})</p>
                        <p>Vehicle Plate: {liveData.vehiclePlate}</p>
                        <p>Est. Arrival: {liveData.estimatedArrival}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Map */}
                <Card className="lg:col-span-2 border-none shadow-lg overflow-hidden h-[600px] flex flex-col relative">
                  <CardHeader className="bg-muted/30 border-b z-[500]">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-3 h-3 rounded-full ${liveData.status === 2 ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
                        Live Map View
                      </div>
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{liveData.trackingNumber}</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <div className="flex-1 w-full h-full z-10">
                    <MapContainer 
                      center={currentTruckPos} 
                      zoom={12} 
                      scrollWheelZoom={true}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <Polyline positions={[warehousePos, sitePos]} color="#0ea5e9" dashArray="8, 8" weight={4} />

                      <Marker position={warehousePos} icon={warehouseIcon}>
                        <Popup><span className="font-semibold">FundiMart Central Warehouse</span></Popup>
                      </Marker>

                      <Marker position={sitePos} icon={siteIcon}>
                        <Popup><span className="font-semibold">Destination Site</span></Popup>
                      </Marker>

                      {liveData.status >= 2 && (
                        <Marker position={currentTruckPos} icon={truckIcon}>
                          <Popup><span className="font-semibold">{liveData.vehiclePlate} (Live Position)</span></Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </div>

                  {/* Overlay Analytics Dashboard */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-4 z-[500]">
                    <div className="flex-1 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">GPS Geolocation Point</p>
                        <p className="font-bold text-slate-800">{liveData.currentLocationName}</p>
                      </div>
                    </div>
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 text-center px-8 flex flex-col justify-center">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Speed Metrics</p>
                      <p className="font-bold text-slate-800">{liveData.speedKmh} km/h</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}