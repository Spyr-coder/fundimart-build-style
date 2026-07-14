import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Package, ShoppingCart, Settings, AlertTriangle, Users } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminSellers from '@/components/admin/AdminSellers';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('admin_authenticated') === 'true';

    if (!isAdminAuthenticated) {
      setShowError(true);
      const timeout = setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
      return () => clearTimeout(timeout);
    }

    setIsAuthenticated(true);
  }, [navigate]);

  return (
    <AdminLayout isProtected={true}>
      {showError && (
        <div className="max-w-7xl mx-auto mb-6 p-6 bg-red-900/20 border-2 border-red-600 rounded-lg flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-200 mb-1">Access Denied</h3>
            <p className="text-red-100 text-sm">You are not authenticated. Redirecting to login page...</p>
          </div>
        </div>
      )}

      {!isAuthenticated ? (
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="animate-spin mb-4">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
          </div>
          <p className="text-amber-100 mb-2">Verifying authentication...</p>
          <p className="text-amber-300 text-sm">Redirecting to login page...</p>
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                  <p className="text-amber-100">Welcome back! Here's your store performance overview</p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-800 rounded-lg border border-amber-700">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-amber-100">System Status: Operational</span>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6 bg-amber-800 border border-amber-700 p-1 rounded-lg">
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Products</span>
                </TabsTrigger>
                <TabsTrigger value="sellers" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Sellers</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab Contents */}
              <TabsContent value="analytics" className="mt-6">
                <AdminAnalytics />
              </TabsContent>

              <TabsContent value="products" className="mt-6">
                <AdminProducts />
              </TabsContent>

              <TabsContent value="sellers" className="mt-6">
                <AdminSellers />
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <AdminOrders />
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <AdminSettings />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
