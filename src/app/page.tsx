import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { FeaturedCollections } from '@/components/sections/FeaturedCollections';
import { ShopTheGram } from '@/components/sections/ShopTheGram';

export default function HomePage() {
  return (
    <main className="w-full bg-bone">
      {/* 1. Opening Hero Section */}
      <Hero />

      {/* 2. Brand Manifesto */}
      <Manifesto />

      {/* 3. Featured Collections Grid */}
      <FeaturedCollections />

      {/* 4. Instagram Editorial Grid */}
      <ShopTheGram />
    </main>
  );
}
