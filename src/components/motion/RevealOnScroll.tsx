'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/lib/motion';
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealOnScroll({ children, className }: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotionSafe();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
