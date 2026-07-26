'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  url: string;
  altText: string | null;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, percentX: 0, percentY: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const activeImage = images[activeIndex] || {
    id: 'placeholder',
    url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=90',
    altText: 'House of Brusi Product Image',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setLensPos({ x, y, percentX, percentY });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail Rail */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[600px] scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border transition-all ${
                activeIndex === idx
                  ? 'border-brass ring-1 ring-brass scale-105'
                  : 'border-dust/30 opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText || `Product thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Viewer with Magnifier Lens */}
      <div
        ref={containerRef}
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
        onMouseMove={handleMouseMove}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-dust/10 border border-dust/30 cursor-crosshair"
      >
        <Image
          src={activeImage.url}
          alt={activeImage.altText || 'House of Brusi Product Detail'}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Magnifier Lens Overlay */}
        {showLens && (
          <div
            className="pointer-events-none absolute hidden md:block z-30 h-44 w-44 rounded-full border-2 border-brass shadow-2xl overflow-hidden bg-bone"
            style={{
              top: `${lensPos.y - 88}px`,
              left: `${lensPos.x - 88}px`,
              backgroundImage: `url(${activeImage.url})`,
              backgroundPosition: `${lensPos.percentX}% ${lensPos.percentY}%`,
              backgroundSize: '250%',
              backgroundRepeat: 'no-repeat',
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
