import React from 'react';
import Link from 'next/link';
import { StitchedLine } from '@/components/motion/StitchedLine';
import { AlertTriangle, RefreshCw, ShoppingBag } from 'lucide-react';

interface FailedPageProps {
  searchParams: Promise<{ order_id?: string; error?: string }>;
}

export default async function CheckoutFailedPage({ searchParams }: FailedPageProps) {
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.order_id;
  const errorMessage = resolvedParams.error || 'Payment was declined or cancelled by customer.';

  return (
    <div className="min-h-screen bg-bone text-ink pb-24">
      <div className="bg-ink text-bone py-16 border-b border-dust/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="w-32 mb-4">
            <StitchedLine />
          </div>

          <AlertTriangle className="h-12 w-12 text-merlot mb-3" />
          <span className="font-mono text-xs text-merlot uppercase tracking-widest">
            Payment Unsuccessful
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-bone">
            Order Not Completed
          </h1>
          <p className="mt-3 font-body text-base text-dust max-w-lg">
            Your payment could not be processed. Your garment bag items have been preserved so you can retry payment without losing your selection.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 lg:px-8 pt-12">
        <div className="bg-bone border border-dust/30 rounded-sm p-6 sm:p-8 space-y-6 text-center shadow-xl">
          <div className="p-4 bg-merlot/10 border-l-2 border-merlot text-merlot font-mono text-xs text-left rounded-r-sm">
            <p className="font-bold">Error Notice:</p>
            <p className="mt-1">{errorMessage}</p>
            {orderId && <p className="mt-2 text-[11px] opacity-75">Ref Order ID: #{orderId.slice(0, 8).toUpperCase()}</p>}
          </div>

          <div className="space-y-2 text-xs text-dust font-body">
            <p>Common reasons for payment failure include bank OTP timeouts, insufficient funds, or security limits.</p>
            <p>No funds were deducted from your account. If amount was debited, your bank will auto-refund within 2-4 hours.</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-saddle text-bone font-mono text-xs rounded-sm border border-brass/40 hover:bg-brass hover:text-ink transition-colors shadow-md"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry Payment Now</span>
            </Link>

            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-bone text-ink border border-dust/40 font-mono text-xs rounded-sm hover:border-saddle transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Return to Collections</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
