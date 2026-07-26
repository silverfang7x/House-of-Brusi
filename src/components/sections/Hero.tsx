'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StitchedLine } from '@/components/motion/StitchedLine';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Hero() {
  const headlineWords = ['TAILORED', 'FOR', 'THE', 'UNTAMED', 'HORIZON'];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-ink text-bone pt-12 pb-20">
      {/* Editorial Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-45">
        <ParallaxLayer speed={0.2} className="relative h-[120%] w-full -top-[10%]">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90"
            alt="House of Brusi Women Western Wear Editorial Photography (Placeholder - replace before launch)"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </ParallaxLayer>
      </div>

      {/* Dark Vignette Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

      {/* Main Hero Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Step 1: Signature Stitched Line Motif */}
        <div className="w-48 md:w-72 mb-8">
          <StitchedLine />
        </div>

        {/* Step 2: Display Headline with Staggered Word Reveal */}
        <StaggerGroup className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2 max-w-5xl">
          {headlineWords.map((word, idx) => (
            <StaggerItem key={idx}>
              <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-bone drop-shadow-md">
                {word}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Step 3: Supporting Subhead Fading Up */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl font-body text-base md:text-lg text-dust leading-relaxed"
        >
          Artisanal selvedge denim, heavy Belgian linen, and tailored western silhouettes
          crafted for those who honor enduring tradition with modern editorial restraint.
        </motion.p>

        {/* Step 4: Magnetic CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <Link href="/collections">
            <MagneticButton className="px-8 py-4 bg-saddle text-bone border border-brass/50 rounded-sm hover:bg-brass hover:text-ink transition-colors shadow-lg">
              Explore Collections &rarr;
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
