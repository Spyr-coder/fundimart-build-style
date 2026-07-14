import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

interface StoreSettings {
  storeName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderAlerts: boolean;
  stockAlerts: boolean;
  weeklyReports: boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'FundiMart',
  email: 'store@fundimart.com',
  phone: '+1 (555) 123-4567',
  address: '123 Market Street',
  city: 'San Francisco, CA',
  zipCode: '94102',
  notificationsEnabled: true,
  emailNotifications: true,
  smsNotifications: false,
  orderAlerts: true,
  stockAlerts: true,
  weeklyReports: true,
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  const handleInputChange = (field: keyof StoreSettings, value: string | boolean) => {
    setSettings({ ...settings, [field]: value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Store Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-300">Store Name</label>
              <Input
                value={settings.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                className="mt-1 bg-slate-700 border-slate-600 text-white"
                placeholder="Store name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Email</label>
              <div className="flex items-center gap-2 mt-1">
                <Mail size={18} className="text-slate-400" />
                <Input
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="store@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Phone</label>
              <div className="flex items-center gap-2 mt-1">
                <Phone size={18} className="text-slate-400" />
                <Input
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Address</label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={18} className="text-slate-400" />
                <Input
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Street address"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">City</label>
              <Input
                value={settings.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="mt-1 bg-slate-700 border-slate-600 text-white"
                placeholder="City, State"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">ZIP Code</label>
              <Input
                value={settings.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="mt-1 bg-slate-700 border-slate-600 text-white"
                placeholder="00000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">Enable Notifications</p>
              <p className="text-xs text-slate-400 mt-1">Receive all system notifications</p>
            </div>
            <Switch
              checked={settings.notificationsEnabled}
              onCheckedChange={(value) => handleInputChange('notificationsEnabled', value)}
            />
          </div>

          {settings.notificationsEnabled && (
            <>
              <div className="h-px bg-slate-700 my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Email Notifications</p>
                  <p className="text-xs text-slate-400 mt-1">Get notified via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(value) => handleInputChange('emailNotifications', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">SMS Notifications</p>
                  <p className="text-xs text-slate-400 mt-1">Get notified via text message</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(value) => handleInputChange('smsNotifications', value)}
                />
              </div>

              <div className="h-px bg-slate-700 my-4" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Order Alerts</p>
                  <p className="text-xs text-slate-400 mt-1">Alert when new orders arrive</p>
                </div>
                <Switch
                  checked={settings.orderAlerts}
                  onCheckedChange={(value) => handleInputChange('orderAlerts', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Stock Alerts</p>
                  <p className="text-xs text-slate-400 mt-1">Alert when stock is low</p>
                </div>
                <Switch
                  checked={settings.stockAlerts}
                  onCheckedChange={(value) => handleInputChange('stockAlerts', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Weekly Reports</p>
                  <p className="text-xs text-slate-400 mt-1">Receive weekly sales reports</p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(value) => handleInputChange('weeklyReports', value)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        {saved && (
          <div className="text-green-400 text-sm flex items-center gap-2">
            <span>✓</span> Settings saved successfully
          </div>
        )}
        <Button onClick={handleSave} size="lg">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
