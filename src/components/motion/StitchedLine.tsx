'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe';

interface StitchedLineProps {
  className?: string;
}

export function StitchedLine({ className = '' }: StitchedLineProps) {
  const shouldReduceMotion = useReducedMotionSafe();

  if (shouldReduceMotion) {
    return (
      <div className={`w-full overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 1000 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-3"
          preserveAspectRatio="none"
        >
          <path
            d="M0 6 Q 250 4, 500 6 T 1000 6"
            stroke="var(--color-brass)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1000 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-3"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 6 Q 250 4, 500 6 T 1000 6"
          stroke="var(--color-brass)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>
    </div>
  );
}
