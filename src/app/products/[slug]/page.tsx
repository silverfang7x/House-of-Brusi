import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getPublishedProducts } from '@/lib/supabase/queries/products';
import { ProductGallery } from '@/components/commerce/ProductGallery';
import { VariantSelector } from '@/components/commerce/VariantSelector';
import { StitchedLine } from '@/components/motion/StitchedLine';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  let product = await getProductBySlug(resolvedParams.slug);

  // Fallback mock data matching seed products for offline/dev rendering
  if (!product) {
    const allProducts = await getPublishedProducts();
    const foundInAll = allProducts.find((p) => p.slug === resolvedParams.slug);

    if (foundInAll) {
      product = {
        ...foundInAll,
        product_images: [
          {
            id: 'img-1',
            product_id: foundInAll.id,
            url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=90',
            alt_text: foundInAll.name,
            sort_order: 1,
            is_primary: true,
          },
          {
            id: 'img-2',
            product_id: foundInAll.id,
            url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=90',
            alt_text: `${foundInAll.name} Alternate View`,
            sort_order: 2,
            is_primary: false,
          },
        ],
        product_variants: [
          {
            id: 'v-xs',
            product_id: foundInAll.id,
            size: 'XS',
            color_name: 'Sandstorm',
            color_hex: '#D4A373',
            sku: `HOB-${resolvedParams.slug.slice(0, 6).toUpperCase()}-XS`,
            inventory_count: 5,
            price_override_paise: null,
          },
          {
            id: 'v-s',
            product_id: foundInAll.id,
            size: 'S',
            color_name: 'Sandstorm',
            color_hex: '#D4A373',
            sku: `HOB-${resolvedParams.slug.slice(0, 6).toUpperCase()}-S`,
            inventory_count: 12,
            price_override_paise: null,
          },
          {
            id: 'v-m',
            product_id: foundInAll.id,
            size: 'M',
            color_name: 'Sandstorm',
            color_hex: '#D4A373',
            sku: `HOB-${resolvedParams.slug.slice(0, 6).toUpperCase()}-M`,
            inventory_count: 0, // Out of stock size demonstration
            price_override_paise: null,
          },
          {
            id: 'v-l',
            product_id: foundInAll.id,
            size: 'L',
            color_name: 'Sandstorm',
            color_hex: '#D4A373',
            sku: `HOB-${resolvedParams.slug.slice(0, 6).toUpperCase()}-L`,
            inventory_count: 18,
            price_override_paise: null,
          },
          {
            id: 'v-xl',
            product_id: foundInAll.id,
            size: 'XL',
            color_name: 'Sandstorm',
            color_hex: '#D4A373',
            sku: `HOB-${resolvedParams.slug.slice(0, 6).toUpperCase()}-XL`,
            inventory_count: 0, // Out of stock size demonstration
            price_override_paise: null,
          },
          {
            id: 'v-sdl-s',
            product_id: foundInAll.id,
            size: 'S',
            color_name: 'Saddle Brown',
            color_hex: '#6B4A31',
            sku: `HOB-${resolvedParams.slug.slice(0, 6).toUpperCase()}-SDL-S`,
            inventory_count: 8,
            price_override_paise: null,
          },
          {
            id: 'v-sdl-m',
            product_id: foundInAll.id,
            size: 'M',
            color_name: 'Saddle Brown',
            color_hex: '#6B4A31',
            sku: `HOB-${resolvedParams.slug.slice(0, 6).toUpperCase()}-SDL-M`,
            inventory_count: 14,
            price_override_paise: null,
          },
        ],
      };
    }
  }

  if (!product) {
    notFound();
  }

  const basePriceRupees = Math.round(product.base_price_paise / 100);
  const images = (product.product_images || []).map((img) => ({
    id: img.id,
    url: img.url,
    altText: img.alt_text,
  }));
  const variants = product.product_variants || [];
  const primaryImageUrl = images[0]?.url || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=90';

  return (
    <div className="min-h-screen bg-bone text-ink pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-dust/20 bg-bone/80 backdrop-blur-sm py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 font-mono text-xs text-dust flex items-center gap-2">
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-ink transition-colors">
            Collections
          </Link>
          <span>/</span>
          <span className="text-ink font-bold">{product.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={images} />
          </div>

          {/* Right Column: Product Details & Variant Selector */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            <div>
              <span className="font-mono text-xs text-brass uppercase tracking-widest">
                House of Brusi Atelier
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mt-1">
                {product.name}
              </h1>
              {product.fabric && (
                <p className="font-mono text-xs text-dust mt-1.5">{product.fabric}</p>
              )}
            </div>

            {/* Stitched Line Separator */}
            <div className="w-36">
              <StitchedLine />
            </div>

            {/* Variant Selector & Add to Bag */}
            <VariantSelector
              variants={variants}
              basePriceRupees={basePriceRupees}
              productId={product.id}
              productName={product.name}
              productImage={primaryImageUrl}
            />

            {/* Value Guarantees */}
            <div className="border-t border-dust/30 pt-6 space-y-3 font-body text-xs text-dust">
              <div className="flex items-center gap-2.5">
                <Truck className="h-4 w-4 text-brass" />
                <span>Complimentary insured shipping on all orders over ₹10,000.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="h-4 w-4 text-brass" />
                <span>14-day return privilege for unworn garments in original packaging.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-brass" />
                <span>Crafted in small-batch runs with lifetime seam repairs.</span>
              </div>
            </div>

            {/* Description & Specs Accordion/Tab */}
            <div className="border-t border-dust/30 pt-6 space-y-4">
              <div>
                <h3 className="font-display text-sm font-semibold text-ink uppercase tracking-wider">
                  Description & Story
                </h3>
                <p className="mt-2 font-body text-sm text-ink/80 leading-relaxed">
                  {product.description ||
                    'Designed in our atelier using heavy-gauge natural fabrics and tailored western construction.'}
                </p>
              </div>

              {product.care_instructions && (
                <div className="border-t border-dust/20 pt-4">
                  <h4 className="font-display text-xs font-semibold text-saddle uppercase tracking-wider">
                    Care Instructions
                  </h4>
                  <p className="mt-1 font-mono text-xs text-dust">
                    {product.care_instructions}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
