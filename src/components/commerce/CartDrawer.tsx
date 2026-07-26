'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCartStore, selectSubtotalPaise } from '@/store/cart';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { StitchedLine } from '@/components/motion/StitchedLine';

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotalPaise = useCartStore(selectSubtotalPaise);

  const subtotalRupees = Math.round(subtotalPaise / 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-ink/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Heavy Luxury Spring Slide-In Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 220,
              mass: 0.8,
            }}
            className="relative z-10 ml-auto flex h-full w-full max-w-md flex-col bg-bone text-ink shadow-2xl border-l border-dust/30"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart Drawer"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-dust/30 p-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-saddle" />
                <h2 className="font-display text-xl font-semibold text-ink">Garment Bag</h2>
              </div>
              <button
                onClick={closeCart}
                className="p-1 text-dust hover:text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-brass"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Line Items Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                /* Editorial Empty State */
                <div className="flex flex-col items-center justify-center text-center h-full py-12 space-y-6">
                  <div className="w-32">
                    <StitchedLine />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    Your Garment Bag is Empty
                  </h3>
                  <p className="font-body text-xs text-dust max-w-xs leading-relaxed">
                    Explore our seasonal lines to discover handcrafted selvedge denim, linen dusters, and tailored Western apparel.
                  </p>
                  <Link href="/collections" onClick={closeCart}>
                    <MagneticButton className="px-6 py-3 bg-saddle text-bone border border-brass/40 rounded-sm hover:bg-brass hover:text-ink transition-colors">
                      Explore Collections &rarr;
                    </MagneticButton>
                  </Link>
                </div>
              ) : (
                items.map((item) => {
                  const lineTotalRupees = Math.round((item.unitPricePaise * item.quantity) / 100);
                  const isMaxedOut = item.quantity >= item.maxInventory;

                  return (
                    <div
                      key={item.variantId}
                      className="flex gap-4 border-b border-dust/20 pb-6 items-start"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-24 w-18 flex-shrink-0 overflow-hidden rounded-sm bg-dust/10 border border-dust/30">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>

                      {/* Line Item Details */}
                      <div className="flex-1 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-display text-base font-semibold text-ink">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="p-1 text-dust hover:text-merlot transition-colors"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="font-mono text-xs text-dust mt-0.5">
                            {item.colorName} &bull; Size {item.size}
                          </p>
                        </div>

                        {/* Max Inventory Inline Warning */}
                        {isMaxedOut && (
                          <div className="mt-2 flex items-center gap-1 font-mono text-[10px] text-merlot">
                            <AlertCircle className="h-3 w-3" />
                            <span>Max available inventory reached ({item.maxInventory} left)</span>
                          </div>
                        )}

                        {/* Stepper + Line Total */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-dust/30 rounded-sm bg-bone">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="p-1.5 text-ink hover:text-saddle disabled:opacity-30"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="font-mono text-xs px-2.5 font-bold text-ink">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              disabled={isMaxedOut}
                              className="p-1.5 text-ink hover:text-saddle disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <span className="font-mono text-sm font-semibold text-ink">
                            ₹{lineTotalRupees.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer / Subtotal & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-dust/30 p-6 bg-bone/95 space-y-4">
                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-xs uppercase tracking-wider text-dust">Subtotal</span>
                  <span className="text-xl font-bold text-ink">
                    ₹{subtotalRupees.toLocaleString('en-IN')}
                  </span>
                </div>

                <p className="font-body text-[11px] text-dust text-center">
                  Taxes, insured shipping, and duties calculated at checkout.
                </p>

                <Link href="/checkout" onClick={closeCart} className="block">
                  <MagneticButton className="w-full py-4 bg-saddle text-bone border border-brass/50 rounded-sm hover:bg-brass hover:text-ink transition-colors shadow-lg">
                    Proceed to Checkout &rarr;
                  </MagneticButton>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
