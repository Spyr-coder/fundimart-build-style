import { ReactNode } from 'react';
import { AlertCircle, Lock } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  isProtected?: boolean;
}

export default function AdminLayout({ children, isProtected = true }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800">
      {/* Admin Warning Banner */}
      <div className="border-b-2 border-amber-700 bg-gradient-to-r from-amber-900 to-amber-800">
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center gap-3">
          <Lock className="w-5 h-5 text-amber-300" />
          <div>
            <p className="text-sm font-semibold text-amber-100">ADMIN AREA</p>
            <p className="text-xs text-amber-200">Restricted access - Only authorized administrators</p>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-amber-700 rounded border border-amber-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-amber-100">SECURED</span>
          </div>
        </div>
      </div>

      {/* Security Alert */}
      {isProtected && (
        <div className="border-b border-amber-700/50 bg-amber-900/30">
          <div className="max-w-7xl mx-auto px-8 py-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-300" />
            <p className="text-xs text-amber-200">
              This dashboard requires authentication. Unauthorized access is logged.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-8">
        {children}
      </div>

      {/* Footer watermark */}
      <div className="border-t border-amber-700/50 bg-amber-900/20">
        <div className="max-w-7xl mx-auto px-8 py-4 text-center text-xs text-amber-300/60">
          FundiMart Admin Dashboard • Secure Access Only
        </div>
      </div>
    </div>
  );
}
