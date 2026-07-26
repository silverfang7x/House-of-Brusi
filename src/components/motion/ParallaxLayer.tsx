'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe';
import { PARALLAX_MAX_TRANSLATION_PERCENT } from '@/lib/motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // e.g. 0.3 or -0.2
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.2,
  className,
}: ParallaxLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rawShift = speed * 50;
  const clampedShift = Math.min(
    Math.max(rawShift, -PARALLAX_MAX_TRANSLATION_PERCENT),
    PARALLAX_MAX_TRANSLATION_PERCENT
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${clampedShift}%`, `${-clampedShift}%`]
  );

  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={containerRef} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
