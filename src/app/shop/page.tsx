import React from 'react';
import { getPublishedProducts } from '@/lib/supabase/queries/products';
import { CollectionClientView } from '../collections/[slug]/CollectionClientView';

export default async function ShopPage() {
  const allProducts = await getPublishedProducts();

  const shopCollection = {
    name: 'All Garments Catalog',
    slug: 'shop',
    description: 'Explore the complete House of Brusi atelier collection of artisanal Western wear.',
    hero_image_url:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
  };

  return <CollectionClientView collection={shopCollection} products={allProducts} />;
}
