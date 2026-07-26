import type { Variants } from 'framer-motion';

export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/**
 * Parallax Scroll Configuration Notes:
 *
 * Parallax motion should be driven via Framer Motion's `useScroll` and `useTransform` hooks.
 * To maintain 60fps performance and prevent layout breakage on fast scrolling,
 * translation must be clamped to a maximum range of [-15%, 15%] of element/container height.
 * Always verify `useReducedMotionSafe()` before binding y-axis scroll transforms.
 */
export const PARALLAX_MAX_TRANSLATION_PERCENT = 15;
