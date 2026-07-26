import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { StitchedLine } from '@/components/motion/StitchedLine';
import { ClearCartOnSuccess } from './ClearCartOnSuccess';
import { CheckCircle2, Truck } from 'lucide-react';

interface SuccessPageProps {
  searchParams: Promise<{ order_id?: string }>;
}

interface OrderItemDetail {
  id: string;
  quantity: number;
  unit_price_paise: number;
  product?: { name: string } | null;
  variant?: { size: string } | null;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.order_id;

  if (!orderId) {
    notFound();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('your-project')) {
    return (
      <div className="min-h-screen bg-bone text-ink p-12 text-center">
        Server configuration unavailable.
      </div>
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*, product:products(*), variant:product_variants(*))')
    .eq('id', orderId)
    .single();

  if (error || !order) {
    notFound();
  }

  const isConfirmedPaid = order.status === 'paid';
  const totalRupees = Math.round(order.amount_paise / 100);
  const shippingAddr = (order.shipping_address as unknown as Record<string, string>) || {};

  return (
    <div className="min-h-screen bg-bone text-ink pb-24">
      {/* Clear Zustand Cart Store */}
      {isConfirmedPaid && <ClearCartOnSuccess />}

      <div className="bg-ink text-bone py-16 border-b border-dust/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="w-32 mb-4">
            <StitchedLine />
          </div>

          <CheckCircle2 className="h-12 w-12 text-brass mb-3" />
          <span className="font-mono text-xs text-brass uppercase tracking-widest">
            Order Verified & Confirmed
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-bone">
            Thank You For Your Order
          </h1>
          <p className="mt-3 font-body text-base text-dust max-w-lg">
            Your payment has been verified directly via Razorpay. Our atelier team is steam-pressing and inspecting your garments for express dispatch.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 pt-12">
        <div className="bg-bone border border-dust/30 rounded-sm p-6 sm:p-8 space-y-8 shadow-xl">
          {/* Order Metadata Header */}
          <div className="flex flex-wrap justify-between items-baseline border-b border-dust/30 pb-6 gap-4 font-mono text-xs">
            <div>
              <span className="text-dust uppercase tracking-wider block">Order Reference</span>
              <span className="text-ink font-bold text-sm">#{order.id.slice(0, 8).toUpperCase()}</span>
            </div>

            <div>
              <span className="text-dust uppercase tracking-wider block">Razorpay Payment ID</span>
              <span className="text-ink font-bold text-sm">{order.razorpay_payment_id || 'Verified'}</span>
            </div>

            <div>
              <span className="text-dust uppercase tracking-wider block">Payment Status</span>
              <span className="text-saddle font-bold uppercase">{order.status}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h3 className="font-display text-base font-semibold text-ink mb-2">
              Insured Shipping Destination
            </h3>
            <p className="font-body text-xs text-ink/80 leading-relaxed">
              <strong>{shippingAddr.fullName}</strong><br />
              {shippingAddr.street}<br />
              {shippingAddr.city}, {shippingAddr.state} &mdash; {shippingAddr.pincode}<br />
              Phone: {shippingAddr.phone} &bull; Email: {shippingAddr.email}
            </p>
          </div>

          {/* Purchased Items List */}
          <div>
            <h3 className="font-display text-base font-semibold text-ink mb-3">
              Garments in Shipment
            </h3>
            <div className="divide-y divide-dust/20 border border-dust/30 rounded-sm bg-ink/5">
              {((order.order_items as unknown as OrderItemDetail[]) || []).map((item) => {
                const itemPriceRupees = Math.round(item.unit_price_paise / 100);
                const lineTotal = itemPriceRupees * item.quantity;
                return (
                  <div key={item.id} className="p-4 flex justify-between items-center font-mono text-xs">
                    <div>
                      <h4 className="font-body text-sm font-semibold text-ink">
                        {item.product?.name || 'House of Brusi Garment'}
                      </h4>
                      <p className="text-dust text-[11px] mt-0.5">
                        Size {item.variant?.size || 'Standard'} &bull; Qty {item.quantity} &bull; ₹{itemPriceRupees.toLocaleString('en-IN')} each
                      </p>
                    </div>
                    <span className="font-bold text-ink">₹{lineTotal.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total & Delivery Estimate */}
          <div className="border-t border-dust/30 pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-dust">
              <Truck className="h-4 w-4 text-brass" />
              <span>Estimated Delivery: 2 &ndash; 4 Business Days</span>
            </div>

            <div className="font-mono text-right">
              <span className="text-xs text-dust block">Total Paid</span>
              <span className="font-display text-2xl font-bold text-ink">₹{totalRupees.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 text-center">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-saddle text-bone font-mono text-xs rounded-sm border border-brass/40 hover:bg-brass hover:text-ink transition-colors shadow-md"
            >
              Continue Exploring Collections &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
