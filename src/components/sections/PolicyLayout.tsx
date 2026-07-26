'use client';

import React, { useEffect, useState } from 'react';
import { StitchedLine } from '@/components/motion/StitchedLine';

export interface PolicySectionItem {
  id: string;
  title: string;
}

interface PolicyLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: PolicySectionItem[];
  children: React.ReactNode;
}

export function PolicyLayout({
  title,
  subtitle,
  lastUpdated,
  sections,
  children,
}: PolicyLayoutProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-bone text-ink pb-24">
      {/* Header Banner */}
      <div className="bg-ink text-bone py-16 border-b border-dust/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="w-32 mb-4">
            <StitchedLine />
          </div>
          <span className="font-mono text-xs text-brass uppercase tracking-widest">
            House of Brusi Governance & Client Privileges
          </span>
          <h1 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-bone">
            {title}
          </h1>
          <p className="mt-3 font-body text-base text-dust max-w-xl">
            {subtitle}
          </p>
          <span className="mt-4 font-mono text-xs text-dust/70">
            Last Updated: {lastUpdated}
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Table of Contents Sidebar (Scroll-spied) */}
          <aside className="lg:col-span-3 sticky top-28 hidden lg:block border-r border-dust/30 pr-6">
            <h3 className="font-mono text-xs font-semibold text-saddle uppercase tracking-wider mb-4">
              Contents
            </h3>
            <nav className="space-y-2">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`block w-full text-left font-body text-xs transition-colors py-1 pl-2 border-l-2 ${
                    activeSectionId === sec.id
                      ? 'border-brass text-ink font-semibold bg-ink/5'
                      : 'border-transparent text-dust hover:text-ink'
                  }`}
                >
                  {sec.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Policy Body */}
          <main className="lg:col-span-9 space-y-12 font-body text-sm text-ink/80 leading-relaxed">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
