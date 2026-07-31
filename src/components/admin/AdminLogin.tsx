// src/components/admin/AdminLogin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Lock } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess?: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [adminKey, setAdminKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!adminKey.trim()) {
      setError('Please enter the admin key');
      setIsLoading(false);
      return;
    }

    try {
      // Point to your backend API URL
      const API_URL = import.meta.env.VITE_API_URL || 'https://jengamart-0.onrender.com';

      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminKey: adminKey.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Store the secure backend token in localStorage
      localStorage.setItem('admin_token', data.token);

      if (onLoginSuccess) {
        onLoginSuccess();
      }

      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to connect to authentication server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 to-amber-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border-2 border-amber-700 rounded-lg shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-amber-900 rounded-full border border-amber-700">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
          <p className="text-amber-100 text-center text-sm mb-8">Enter your admin key to access the dashboard</p>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border-2 border-red-600 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-100 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="adminKey" className="block text-sm font-medium text-amber-100 mb-2">
                Admin Key
              </label>
              <Input
                id="adminKey"
                type="password"
                placeholder="Enter admin key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                disabled={isLoading}
                className="bg-slate-700 border-amber-700 text-white placeholder:text-slate-400"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2"
            >
              {isLoading ? 'Verifying...' : 'Access Dashboard'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-xs text-center">
              Protected area. Authenticated requests are signed via secure tokens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}