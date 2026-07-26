'use client';

import React from 'react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { StitchedLine } from '@/components/motion/StitchedLine';

export function Manifesto() {
  return (
    <section className="bg-bone text-ink py-24 border-b border-dust/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RevealOnScroll className="mb-12 w-48">
          <StitchedLine />
        </RevealOnScroll>

        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Editorial Pull-Quote */}
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-saddle tracking-tight">
              &ldquo;We refuse the disposable noise of fast-fashion Western tropes. True Western apparel is defined by structural discipline, unyielding fabric, and silent poise.&rdquo;
            </h2>
            <span className="mt-6 block font-mono text-xs text-brass uppercase tracking-widest">
              &mdash; House of Brusi Atelier Manifesto
            </span>
          </div>

          {/* Right Column: Brand Voice Body Copy */}
          <div className="lg:col-span-6 space-y-6 font-body text-base text-ink/80 leading-relaxed">
            <p>
              At House of Brusi, Western wear is not a costume; it is a structural philosophy
              rooted in the raw weight of 14oz Japanese selvedge denim, garment-dyed indigo
              chambray, and heavy Belgian linen that molds to the wearer over decades.
            </p>
            <p>
              Every stress point is reinforced with bespoke top-stitching, every jacket fitted with
              antiqued brass hardware forged to endure both terrain and time. We design specifically
              for women who demand rugged utility without sacrificing architectural elegance.
            </p>
            <p>
              Tailored in small-batch seasonal runs, our garments bridge the quiet vastness of the
              high prairie with modern high-fashion editorial clarity.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
