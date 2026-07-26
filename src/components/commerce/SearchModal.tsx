'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl rounded-sm bg-bone p-6 text-ink shadow-2xl border border-dust"
            role="dialog"
            aria-modal="true"
            aria-label="Search Catalog"
          >
            <div className="flex items-center justify-between border-b border-dust pb-3">
              <div className="flex items-center space-x-3 flex-1">
                <Search className="h-5 w-5 text-saddle" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products, fabrics, or collections..."
                  className="w-full bg-transparent font-body text-base text-ink placeholder-dust focus:outline-none"
                />
              </div>
              <button
                onClick={onClose}
                className="p-1 text-dust hover:text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-brass"
                aria-label="Close search modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 py-8 text-center">
              <p className="font-mono text-sm text-dust">
                Type keywords above to search House of Brusi catalog.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
