'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { TiltCard } from '@/components/ui/TiltCard';
import { StitchedLine } from '@/components/motion/StitchedLine';

export interface CollectionData {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  imageUrl: string;
}

const FEATURED_COLLECTIONS: CollectionData[] = [
  {
    id: '1',
    name: 'Desert Bloom',
    slug: 'desert-bloom',
    description: 'Sun-bleached linen and earthy terracotta tones inspired by arid landscapes.',
    itemCount: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Midnight Rodeo',
    slug: 'midnight-rodeo',
    description: 'Deep indigo, worn leather textures, and tailored western silhouettes.',
    itemCount: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Prairie Modern',
    slug: 'prairie-modern',
    description: 'Minimalist workwear, raw selvedge cotton, and structured heritage tailoring.',
    itemCount: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  },
];

export function FeaturedCollections() {
  return (
    <section className="bg-bone text-ink py-24 border-b border-dust/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RevealOnScroll className="flex flex-col items-center text-center mb-16">
          <div className="w-36 mb-4">
            <StitchedLine />
          </div>
          <span className="font-mono text-xs text-brass uppercase tracking-widest">
            Curated Lines
          </span>
          <h2 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-ink">
            Seasonal Collections
          </h2>
          <p className="mt-3 font-body text-base text-dust max-w-lg">
            Explore bespoke garments crafted across three distinct artisanal worlds.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_COLLECTIONS.map((collection) => (
            <RevealOnScroll key={collection.id}>
              <Link href={`/collections/${collection.slug}`} className="block group">
                <TiltCard className="bg-ink text-bone border border-dust/20 shadow-xl">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={collection.imageUrl}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    
                    <div className="absolute top-4 right-4 z-10">
                      <span className="font-mono text-xs bg-saddle/90 text-bone px-2.5 py-1 rounded-sm border border-brass/40 shadow-md">
                        {collection.itemCount} Pieces
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <h3 className="font-display text-2xl font-semibold text-bone group-hover:text-brass transition-colors">
                        {collection.name}
                      </h3>
                      <p className="mt-2 font-body text-xs text-dust line-clamp-2 leading-relaxed">
                        {collection.description}
                      </p>
                      <span className="mt-4 inline-flex items-center font-mono text-xs text-brass uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                        Explore Line &rarr;
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
