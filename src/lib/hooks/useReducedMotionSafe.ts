'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * Custom hook wrapping Framer Motion's `useReducedMotion`.
 * Returns a strict boolean indicating whether reduced motion is preferred by the user's OS settings.
 */
export function useReducedMotionSafe(): boolean {
  const shouldReduce = useReducedMotion();
  return Boolean(shouldReduce);
}
