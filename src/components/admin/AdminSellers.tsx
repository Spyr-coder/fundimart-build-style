import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Seller } from "@/types/product";
import { CheckCircle, XCircle, UserCheck, Shield } from "lucide-react";
import { toast } from "sonner";

export default function AdminSellers() {
  const [sellers, setSellers] = useState<User[]>([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
    const sellerUsers = allUsers.filter((u: User) => u.role === "seller");
    setSellers(sellerUsers);
  }, []);

  const toggleVerification = (userId: string) => {
    const allUsers = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
    const userIndex = allUsers.findIndex((u: User) => u.id === userId);
    
    if (userIndex !== -1) {
      const user = allUsers[userIndex];
      if (user.seller) {
        user.seller.isVerified = !user.seller.isVerified;
        allUsers[userIndex] = user;
        localStorage.setItem("fundimart_users", JSON.stringify(allUsers));
        
        // Also update current logged in user if it's them (though unlikely to be an admin)
        const currentUser = JSON.parse(localStorage.getItem("fundimart_user") || "null");
        if (currentUser && currentUser.id === userId) {
            localStorage.setItem("fundimart_user", JSON.stringify(user));
        }

        setSellers(allUsers.filter((u: User) => u.role === "seller"));
        toast.success(`Seller ${user.seller.isVerified ? 'verified' : 'unverified'} successfully`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-amber-900/10 border-amber-500/20 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-500" />
            Seller Management
          </CardTitle>
          <CardDescription className="text-amber-200/70">
            Verify and manage sellers on the platform. Only verified sellers' products appear on the main site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sellers.length === 0 ? (
            <div className="text-center py-10 text-amber-200/50">
              No sellers registered yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {sellers.map((seller) => (
                <div 
                  key={seller.id} 
                  className="flex items-center justify-between p-4 bg-amber-800/30 border border-amber-700/50 rounded-lg hover:bg-amber-800/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center font-bold text-lg">
                      {seller.firstName[0]}{seller.lastName[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-100">{seller.seller?.hardwareName}</h4>
                      <p className="text-sm text-amber-200/70">{seller.firstName} {seller.lastName} • {seller.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={seller.seller?.isVerified ? "default" : "destructive"} className={seller.seller?.isVerified ? "bg-green-600" : ""}>
                          {seller.seller?.isVerified ? (
                            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</span>
                          ) : (
                            <span className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Unverified</span>
                          )}
                        </Badge>
                        <span className="text-xs text-amber-200/50">{seller.seller?.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={seller.seller?.isVerified ? "outline" : "default"}
                    onClick={() => toggleVerification(seller.id)}
                    className={seller.seller?.isVerified ? "border-amber-600 text-amber-100 hover:bg-amber-600" : "bg-amber-600 hover:bg-amber-500"}
                  >
                    {seller.seller?.isVerified ? "Revoke Verification" : "Verify Seller"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
