import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, ShoppingCart, Users, DollarSign, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { Product } from '@/types/product';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    avgOrderValue: 0
  });

  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // Load Data
    const allProducts: Product[] = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
    const allOrders = JSON.parse(localStorage.getItem("fundimart_orders") || "[]");
    
    // Calculate Stats
    const totalRev = allOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
    const totalOrd = allOrders.length;
    const avgVal = totalOrd > 0 ? totalRev / totalOrd : 0;
    
    setStats({
      totalRevenue: totalRev,
      totalOrders: totalOrd,
      totalProducts: allProducts.length,
      avgOrderValue: avgVal
    });

    // Calculate Category Distribution
    const catMap: Record<string, number> = {};
    allProducts.forEach(p => {
      catMap[p.category] = (catMap[p.category] || 0) + 1;
    });
    
    const formattedCatData = Object.entries(catMap).map(([name, value]) => ({
      name: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      value: value
    }));
    
    setCategoryData(formattedCatData);
    setRecentOrders(allOrders.sort((a: any, b: any) => b.createdAt - a.createdAt).slice(0, 5));

  }, []);

  const statCards = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: 'Total Revenue',
      value: `KES ${stats.totalRevenue.toLocaleString()}`,
      color: 'from-blue-600 to-blue-800',
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      label: 'Total Orders',
      value: stats.totalOrders.toString(),
      color: 'from-green-600 to-green-800',
    },
    {
      icon: <Package className="w-6 h-6" />,
      label: 'Total Products',
      value: stats.totalProducts.toString(),
      color: 'from-purple-600 to-purple-800',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Avg Order Value',
      value: `KES ${stats.avgOrderValue.toLocaleString(undefined, {maximumFractionDigits: 0})}`,
      color: 'from-amber-600 to-amber-800',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className={`bg-gradient-to-br ${stat.color} border-0`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-lg text-white">
                  {stat.icon}
                </div>
              </div>
              <p className="text-white/80 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Chart */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              Inventory Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categoryData.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-slate-400">No product data available</div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    >
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '4px',
                    }}
                    labelStyle={{ color: '#e2e8f0' }}
                    />
                </PieChart>
                </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-slate-400">No orders recorded yet.</div>
            ) : (
                <div className="space-y-4">
                    {recentOrders.map((order, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-slate-700 pb-3 last:border-0">
                            <div>
                                <p className="text-white font-medium">Order #{order.id.split('_')[1]}</p>
                                <p className="text-slate-400 text-xs">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-400 font-bold">KES {order.totalAmount.toLocaleString()}</p>
                                <p className="text-slate-400 text-xs">{order.phoneNumber}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card className="bg-slate-800 border-slate-700 border-l-4 border-l-amber-500">
        <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Inventory Summary
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-slate-300">
                You currently have <span className="text-white font-bold">{stats.totalProducts}</span> products listed across all categories. 
                System status is <span className="text-green-400 font-semibold">Healthy</span>.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}