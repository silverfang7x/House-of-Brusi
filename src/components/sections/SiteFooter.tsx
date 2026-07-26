'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, ArrowRight } from 'lucide-react';

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatusMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setStatusMessage('Thank you for joining the House of Brusi inner circle.');
    setEmail('');
  };

  return (
    <footer className="bg-ink text-bone border-t border-dust/20 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Brand Statement Header */}
        <div className="pb-12 border-b border-dust/20 max-w-3xl">
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-[0.2em] text-bone uppercase hover:text-brass transition-colors"
          >
            HOUSE OF BRUSI
          </Link>
          <p className="mt-4 font-body text-base text-dust leading-relaxed">
            House of Brusi redefines Western wear through bespoke tailoring, raw
            selvedge textures, and sun-bleached heritage canvases. Crafted for
            those who honor enduring tradition with modern editorial restraint.
          </p>
        </div>

        {/* 4 Column Layout */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Shop */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-brass uppercase">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-dust">
              <li>
                <Link href="/shop" className="hover:text-bone transition-colors">
                  All Apparel
                </Link>
              </li>
              <li>
                <Link href="/collections/desert-bloom" className="hover:text-bone transition-colors">
                  Desert Bloom
                </Link>
              </li>
              <li>
                <Link href="/collections/midnight-rodeo" className="hover:text-bone transition-colors">
                  Midnight Rodeo
                </Link>
              </li>
              <li>
                <Link href="/collections/prairie-modern" className="hover:text-bone transition-colors">
                  Prairie Modern
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-brass uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-dust">
              <li>
                <Link href="/policies/shipping" className="hover:text-bone transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-bone transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-bone transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-bone transition-colors">
                  Client Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-brass uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-dust">
              <li>
                <Link href="/about" className="hover:text-bone transition-colors">
                  Our Atelier
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-bone transition-colors">
                  Journal & Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-bone transition-colors">
                  Artisanal Craftsmanship
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-brass uppercase">
              Newsletter
            </h3>
            <p className="mt-4 font-body text-xs text-dust leading-relaxed">
              Subscribe to receive private preview access to seasonal capsule releases and editorial stories.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-bone/10 border border-dust/30 px-3 py-2 text-sm text-bone placeholder-dust focus:outline-none focus:border-brass rounded-sm"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 p-1 text-brass hover:text-bone transition-colors focus:outline-none"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {error && (
                <p className="mt-2 font-body text-xs text-merlot">{error}</p>
              )}
              {statusMessage && (
                <p className="mt-2 font-body text-xs text-brass">{statusMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Social Row */}
        <div className="py-6 border-t border-dust/15 flex items-center justify-between">
          <a
            href="https://instagram.com/house_of_brusi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-xs text-dust hover:text-brass transition-colors focus:outline-none focus:ring-2 focus:ring-brass px-1 py-0.5 rounded-sm"
          >
            <Instagram className="h-4 w-4" />
            <span>@house_of_brusi</span>
          </a>
          <span className="font-mono text-xs text-dust/60">
            BOUTIQUE ATELIER &bull; EST. 2026
          </span>
        </div>

        {/* Bottom Bar & Razorpay Payment Method SVGs */}
        <div className="pt-6 border-t border-dust/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-dust/70">
          <p>&copy; {new Date().getFullYear()} House of Brusi. All rights reserved.</p>

          <div className="flex items-center space-x-4" aria-label="Supported Payment Methods">
            {/* Visa SVG */}
            <svg
              className="h-5 w-8 fill-current text-dust hover:text-bone transition-colors"
              viewBox="0 0 36 24"
              role="img"
              aria-label="Visa"
            >
              <rect width="36" height="24" rx="2" fill="#1E293B" />
              <path
                d="M13.8 16.5l1.6-9.6h2.6l-1.6 9.6h-2.6zm8.8-9.4c-.5-.2-1.3-.4-2.3-.4-2.5 0-4.3 1.3-4.3 3.2 0 1.4 1.3 2.2 2.2 2.7.9.5 1.2.8 1.2 1.2 0 .6-.7.9-1.4.9-1 0-1.5-.1-2.3-.5l-.3-.2-.4 2.4c.7.3 1.9.5 3.1.5 2.7 0 4.5-1.3 4.5-3.3 0-1.1-.7-1.9-2.1-2.6-.9-.4-1.4-.7-1.4-1.2 0-.4.5-.8 1.4-.8.8 0 1.4.2 1.8.4l.2.1.3-2.4zm5.8-.2h-2c-.6 0-1.1.2-1.3.8l-3.8 9.2h2.7l.5-1.5h3.3l.3 1.5h2.4l-2.1-10zm-1.8 6.5l1.1-3.1.6 3.1h-1.7zm-18.7-6.5l-2.5 6.5-.3-1.4c-.5-1.6-1.9-3.4-3.5-4.2l2.3 8.7h2.8l4.2-9.6h-3z"
                fill="#F1EAD8"
              />
            </svg>

            {/* Mastercard SVG */}
            <svg
              className="h-5 w-8 fill-current text-dust hover:text-bone transition-colors"
              viewBox="0 0 36 24"
              role="img"
              aria-label="Mastercard"
            >
              <rect width="36" height="24" rx="2" fill="#1E293B" />
              <circle cx="14" cy="12" r="6" fill="#EB001B" opacity="0.9" />
              <circle cx="22" cy="12" r="6" fill="#F79E1B" opacity="0.9" />
            </svg>

            {/* UPI SVG */}
            <svg
              className="h-5 w-10 text-dust hover:text-bone transition-colors"
              viewBox="0 0 48 24"
              role="img"
              aria-label="UPI"
            >
              <rect width="48" height="24" rx="2" fill="#1E293B" />
              <text
                x="24"
                y="16"
                textAnchor="middle"
                fill="#F1EAD8"
                fontSize="10"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                UPI
              </text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
