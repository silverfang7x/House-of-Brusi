'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/lib/motion';
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe';

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotionSafe();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={fadeUpVariant} className={className}>
      {children}
    </motion.div>
  );
}
