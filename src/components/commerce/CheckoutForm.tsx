'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, selectSubtotalPaise } from '@/store/cart';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { StitchedLine } from '@/components/motion/StitchedLine';
import { Truck, Lock, AlertCircle, Loader2 } from 'lucide-react';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  config?: Record<string, unknown>;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => Promise<void>;
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

export function CheckoutForm() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const subtotalPaise = useCartStore(selectSubtotalPaise);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const subtotalRupees = Math.round(subtotalPaise / 100);
  const shippingFeeRupees = subtotalRupees >= 10000 || subtotalRupees === 0 ? 0 : 250;
  const estimatedTotalRupees = subtotalRupees + shippingFeeRupees;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (cartItems.length === 0) {
      setErrorMsg('Your garment bag is empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Call server order creation endpoint
      const response = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
          shippingAddress: formData,
        }),
      });

      const orderData = await response.json();

      if (!response.ok || !orderData.success) {
        throw new Error(orderData.details || orderData.error || 'Failed to create order');
      }

      // Step 2: Configure & Launch Razorpay Checkout.js Modal
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK failed to load. Please refresh and try again.');
      }

      /**
       * COD NOTE: COD is NOT a Razorpay-native payment method. If Cash on Delivery is added later,
       * it should be modeled as a separate 'cod_pending' order status path in the orders table
       * bypassing Razorpay entirely.
       */
      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amountPaise,
        currency: 'INR',
        name: 'House of Brusi',
        description: 'Bespoke Western Wear Order',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=200&q=80',
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        config: {
          display: {
            blocks: {
              utib: {
                name: 'Pay via UPI / QR (Recommended)',
                instruments: [{ method: 'upi' }],
              },
            },
            sequence: ['block.utib', 'block.cards', 'block.netbanking', 'block.wallet'],
            preferences: { show_default_blocks: true },
          },
        },
        handler: async function (paymentResponse) {
          setIsVerifying(true);
          try {
            // Step 3: Call Part 3 verification endpoint on client callback
            const verifyRes = await fetch('/api/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderData.orderId,
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                razorpayOrderId: paymentResponse.razorpay_order_id,
                razorpaySignature: paymentResponse.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              router.push(`/checkout/success?order_id=${orderData.orderId}`);
            } else {
              router.push(
                `/checkout/failed?order_id=${orderData.orderId}&error=${encodeURIComponent(
                  verifyData.error || 'Signature verification failed'
                )}`
              );
            }
          } catch (verifyErr: unknown) {
            const errorText = verifyErr instanceof Error ? verifyErr.message : 'Verification network error';
            router.push(
              `/checkout/failed?order_id=${orderData.orderId}&error=${encodeURIComponent(errorText)}`
            );
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            setIsVerifying(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : 'An error occurred during checkout processing.';
      console.error('❌ Checkout Submit Error:', errorText);
      setErrorMsg(errorText);
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !isVerifying) {
    return (
      <div className="py-20 text-center space-y-6 max-w-md mx-auto">
        <div className="w-32 mx-auto">
          <StitchedLine />
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink">
          Your Garment Bag is Empty
        </h2>
        <p className="font-body text-xs text-dust">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link href="/collections">
          <MagneticButton className="px-6 py-3 bg-saddle text-bone rounded-sm border border-brass/40 hover:bg-brass hover:text-ink transition-colors">
            Explore Collections &rarr;
          </MagneticButton>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Load Razorpay Checkout.js SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Verification Overlay Loading State */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/85 backdrop-blur-md text-bone space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-brass" />
          <h3 className="font-display text-2xl font-semibold text-bone">
            Verifying Payment Signature...
          </h3>
          <p className="font-body text-xs text-dust">
            Please wait while we confirm your transaction directly with Razorpay.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Single-Column Shipping Form */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono text-xs text-brass uppercase tracking-widest">
              Express Delivery Across India
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Shipping & Contact Details
            </h2>
          </div>

          {errorMsg && (
            <div className="p-4 bg-merlot/10 border-l-2 border-merlot text-merlot text-xs font-mono rounded-r-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleCheckoutSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs font-semibold text-saddle mb-1 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full bg-bone border border-dust/30 px-3.5 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-brass rounded-sm"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-saddle mb-1 uppercase tracking-wider">
                  Email Address (Order Confirmation) *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ananya@example.com"
                  className="w-full bg-bone border border-dust/30 px-3.5 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-brass rounded-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-xs font-semibold text-saddle mb-1 uppercase tracking-wider">
                Mobile Contact (WhatsApp Tracking) *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                className="w-full bg-bone border border-dust/30 px-3.5 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-brass rounded-sm"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-semibold text-saddle mb-1 uppercase tracking-wider">
                Street Address / House No / Apartment *
              </label>
              <input
                type="text"
                name="street"
                required
                value={formData.street}
                onChange={handleInputChange}
                placeholder="102 Horizon Towers, Bandra West"
                className="w-full bg-bone border border-dust/30 px-3.5 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-brass rounded-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-body text-xs font-semibold text-saddle mb-1 uppercase tracking-wider">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Mumbai"
                  className="w-full bg-bone border border-dust/30 px-3.5 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-brass rounded-sm"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-saddle mb-1 uppercase tracking-wider">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Maharashtra"
                  className="w-full bg-bone border border-dust/30 px-3.5 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-brass rounded-sm"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-saddle mb-1 uppercase tracking-wider">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="400050"
                  className="w-full bg-bone border border-dust/30 px-3.5 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-brass rounded-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <MagneticButton
                disabled={isSubmitting}
                type="submit"
                className="w-full py-4 bg-saddle text-bone border border-brass/50 rounded-sm hover:bg-brass hover:text-ink transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Initiating Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Pay Securely via Razorpay — ₹{estimatedTotalRupees.toLocaleString('en-IN')}</span>
                  </>
                )}
              </MagneticButton>
            </div>
          </form>

          {/* Trust Guarantees */}
          <div className="border-t border-dust/30 pt-6 grid grid-cols-2 gap-4 font-body text-xs text-dust">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-brass" />
              <span>256-Bit SSL PCI-DSS Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-brass" />
              <span>Insured Air Freight Logistics</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-ink text-bone p-6 rounded-sm border border-dust/20 space-y-6 sticky top-28">
          <h3 className="font-display text-xl font-semibold text-bone border-b border-dust/20 pb-3">
            Garment Summary ({cartItems.length})
          </h3>

          <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
            {cartItems.map((item) => {
              const lineTotalRupees = Math.round((item.unitPricePaise * item.quantity) / 100);
              return (
                <div key={item.variantId} className="flex gap-3 items-center">
                  <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-sm bg-dust/10">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-medium text-bone truncate">
                      {item.name}
                    </h4>
                    <p className="font-mono text-[11px] text-dust">
                      {item.colorName} &bull; Size {item.size} &bull; Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-bone">
                    ₹{lineTotalRupees.toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-dust/20 pt-4 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-dust">
              <span>Subtotal</span>
              <span className="text-bone">₹{subtotalRupees.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-dust">
              <span>Insured Express Shipping</span>
              <span className="text-brass">
                {shippingFeeRupees === 0 ? 'COMPLIMENTARY' : `₹${shippingFeeRupees}`}
              </span>
            </div>

            <div className="flex justify-between text-sm text-bone font-bold pt-2 border-t border-dust/20">
              <span>Total Payable</span>
              <span className="text-brass">₹{estimatedTotalRupees.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
