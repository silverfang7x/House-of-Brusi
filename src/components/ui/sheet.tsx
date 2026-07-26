'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from 'lucide-react';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'right' | 'left';
  className?: string;
}

export function Sheet({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  className = '',
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const slideVariants: Variants = {
    hidden: { x: side === 'right' ? '100%' : '-100%' },
    visible: {
      x: '0%',
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      x: side === 'right' ? '100%' : '-100%',
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/75 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Sheet Drawer'}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative z-10 ml-auto h-full w-full max-w-lg bg-bone p-6 text-ink shadow-2xl border-l border-dust/30 overflow-y-auto ${className}`}
          >
            <div className="flex items-center justify-between border-b border-dust/30 pb-4">
              <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 text-dust hover:text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-brass"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
