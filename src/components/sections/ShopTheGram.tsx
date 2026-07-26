'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, ShoppingBag } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { StitchedLine } from '@/components/motion/StitchedLine';

// TODO Step 6: replace with live Apify-synced instagram_posts data
const INSTAGRAM_PLACEHOLDERS = [
  {
    id: 'ig-1',
    imageUrl:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    caption: 'Sahara Linen Overshirt paired with antique brass hardware. #HouseOfBrusi',
  },
  {
    id: 'ig-2',
    imageUrl:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    caption: 'Hand-stitched denim details in raw indigo selvedge. #AtelierDetails',
  },
  {
    id: 'ig-3',
    imageUrl:
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
    caption: 'Rodeo Suede Fringe Vest crafted in Italian goat suede. #WesternWear',
  },
  {
    id: 'ig-4',
    imageUrl:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
    caption: 'Mother-of-pearl snap western shirt in garment-dyed chambray. #MidnightRodeo',
  },
  {
    id: 'ig-5',
    imageUrl:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    caption: 'Prairie Chore Coat cut from heavy duck canvas twill. #PrairieModern',
  },
  {
    id: 'ig-6',
    imageUrl:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    caption: 'Sun-bleached linen duster drapes in high prairie light. #BespokeLuxury',
  },
];

export function ShopTheGram() {
  return (
    <section className="bg-bone text-ink py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RevealOnScroll className="flex flex-col items-center text-center mb-16">
          <div className="w-36 mb-4">
            <StitchedLine />
          </div>
          <span className="font-mono text-xs text-brass uppercase tracking-widest flex items-center gap-1.5">
            <Instagram className="h-4 w-4" /> @house_of_brusi
          </span>
          <h2 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-ink">
            Shop The Look
          </h2>
          <p className="mt-3 font-body text-base text-dust max-w-lg">
            Tag your House of Brusi ensemble to be featured in our editorial gallery.
          </p>
        </RevealOnScroll>

        {/* 6 Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_PLACEHOLDERS.map((item) => (
            <RevealOnScroll key={item.id}>
              <a
                href="https://instagram.com/house_of_brusi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square w-full overflow-hidden rounded-sm bg-dust/10 shadow-md focus:outline-none focus:ring-2 focus:ring-brass"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-ink/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center p-4 text-center">
                  <ShoppingBag className="h-6 w-6 text-brass mb-2" />
                  <p className="font-body text-xs text-bone line-clamp-3 leading-snug">
                    {item.caption}
                  </p>
                  <span className="mt-2 font-mono text-[10px] text-brass uppercase">
                    Shop Post &rarr;
                  </span>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
