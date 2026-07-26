import React from 'react';
import { CheckoutForm } from '@/components/commerce/CheckoutForm';
import { StitchedLine } from '@/components/motion/StitchedLine';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-bone text-ink pb-24">
      {/* Header Banner */}
      <div className="bg-ink text-bone py-12 border-b border-dust/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="w-32 mb-4">
            <StitchedLine />
          </div>
          <span className="font-mono text-xs text-brass uppercase tracking-widest">
            Atelier Checkout & Fulfillment
          </span>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-bone">
            Secure Order Completion
          </h1>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
