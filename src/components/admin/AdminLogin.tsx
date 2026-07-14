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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const validKey = import.meta.env.VITE_ADMIN_KEY;

    if (!adminKey) {
      setError('Please enter the admin key');
      setIsLoading(false);
      return;
    }

    if (adminKey !== validKey) {
      setError('Invalid admin key');
      setIsLoading(false);
      return;
    }

    // Store admin session in localStorage
    localStorage.setItem('admin_authenticated', 'true');
    
    // Call the success callback if it exists
    if (onLoginSuccess) {
      onLoginSuccess();
    }

    // Navigate to admin dashboard
    navigate('/admin/dashboard');
  }; // Fixed: All logic is now correctly inside the handleSubmit function

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 to-amber-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800 border-2 border-amber-700 rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-amber-900 rounded-full border border-amber-700">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
          <p className="text-amber-100 text-center text-sm mb-8">Enter your admin key to access the dashboard</p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border-2 border-red-600 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-100 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
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

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-xs text-center">
              This page is protected. Only authorized administrators can access the dashboard.
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-amber-900/30 border border-amber-700 rounded-lg">
          <p className="text-amber-200 text-xs text-center">
            🔒 This is a secure admin area. Keep your credentials confidential.
          </p>
        </div>
      </div>
    </div>
  );
}