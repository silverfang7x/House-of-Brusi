'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariant } from '@/lib/motion';
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe';

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotionSafe();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
