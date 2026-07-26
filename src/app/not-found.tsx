'use client';

import React from 'react';
import Link from 'next/link';
import { StitchedLine } from '@/components/motion/StitchedLine';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-ink text-bone flex items-center justify-center py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Stitched Line Signature Motif */}
        <div className="w-48 mb-8">
          <StitchedLine />
        </div>

        {/* Brand Utility Badge */}
        <span className="font-mono text-xs text-brass uppercase tracking-widest flex items-center gap-1.5 mb-4">
          <Compass className="h-4 w-4" /> Error 404 &bull; Uncharted Terrain
        </span>

        {/* Display Headline */}
        <h1 className="font-display text-4xl sm:text-6xl font-semibold text-bone tracking-tight">
          The Horizon You Seek Has Shifted
        </h1>

        {/* Witty Brand Voice Copy */}
        <p className="mt-6 font-body text-base md:text-lg text-dust leading-relaxed max-w-lg">
          The trail you are following leads out into the open high prairie. This page has been reclaimed by the dust, but your garment journey continues.
        </p>

        {/* Magnetic CTA Back to Homepage */}
        <div className="mt-10">
          <Link href="/">
            <MagneticButton className="px-8 py-4 bg-saddle text-bone border border-brass/50 rounded-sm hover:bg-brass hover:text-ink transition-colors shadow-xl">
              Return to Atelier Mainstem &rarr;
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
