'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog } from '@/components/ui/dialog';
import { VariantSelector, type VariantData } from './VariantSelector';

interface QuickViewProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  fabric: string | null;
  base_price_paise: number;
  product_images?: Array<{ id: string; url: string; alt_text: string | null }>;
  product_variants?: VariantData[];
}

interface QuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: QuickViewProduct | null;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function QuickView({ isOpen, onClose, product, triggerRef }: QuickViewProps) {
  if (!product) return null;

  const basePriceRupees = Math.round(product.base_price_paise / 100);
  const images = product.product_images || [];
  const primaryImageUrl =
    images[0]?.url ||
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';

  const variants: VariantData[] =
    product.product_variants || [
      {
        id: 'v1',
        size: 'S',
        color_name: 'Original',
        color_hex: '#17140F',
        sku: `HOB-${product.slug.slice(0, 6).toUpperCase()}-S`,
        inventory_count: 10,
      },
      {
        id: 'v2',
        size: 'M',
        color_name: 'Original',
        color_hex: '#17140F',
        sku: `HOB-${product.slug.slice(0, 6).toUpperCase()}-M`,
        inventory_count: 15,
      },
    ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Quick View"
      triggerRef={triggerRef}
      className="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
        {/* Condensed Image Preview */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-dust/10 border border-dust/30">
          <Image
            src={primaryImageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Details & Variant Selector */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-brass uppercase tracking-widest">
              House of Brusi Atelier
            </span>
            <h3 className="font-display text-2xl font-semibold text-ink mt-1">
              {product.name}
            </h3>
            {product.fabric && (
              <p className="font-mono text-xs text-dust mt-1">{product.fabric}</p>
            )}
            <p className="font-body text-xs text-ink/80 mt-3 line-clamp-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-6 border-t border-dust/30 pt-4">
            <VariantSelector
              variants={variants}
              basePriceRupees={basePriceRupees}
              productId={product.id}
              productName={product.name}
              productImage={primaryImageUrl}
            />
          </div>

          <div className="mt-4 text-center">
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="font-mono text-xs text-brass hover:text-ink transition-colors underline underline-offset-4"
            >
              View Full Product Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
