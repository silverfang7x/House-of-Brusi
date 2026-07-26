import React from 'react';
import Link from 'next/link';
import { StitchedLine } from '@/components/motion/StitchedLine';
import { User, Package, Heart, Key } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-bone text-ink pb-24">
      <div className="bg-ink text-bone py-16 border-b border-dust/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="w-32 mb-4">
            <StitchedLine />
          </div>
          <span className="font-mono text-xs text-brass uppercase tracking-widest">
            Client Portal
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-bone">
            My Account & Orders
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-bone border border-dust/30 rounded-sm space-y-4">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-saddle" />
              <h3 className="font-display text-lg font-semibold text-ink">Order History</h3>
            </div>
            <p className="font-body text-xs text-dust">
              Track active shipments, view past receipts, and manage size exchanges.
            </p>
            <span className="inline-block font-mono text-xs text-brass">0 Active Orders</span>
          </div>

          <div className="p-6 bg-bone border border-dust/30 rounded-sm space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-saddle" />
              <h3 className="font-display text-lg font-semibold text-ink">Personal Profile</h3>
            </div>
            <p className="font-body text-xs text-dust">
              Update saved delivery addresses and tailored fit specifications.
            </p>
            <span className="inline-block font-mono text-xs text-brass">Guest Session</span>
          </div>

          <div className="p-6 bg-bone border border-dust/30 rounded-sm space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-saddle" />
              <h3 className="font-display text-lg font-semibold text-ink">Saved Lookbook</h3>
            </div>
            <p className="font-body text-xs text-dust">
              View your bookmarked seasonal pieces and wishlist items.
            </p>
            <Link href="/collections" className="inline-block font-mono text-xs text-brass hover:underline">
              Browse Collections &rarr;
            </Link>
          </div>

          <div className="p-6 bg-bone border border-dust/30 rounded-sm space-y-4">
            <div className="flex items-center gap-3">
              <Key className="h-6 w-6 text-saddle" />
              <h3 className="font-display text-lg font-semibold text-ink">Security & Login</h3>
            </div>
            <p className="font-body text-xs text-dust">
              Manage passwordless magic-link sign in credentials.
            </p>
            <span className="inline-block font-mono text-xs text-brass">Sign In Requested</span>
          </div>
        </div>
      </div>
    </div>
  );
}
