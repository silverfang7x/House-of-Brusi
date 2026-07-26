'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { StitchedLine } from '@/components/motion/StitchedLine';
import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bone text-ink pb-24">
      {/* 1. Hero Header */}
      <section className="bg-ink text-bone py-24 border-b border-dust/20 relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="w-36 mb-6">
            <StitchedLine />
          </div>
          <span className="font-mono text-xs text-brass uppercase tracking-widest">
            Atelier Origin & Philosophy
          </span>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-bone tracking-tight">
            The Horizon of Western Craftsmanship
          </h1>
          <p className="mt-6 font-body text-base md:text-lg text-dust max-w-2xl leading-relaxed">
            Born from a refusal of disposable trends and a reverence for heavy raw textiles, House of Brusi reimagines Western apparel for modern women of silent poise.
          </p>
        </div>
      </section>

      {/* 2. Chapter 1: The Foundation */}
      <section className="py-24 max-w-5xl mx-auto px-6 lg:px-8">
        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs text-brass uppercase tracking-widest">
              Chapter I &bull; Structural Discipline
            </span>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Where Architecture Meets Prairie Heritage
            </h2>
            <p className="font-body text-sm text-ink/80 leading-relaxed">
              Western wear was never meant to be delicate. It was forged to endure the unyielding elements—sun-baked dust, saddle friction, and decades of wind. Yet modern fast fashion reduced this rich heritage to thin synthetic polyesters and flimsy novelty costumes.
            </p>
            <p className="font-body text-sm text-ink/80 leading-relaxed">
              House of Brusi was founded to reclaim structural discipline. We source 14oz Japanese selvedge denim, heavy Belgian linen, and Italian goat suede, tailoring each piece with hand-stitched reinforcement that softens and character-marks over a lifetime.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-dust/10 border border-dust/30 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85"
                alt="House of Brusi Atelier Textile Inspection"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 3. Full-Bleed Editorial Image Parallax Break */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-ink my-12">
        <ParallaxLayer speed={0.2} className="relative h-[120%] w-full -top-[10%] opacity-60">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=90"
            alt="High Prairie Landscape and House of Brusi Western Wear"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <blockquote className="font-display text-2xl sm:text-4xl text-bone font-medium max-w-3xl leading-snug drop-shadow-lg">
            &ldquo;Craft is not merely how a garment looks when it leaves the needle; it is how it endures ten years into the horizon.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* 4. Chapter 2: The Process */}
      <section className="py-24 max-w-5xl mx-auto px-6 lg:px-8">
        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-dust/10 border border-dust/30 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85"
                alt="Bespoke Western Wear Hardware and Stitching"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="font-mono text-xs text-brass uppercase tracking-widest">
              Chapter II &bull; Artisanal Integrity
            </span>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Small-Batch Runs & Custom Hardware
            </h2>
            <p className="font-body text-sm text-ink/80 leading-relaxed">
              We reject mass production lines. Every collection is produced in small-batch seasonal runs to eliminate textile waste and maintain pristine quality control.
            </p>
            <p className="font-body text-sm text-ink/80 leading-relaxed">
              From our mother-of-pearl snap buttons to antiqued brass buckles custom-forged for our riding belts, every accent is chosen to honor authentic Western heritage while offering an elevated high-fashion silhouette.
            </p>
            <div className="pt-4">
              <Link href="/collections">
                <MagneticButton className="px-8 py-4 bg-saddle text-bone border border-brass/50 rounded-sm hover:bg-brass hover:text-ink transition-colors shadow-md">
                  Explore Current Collections &rarr;
                </MagneticButton>
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
