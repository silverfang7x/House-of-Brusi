import React from 'react';
import Image from 'next/image';
import { StitchedLine } from '@/components/motion/StitchedLine';

const JOURNAL_ARTICLES = [
  {
    id: 'j-1',
    title: 'The Art of Selvedge: Why Weight & Weave Matter in Western Tailoring',
    excerpt: 'An investigation into 14oz shuttle-loomed Japanese denim and how raw indigo eases over time.',
    date: 'January 18, 2026',
    category: 'Textile Craft',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'j-2',
    title: 'High Prairie Horizons: Styling Belgian Linen in Arid Landscapes',
    excerpt: 'Layering heavy linen dusters with antiqued brass buckles for effortless editorial poise.',
    date: 'January 05, 2026',
    category: 'Editorial Lookbook',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'j-3',
    title: 'Forged & Hand-Stitched: The Small-Batch Hardware Atelier',
    excerpt: 'Behind the scenes with our metal artisans forging mother-of-pearl snaps and solid brass fixtures.',
    date: 'December 22, 2025',
    category: 'Atelier Stories',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-bone text-ink pb-24">
      <div className="bg-ink text-bone py-20 border-b border-dust/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="w-36 mb-4">
            <StitchedLine />
          </div>
          <span className="font-mono text-xs text-brass uppercase tracking-widest">
            House of Brusi Gazette
          </span>
          <h1 className="mt-2 font-display text-4xl lg:text-6xl font-semibold text-bone">
            The Atelier Journal
          </h1>
          <p className="mt-3 font-body text-base text-dust max-w-lg">
            Essays on textile craftsmanship, Western heritage, and high-prairie editorial style.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article key={article.id} className="group relative flex flex-col bg-ink text-bone border border-dust/20 rounded-sm overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-brass mb-2">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-bone group-hover:text-brass transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-3 font-body text-xs text-dust leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-dust/20">
                  <span className="font-mono text-xs text-brass group-hover:underline">
                    Read Essay &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
