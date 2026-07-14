import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface VerificationResponse {
  success: boolean;
  message?: string;
}

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const [verificationStage, setVerificationStage] = useState<'loading' | 'success' | 'failed'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  // Extract variables appended to the URL by Flutterwave
  const status = searchParams.get('status');
  const txRef = searchParams.get('tx_ref');
  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    const verifyTransactionWithBackend = async () => {
      // 1. Initial Gatekeeper: Make sure Flutterwave actually marked it as successful on the client end
      if (status !== 'successful' && status !== 'completed') {
        setVerificationStage('failed');
        setErrorMessage('The gateway reported a cancelled or failed transaction processing route.');
        return;
      }

      try {
        // 2. Dispatch parameters to your backend system to perform server-to-server gateway validation
        const response = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status,
            tx_ref: txRef,
            transaction_id: transactionId,
          }),
        });

        const result: VerificationResponse = await response.json();

        if (response.ok && result.success) {
          setVerificationStage('success');
          toast.success('Payment settled and secured successfully!');
        } else {
          throw new Error(result.message || 'Server verification failed');
        }
      } catch (error: any) {
        console.error('Payment verification routing error:', error);
        setVerificationStage('failed');
        setErrorMessage(error.message || 'Failed to authenticate transaction records with the central database server.');
      }
    };

    verifyTransactionWithBackend();
  }, [status, txRef, transactionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full border-none shadow-2xl text-center p-6 bg-card">
        
        {/* STAGE 1: Server Authentication Verification Loader */}
        {verificationStage === 'loading' && (
          <>
            <CardHeader>
              <div className="mx-auto mb-4 relative flex items-center justify-center">
                <Loader2 className="w-20 h-20 text-primary animate-spin absolute" />
                <ShieldCheck className="w-10 h-10 text-primary/70" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Verifying Your Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Please wait while we establish a secure connection to confirm your transaction payload with the registry...
              </p>
              <div className="text-[11px] font-mono bg-muted p-2.5 rounded-lg border text-muted-foreground break-all text-left space-y-1">
                <p><span className="font-semibold text-foreground">TX Ref:</span> {txRef || 'Processing...'}</p>
                <p><span className="font-semibold text-foreground">Gate ID:</span> {transactionId || 'Fetching...'}</p>
              </div>
            </CardContent>
          </>
        )}

        {/* STAGE 2: Secure Settlement Success Layout */}
        {verificationStage === 'success' && (
          <>
            <CardHeader>
              <div className="mx-auto mb-4">
                <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-bounce" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-emerald-600">
                Payment Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Thank you! Your payment records have been audited and updated. Your materials order is now authorized and entering our fulfillment queue.
              </p>
              <div className="text-[11px] font-mono bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 p-3 rounded-lg border border-emerald-200/50 text-left space-y-1">
                <p><span className="font-semibold">Verification Status:</span> SETTLED</p>
                <p><span className="font-semibold">Transaction ID:</span> {transactionId}</p>
                <p><span className="font-semibold">Merchant Reference:</span> {txRef}</p>
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button asChild className="w-full gap-2 shadow-lg shadow-primary/20">
                <Link to={txRef ? `/track?id=${txRef}` : '/dashboard'}>
                  Track Order Delivery <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          </>
        )}

        {/* STAGE 3: Settlement Rejection / Error UI Panel */}
        {verificationStage === 'failed' && (
          <>
            <CardHeader>
              <div className="mx-auto mb-4">
                <XCircle className="w-20 h-20 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-destructive">
                Verification Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {errorMessage}
              </p>
              <div className="p-3 bg-destructive/5 text-destructive rounded-lg border border-destructive/10 text-xs font-medium">
                If money was deducted from your account, please keep your reference ID (<span className="font-mono font-bold select-all">{txRef || 'N/A'}</span>) and contact support.
              </div>
            </CardContent>
            <CardFooter className="flex gap-3 pt-4">
              <Button asChild variant="outline" className="w-full gap-2">
                <Link to="/checkout">
                  <RefreshCw className="w-4 h-4" /> Retry Checkout
                </Link>
              </Button>
            </CardFooter>
          </>
        )}

      </Card>
    </div>
  );
}