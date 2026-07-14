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

// Fix Leaflet's default marker icon building issue
import 'leaflet/dist/leaflet.css';

// Customizing default marker icons because webpack/vite messes up paths
const warehouseIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const siteIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const truckIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// TypeScript interface defining backend model contract fields
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
  const [orderStatus, setOrderStatus] = useState(0); // Fallback simulation stage reference (0-3)
  
  // Real-time server-synced tracking container state
  const [liveData, setLiveData] = useState<TrackingData | null>(null);

  // Coordinates: Fixed Warehouse and Construction Site locations
  const warehousePos: [number, number] = [-1.2921, 36.8219]; // Nairobi CBD
  const sitePos: [number, number] = [-1.1921, 36.9219];      // Near Ruiru/Thika Highway
  
  // Real-time moving truck coordinate state
  const [truckPos, setTruckPos] = useState<[number, number]>([-1.2921, 36.8219]);
  const [progress, setProgress] = useState(0); // 0% to 100% path progress

  // Core Data Dispatch Tracker Action Pipeline
  const runTrackingFetch = async (targetId: string, showLoader = false) => {
    if (showLoader) setIsLoading(true);
    try {
      const res = await fetch(`/api/orders/track?id=${targetId}`);
      if (!res.ok) throw new Error("Tracking details not found on server context");
      const data: TrackingData = await res.json();
      
      setLiveData(data);
      setOrderStatus(data.status);
      setTruckPos([data.truckLatitude, data.truckLongitude]);
      setIsTracking(true);
    } catch (err) {
      console.warn("API fallback path activated: Engaged linear layout client simulation pipeline.", err);
      // Fallback local animation driver engine logic if API is decoupled/absent during mock setup
      setIsTracking(true);
      setOrderStatus(1);
      setTimeout(() => {
        setOrderStatus(2);
        toast.success("Delivery vehicle has left the central warehouse!");
      }, 2500);
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  // Click submission trigger execution interface
  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }
    runTrackingFetch(trackingNumber, true);
  };

  // Step 2: Live GPS Tracking Simulation Engine
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isTracking && orderStatus === 2 && progress < 100 && !liveData) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 1; // Increment movement along path
          
          if (nextProgress >= 100) {
            if (interval) clearInterval(interval);
            setOrderStatus(3); // Bump timeline status to "Delivered"
            toast.success("Materials delivered safely to your construction site!");
            return 100;
          }

          // Linearly interpolate coordinates between Warehouse and Site based on progress fraction
          const lat = warehousePos[0] + (sitePos[0] - warehousePos[0]) * (nextProgress / 100);
          const lng = warehousePos[1] + (sitePos[1] - warehousePos[1]) * (nextProgress / 100);
          setTruckPos([lat, lng]);

          return nextProgress;
        });
      }, 300); // Shift truck position coordinates every 300ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking, orderStatus, progress, liveData]);

  // Automated Link parameter parser interceptor lifecycle hook
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlTrackingId = queryParams.get('id');

    if (urlTrackingId) {
      setTrackingNumber(urlTrackingId);
      runTrackingFetch(urlTrackingId, true);
    }
  }, []); 

  const stages = [
    { title: "Confirmed", icon: CheckCircle2, color: "text-green-500" },
    { title: "Processing", icon: Package, color: "text-blue-500" },
    { title: "On the Way", icon: Truck, color: "text-orange-500" },
    { title: "Delivered", icon: Navigation, color: "text-primary" },
  ];

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
              Track your construction materials from our warehouse to your site.
            </p>
          </div>

          <Card className="mb-8 border-none shadow-xl bg-primary/5">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input 
                    placeholder="Enter Tracking ID (e.g., FM-2025-XXXX)" 
                    className="pl-12 h-14 bg-background text-lg"
                    value={trackingNumber}
                    disabled={isLoading}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <Button size="lg" className="h-14 px-10 gap-2 text-lg" onClick={handleTrack} disabled={isLoading}>
                  {isLoading ? (
                    <>Loading Data... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>Track Order <Navigation className="w-5 h-5" /></>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse"
              >
                <Card className="lg:col-span-1 border-none shadow-lg p-6 space-y-6">
                  <div className="h-6 bg-muted rounded w-1/2 mb-4" />
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </Card>
                <Card className="lg:col-span-2 border-none shadow-lg h-[600px] bg-muted rounded-2xl relative flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Loader2 className="w-10 h-10 animate-spin text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground font-medium">Synchronizing live map layers...</p>
                  </div>
                </Card>
              </motion.div>
            ) : isTracking ? (
              <motion.div 
                key="content"
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
                          <div className={`absolute left-6 top-10 w-0.5 h-10 ${index < orderStatus ? 'bg-primary' : 'bg-muted'}`} />
                        )}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-[1000] ${
                          index <= orderStatus ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground'
                        }`}>
                          <stage.icon className="w-6 h-6" />
                        </div>
                        <div className="pt-2">
                          <p className={`font-bold ${index <= orderStatus ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {stage.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {index <= orderStatus ? "Completed" : "Pending..."}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-8 p-4 bg-muted/50 rounded-xl border border-dashed">
                      <p className="text-sm font-medium mb-2">Delivery Details</p>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <p><span className="font-semibold">Driver:</span> {liveData ? liveData.driverName : "John M."} ({liveData ? liveData.driverPhone : "+254 7XX XXX XXX"})</p>
                        <p><span className="font-semibold">Vehicle:</span> {liveData ? liveData.vehiclePlate : "Isuzu FRR (KDC XXXX)"}</p>
                        <p><span className="font-semibold">Est. Arrival:</span> {liveData ? liveData.estimatedArrival : "2:30 PM Today"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Map */}
                <Card className="lg:col-span-2 border-none shadow-lg overflow-hidden h-[600px] flex flex-col relative">
                  <CardHeader className="bg-muted/30 border-b z-[500]">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-3 h-3 rounded-full ${orderStatus === 2 ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
                        Live Map View {orderStatus === 2 && !liveData && `(${progress}% Route Progress)`}
                      </div>
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        {liveData ? liveData.trackingNumber : "Nairobi - Thika Highway"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  
                  <div className="flex-1 w-full h-full z-10">
                    <MapContainer 
                      center={truckPos} 
                      zoom={12} 
                      scrollWheelZoom={true}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      {/* Path Line */}
                      <Polyline positions={[warehousePos, sitePos]} color="#0ea5e9" dashArray="8, 8" weight={4} />

                      {/* Warehouse Marker */}
                      <Marker position={warehousePos} icon={warehouseIcon}>
                        <Popup><span className="font-semibold">FundiMart Central Warehouse</span></Popup>
                      </Marker>

                      {/* Site Marker */}
                      <Marker position={sitePos} icon={siteIcon}>
                        <Popup><span className="font-semibold">Your Delivery Construction Site</span></Popup>
                      </Marker>

                      {/* Dynamic GPS Moving Truck Marker */}
                      {orderStatus >= 2 && (
                        <Marker position={truckPos} icon={truckIcon}>
                          <Popup><span className="font-semibold">{liveData ? liveData.vehiclePlate : "Isuzu FRR (KDC XXXX)"} - Live Tracking</span></Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </div>

                  {/* Overlay Dashboard Container */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-4 z-[500]">
                    <div className="flex-1 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Status Reading</p>
                        <div className="font-bold text-slate-800">
                          {liveData ? liveData.currentLocationName : (
                            <>
                              {orderStatus === 1 && "Processing load materials..."}
                              {orderStatus === 2 && "Transit en route via Thika Highway"}
                              {orderStatus === 3 && "Arrived at destination site"}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 text-center px-8 flex flex-col justify-center">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Speed</p>
                      <p className="font-bold text-slate-800">
                        {liveData ? `${liveData.speedKmh} km/h` : (orderStatus === 2 ? "45 km/h" : "0 km/h")}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}