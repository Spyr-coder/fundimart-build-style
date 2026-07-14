import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Package2 } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  items: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD001',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: 234.50,
    items: 3,
    status: 'delivered',
    date: '2024-01-15',
  },
  {
    id: 'ORD002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    amount: 89.99,
    items: 1,
    status: 'shipped',
    date: '2024-01-18',
  },
  {
    id: 'ORD003',
    customer: 'Bob Wilson',
    email: 'bob@example.com',
    amount: 456.20,
    items: 5,
    status: 'processing',
    date: '2024-01-19',
  },
  {
    id: 'ORD004',
    customer: 'Alice Johnson',
    email: 'alice@example.com',
    amount: 123.45,
    items: 2,
    status: 'pending',
    date: '2024-01-20',
  },
];

const STATUS_COLORS: Record<Order['status'], string> = {
  pending: 'bg-yellow-900 text-yellow-200',
  processing: 'bg-blue-900 text-blue-200',
  shipped: 'bg-purple-900 text-purple-200',
  delivered: 'bg-green-900 text-green-200',
  cancelled: 'bg-red-900 text-red-200',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Orders</CardTitle>
            <p className="text-sm text-slate-400 mt-1">{filteredOrders.length} orders found</p>
          </div>
          <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as Order['status'] | 'all')}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Order ID</TableHead>
                <TableHead className="text-slate-300">Customer</TableHead>
                <TableHead className="text-slate-300">Email</TableHead>
                <TableHead className="text-slate-300">Amount</TableHead>
                <TableHead className="text-slate-300">Items</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-slate-700">
                  <TableCell className="text-white font-mono font-medium">{order.id}</TableCell>
                  <TableCell className="text-slate-300">{order.customer}</TableCell>
                  <TableCell className="text-slate-400 text-sm">{order.email}</TableCell>
                  <TableCell className="text-white font-medium">${order.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-slate-300">{order.items}</TableCell>
                  <TableCell>
                    <Select 
                      value={order.status} 
                      onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                    >
                      <SelectTrigger className={`w-32 text-xs font-medium border-0 ${STATUS_COLORS[order.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
