'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ProductFilters } from '@/components/commerce/ProductFilters';
import { QuickView } from '@/components/commerce/QuickView';
import { TiltCard } from '@/components/ui/TiltCard';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { Eye } from 'lucide-react';
import type { ProductWithDetails } from '@/lib/supabase/queries/products';

interface CollectionClientViewProps {
  collection: {
    name: string;
    slug: string;
    description: string | null;
    hero_image_url: string | null;
  };
  products: ProductWithDetails[];
}

export function CollectionClientView({ collection, products }: CollectionClientViewProps) {
  const searchParams = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<ProductWithDetails | null>(null);

  const activeSize = searchParams.get('size');
  const activePrice = searchParams.get('price');

  // Client-side filtering logic
  const filteredProducts = products.filter((product) => {
    // 1. Filter by Size
    if (activeSize && activeSize !== 'all') {
      const hasSize = product.product_variants.some(
        (v) => v.size === activeSize && v.inventory_count > 0
      );
      if (!hasSize) return false;
    }

    // 2. Filter by Price Range
    if (activePrice && activePrice !== 'all') {
      const priceRupees = Math.round(product.base_price_paise / 100);
      if (activePrice === 'under-15k' && priceRupees >= 15000) return false;
      if (activePrice === '15k-25k' && (priceRupees < 15000 || priceRupees > 25000)) return false;
      if (activePrice === 'over-25k' && priceRupees <= 25000) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-bone text-ink pb-24">
      {/* Collection Hero Header */}
      <div className="relative bg-ink text-bone py-20 border-b border-brass/30 overflow-hidden">
        {collection.hero_image_url && (
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src={collection.hero_image_url}
              alt={collection.name}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <span className="font-mono text-xs text-brass uppercase tracking-widest">
            Collection Line
          </span>
          <h1 className="mt-2 font-display text-4xl lg:text-6xl font-semibold text-bone">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="mt-4 font-body text-base text-dust max-w-2xl mx-auto leading-relaxed">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-12">
        {/* Filter Bar */}
        <ProductFilters />

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between font-mono text-xs text-dust">
          <span>Showing {filteredProducts.length} of {products.length} Garments</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-dust/40 rounded-sm">
            <p className="font-display text-lg text-ink">No garments match selected filters.</p>
            <p className="mt-2 font-mono text-xs text-dust">Try adjusting size or price range selection.</p>
          </div>
        ) : (
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const priceRupees = Math.round(product.base_price_paise / 100);
              const primaryImage =
                product.product_images[0]?.url ||
                'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';

              return (
                <StaggerItem key={product.id}>
                  <div className="group relative">
                    <TiltCard className="bg-ink text-bone border border-dust/20 shadow-lg">
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <Image
                          src={primaryImage}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Quick View Button Hover Affordance */}
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-ink/90 text-bone px-3 py-1.5 rounded-sm font-mono text-xs border border-brass/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-brass hover:text-ink shadow-md"
                          aria-label={`Quick view ${product.name}`}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Quick View</span>
                        </button>

                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />

                        {/* Product Info Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 z-10">
                          <Link href={`/products/${product.slug}`} className="block">
                            <h3 className="font-display text-xl font-medium text-bone group-hover:text-brass transition-colors">
                              {product.name}
                            </h3>
                            {product.fabric && (
                              <p className="font-mono text-[11px] text-dust mt-0.5">{product.fabric}</p>
                            )}
                            <div className="mt-2 flex items-baseline justify-between font-mono text-sm text-bone">
                              <span>₹{priceRupees.toLocaleString('en-IN')}</span>
                              <span className="text-xs text-brass group-hover:underline">View Piece &rarr;</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickView
        isOpen={quickViewProduct != null}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </div>
  );
}
