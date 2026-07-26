'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SizeGuideDrawer } from './SizeGuideDrawer';
import { Check, Ruler } from 'lucide-react';

export interface VariantData {
  id: string;
  size: string;
  color_name: string;
  color_hex: string;
  sku: string;
  inventory_count: number;
  price_override_paise?: number | null;
}

interface VariantSelectorProps {
  variants: VariantData[];
  basePriceRupees: number;
  productId?: string;
  productName?: string;
  productImage?: string;
}

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export function VariantSelector({
  variants,
  basePriceRupees,
  productId = 'prod-default',
  productName = 'House of Brusi Garment',
  productImage = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
}: VariantSelectorProps) {
  // Extract unique colors
  const uniqueColorsMap = new Map<string, string>();
  variants.forEach((v) => {
    if (!uniqueColorsMap.has(v.color_name)) {
      uniqueColorsMap.set(v.color_name, v.color_hex);
    }
  });
  const colors = Array.from(uniqueColorsMap.entries()).map(([color_name, color_hex]) => ({
    color_name,
    color_hex,
  }));

  const initialColor = colors[0]?.color_name || 'Original';
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const cartStore = useCartStore();

  // Find variant matching selected color & size
  const selectedVariant = variants.find(
    (v) => v.color_name === selectedColor && v.size === selectedSize
  );

  const isSelectedVariantInStock =
    selectedVariant != null && selectedVariant.inventory_count > 0;

  // Calculate current price in Rupees
  const currentPriceRupees =
    selectedVariant?.price_override_paise != null
      ? Math.round(selectedVariant.price_override_paise / 100)
      : basePriceRupees;

  const handleAddToCart = () => {
    if (!selectedVariant || !isSelectedVariantInStock) return;

    cartStore.addItem({
      id: selectedVariant.sku,
      variantId: selectedVariant.sku,
      productId: productId,
      name: productName,
      size: selectedVariant.size,
      colorName: selectedVariant.color_name,
      unitPricePaise: currentPriceRupees * 100,
      quantity: 1,
      imageUrl: productImage,
      maxInventory: selectedVariant.inventory_count,
    });

    cartStore.openCart();
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Price Display */}
      <div className="flex items-baseline space-x-3">
        <span className="font-mono text-2xl font-semibold text-ink">
          ₹{currentPriceRupees.toLocaleString('en-IN')}
        </span>
        <span className="font-mono text-xs text-dust">TAX INCLUDED</span>
      </div>

      {/* 1. Color Swatches */}
      <div>
        <div className="flex items-center justify-between">
          <label className="font-body text-xs font-semibold uppercase tracking-wider text-saddle">
            Color: <span className="text-ink">{selectedColor}</span>
          </label>
        </div>
        <div className="mt-3 flex items-center space-x-3">
          {colors.map((c) => {
            const isSelected = selectedColor === c.color_name;
            return (
              <button
                key={c.color_name}
                onClick={() => {
                  setSelectedColor(c.color_name);
                  setSelectedSize(null); // reset size when color changes
                }}
                className={`group relative h-9 w-9 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-brass ${
                  isSelected ? 'border-brass scale-110 shadow-md' : 'border-dust/40 hover:scale-105'
                }`}
                style={{ backgroundColor: c.color_hex }}
                aria-label={`Select color ${c.color_name}`}
                title={c.color_name}
              >
                {isSelected && (
                  <Check
                    className={`absolute inset-0 m-auto h-4 w-4 ${
                      c.color_hex.toLowerCase() === '#f1ead8' ? 'text-ink' : 'text-bone'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Size Selector + Size Guide Link */}
      <div>
        <div className="flex items-center justify-between">
          <label className="font-body text-xs font-semibold uppercase tracking-wider text-saddle">
            Size: <span className="text-ink">{selectedSize || 'Select a size'}</span>
          </label>

          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="flex items-center gap-1 font-mono text-xs text-brass hover:text-ink transition-colors focus:outline-none"
          >
            <Ruler className="h-3.5 w-3.5" />
            <span>Size Guide</span>
          </button>
        </div>

        <div className="mt-3 grid grid-cols-5 gap-2.5">
          {ALL_SIZES.map((size) => {
            const matchingVariant = variants.find(
              (v) => v.color_name === selectedColor && v.size === size
            );
            const inStock = Boolean(matchingVariant && matchingVariant.inventory_count > 0);
            const isSelected = selectedSize === size;

            return (
              <button
                key={size}
                disabled={!inStock}
                onClick={() => setSelectedSize(size)}
                aria-disabled={!inStock}
                className={`relative flex h-11 items-center justify-center rounded-sm border font-mono text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brass ${
                  !inStock
                    ? 'border-dust/20 bg-dust/10 text-dust/50 cursor-not-allowed opacity-40'
                    : isSelected
                    ? 'border-brass bg-ink text-bone font-bold shadow-md'
                    : 'border-dust/40 bg-bone text-ink hover:border-saddle hover:text-saddle'
                }`}
              >
                <span>{size}</span>
                {/* Diagonal Out-Of-Stock Strike */}
                {!inStock && (
                  <svg
                    className="absolute inset-0 h-full w-full stroke-dust/50"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <line x1="0" y1="100" x2="100" y2="0" strokeWidth="2" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Add to Bag Magnetic Button */}
      <div className="pt-2">
        <MagneticButton
          disabled={!selectedSize || !isSelectedVariantInStock}
          onClick={handleAddToCart}
          className={`w-full py-4 rounded-sm border transition-all ${
            !selectedSize || !isSelectedVariantInStock
              ? 'bg-dust/20 text-dust/60 border-dust/30 cursor-not-allowed opacity-60'
              : addedFeedback
              ? 'bg-brass text-ink border-brass shadow-lg'
              : 'bg-saddle text-bone border-brass/50 hover:bg-brass hover:text-ink shadow-md'
          }`}
        >
          {!selectedSize
            ? 'Select a Size'
            : !isSelectedVariantInStock
            ? 'Out of Stock'
            : addedFeedback
            ? 'Added to Bag!'
            : `Add to Bag — ₹${currentPriceRupees.toLocaleString('en-IN')}`}
        </MagneticButton>
      </div>

      {/* Size Guide Side Drawer */}
      <SizeGuideDrawer
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
