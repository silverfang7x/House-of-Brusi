'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export interface CollectionItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

const SEEDED_COLLECTIONS: CollectionItem[] = [
  {
    id: '1',
    name: 'Desert Bloom',
    slug: 'desert-bloom',
    description:
      'Sun-bleached linen and earthy terracotta tones inspired by arid landscapes.',
    imageUrl:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Midnight Rodeo',
    slug: 'midnight-rodeo',
    description:
      'Deep indigo, worn leather textures, and tailored western silhouettes.',
    imageUrl:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'Prairie Modern',
    slug: 'prairie-modern',
    description:
      'Minimalist workwear, raw selvedge cotton, and structured heritage tailoring.',
    imageUrl:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MegaMenu({ isOpen, onClose, triggerRef }: MegaMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const panelNode = panelRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && panelNode) {
        const focusables = panelNode.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  // Outside click handler
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          id="mega-menu-panel"
          role="dialog"
          aria-label="Collections Mega Menu"
          aria-modal="true"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 right-0 w-full bg-ink text-bone border-b border-brass shadow-2xl z-40 overflow-hidden"
        >
          <div className="mx-auto max-w-7xl px-8 py-12">
            <div className="flex items-center justify-between pb-6 border-b border-dust/30">
              <h2 className="font-display text-2xl font-semibold text-bone tracking-wide">
                Seasonal Collections
              </h2>
              <Link
                href="/collections"
                onClick={onClose}
                className="font-mono text-sm text-brass hover:text-bone transition-colors focus:outline-none focus:ring-2 focus:ring-brass px-2 py-1 rounded-sm"
              >
                View All Collections &rarr;
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {SEEDED_COLLECTIONS.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.slug}`}
                  onClick={onClose}
                  className="group block p-4 rounded-sm hover:bg-bone/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brass"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-dust/10">
                    <Image
                      src={col.imageUrl}
                      alt={col.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-medium text-bone group-hover:text-brass transition-colors">
                    {col.name}
                  </h3>
                  <p className="mt-1 font-body text-xs text-dust line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
