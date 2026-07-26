'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { MegaMenu } from './MegaMenu';
import { SearchModal } from '../commerce/SearchModal';

export function SiteHeader() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const collectionsTriggerRef = useRef<HTMLButtonElement>(null);

  const cartStore = useCartStore();
  const itemCount = cartStore.getItemCount();

  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ['rgba(23, 20, 15, 0)', 'rgba(23, 20, 15, 0.95)']
  );

  const borderBottomColor = useTransform(
    scrollY,
    [0, 80],
    ['rgba(199, 187, 163, 0)', 'rgba(199, 187, 163, 0.25)']
  );

  return (
    <>
      <motion.header
        style={{
          backgroundColor,
          borderBottomColor,
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="font-display text-xl lg:text-2xl font-semibold tracking-[0.25em] text-bone uppercase hover:text-brass transition-colors focus:outline-none focus:ring-2 focus:ring-brass rounded-sm px-1"
          >
            HOUSE OF BRUSI
          </Link>

          {/* Primary Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/shop"
              className="font-body text-sm tracking-wider uppercase text-bone hover:text-brass transition-colors focus:outline-none focus:ring-2 focus:ring-brass px-2 py-1 rounded-sm"
            >
              Shop
            </Link>

            <button
              ref={collectionsTriggerRef}
              onClick={() => setIsMegaMenuOpen((prev) => !prev)}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              aria-expanded={isMegaMenuOpen}
              aria-controls="mega-menu-panel"
              className="font-body text-sm tracking-wider uppercase text-bone hover:text-brass transition-colors focus:outline-none focus:ring-2 focus:ring-brass px-2 py-1 rounded-sm flex items-center gap-1"
            >
              Collections
            </button>

            <Link
              href="/journal"
              className="font-body text-sm tracking-wider uppercase text-bone hover:text-brass transition-colors focus:outline-none focus:ring-2 focus:ring-brass px-2 py-1 rounded-sm"
            >
              Journal
            </Link>

            <Link
              href="/about"
              className="font-body text-sm tracking-wider uppercase text-bone hover:text-brass transition-colors focus:outline-none focus:ring-2 focus:ring-brass px-2 py-1 rounded-sm"
            >
              About
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search dialog"
              className="text-bone hover:text-brass transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-brass rounded-sm"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/account"
              aria-label="Account"
              className="text-bone hover:text-brass transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-brass rounded-sm"
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={cartStore.toggleCart}
              aria-label={`View shopping cart with ${itemCount} items`}
              className="relative text-bone hover:text-brass transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-brass rounded-sm"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  key={itemCount}
                  className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-saddle px-1 font-mono text-[10px] font-medium text-bone shadow-sm"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu Overlay Panel */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
          triggerRef={collectionsTriggerRef}
        />
      </motion.header>

      {/* Search Modal Stub */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
