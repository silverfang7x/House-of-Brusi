import React from 'react';
import { notFound } from 'next/navigation';
import { CollectionClientView } from './CollectionClientView';
import { getPublishedProducts } from '@/lib/supabase/queries/products';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

const COLLECTIONS_MAP: Record<
  string,
  { name: string; slug: string; description: string; hero_image_url: string }
> = {
  'desert-bloom': {
    name: 'Desert Bloom',
    slug: 'desert-bloom',
    description: 'Sun-bleached linen and earthy terracotta tones inspired by arid landscapes.',
    hero_image_url:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
  },
  'midnight-rodeo': {
    name: 'Midnight Rodeo',
    slug: 'midnight-rodeo',
    description: 'Deep indigo, worn leather textures, and tailored western silhouettes.',
    hero_image_url:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
  },
  'prairie-modern': {
    name: 'Prairie Modern',
    slug: 'prairie-modern',
    description: 'Minimalist workwear, raw selvedge cotton, and structured heritage tailoring.',
    hero_image_url:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
  },
};

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  const collection = COLLECTIONS_MAP[resolvedParams.slug];

  if (!collection) {
    notFound();
  }

  const allProducts = await getPublishedProducts();

  return <CollectionClientView collection={collection} products={allProducts} />;
}
