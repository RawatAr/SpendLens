import { Variants, Transition } from "framer-motion";

// ============================================================================
// UNIFIED MOTION LANGUAGE SYSTEM
// ============================================================================
// This file defines a comprehensive motion design system with:
// - Smooth easing curves
// - Cinematic timing
// - Synchronized reveals
// - Orchestrated scroll behavior
// - Unified animation patterns
// ============================================================================

// ============================================================================
// EASING CURVES
// ============================================================================
// Premium easing functions for cinematic motion
export const EASING = {
  // Smooth, natural motion
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  
  // Quick, snappy motion
  snappy: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  
  // Elastic bounce
  elastic: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  
  // Cinematic ease-out
  cinematic: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  
  // Subtle ease-in-out
  subtle: [0.4, 0, 0.6, 1] as [number, number, number, number],
  
  // Linear for continuous motion
  linear: [0, 0, 1, 1] as [number, number, number, number],
};

// ============================================================================
// TIMING DURATION
// ============================================================================
// Standardized animation durations for consistency
export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  cinematic: 1.2,
  epic: 2,
};

// ============================================================================
// TRANSITION PRESETS
// ============================================================================
// Pre-configured transitions for common use cases
export const TRANSITIONS: Record<string, Transition> = {
  // Quick hover interactions
  hover: {
    duration: DURATION.fast,
    ease: EASING.smooth,
  },
  
  // Smooth page transitions
  page: {
    duration: DURATION.normal,
    ease: EASING.cinematic,
  },
  
  // Cinematic reveals
  reveal: {
    duration: DURATION.cinematic,
    ease: EASING.smooth,
  },
  
  // Ambient background motion
  ambient: {
    duration: DURATION.epic,
    ease: EASING.subtle,
  },
  
  // Snappy microinteractions
  micro: {
    duration: DURATION.instant,
    ease: EASING.snappy,
  },
  
  // Elastic bounce effects
  bounce: {
    duration: DURATION.normal,
    ease: EASING.elastic,
  },
};

// ============================================================================
// MOTION VARIANTS
// ============================================================================

// Fade up with staggered reveal
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.smooth,
      delay: custom * 0.1,
    },
  }),
};

// Fade in with scale
export const fadeScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING.smooth,
      delay: custom * 0.1,
    },
  }),
};

// Slide from left
export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.cinematic,
      delay: custom * 0.1,
    },
  }),
};

// Slide from right
export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.cinematic,
      delay: custom * 0.1,
    },
  }),
};

// Staggered children reveal
export const staggeredChildren: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: DURATION.normal,
      ease: EASING.smooth,
    },
  },
};

// Counter animation
export const counterVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASING.elastic,
      delay: custom * 0.2,
    },
  }),
};

// Pulse animation
export const pulseVariants: Variants = {
  idle: {
    scale: 1,
    opacity: 1,
  },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      ease: EASING.subtle,
      repeat: Infinity,
    },
  },
};

// Float animation
export const floatVariants: Variants = {
  idle: {
    y: 0,
  },
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      ease: EASING.subtle,
      repeat: Infinity,
    },
  },
};

// Glow pulse animation
export const glowVariants: Variants = {
  idle: {
    opacity: 0.1,
    scale: 1,
  },
  glow: {
    opacity: [0.1, 0.3, 0.1],
    scale: [1, 1.1, 1],
    transition: {
      duration: 3,
      ease: EASING.subtle,
      repeat: Infinity,
    },
  },
};

// Rotate animation
export const rotateVariants: Variants = {
  idle: {
    rotate: 0,
  },
  rotate: {
    rotate: 360,
    transition: {
      duration: 4,
      ease: EASING.linear,
      repeat: Infinity,
    },
  },
};

// Hero text reveal
export const heroTextRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.cinematic,
      ease: EASING.cinematic,
      delay: custom * 0.15,
    },
  }),
};

// Button hover
export const buttonHoverVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: DURATION.fast,
      ease: EASING.smooth,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: DURATION.instant,
      ease: EASING.snappy,
    },
  },
};

// Card hover
export const cardHoverVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: DURATION.fast,
      ease: EASING.smooth,
    },
  },
};

// Connection line animation
export const connectionLineVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING.smooth,
    },
  },
};

// Progress bar animation
export const progressVariants: Variants = {
  hidden: {
    width: 0,
  },
  visible: (custom: number = 100) => ({
    width: `${custom}%`,
    transition: {
      duration: DURATION.slow,
      ease: EASING.smooth,
    },
  }),
};

// Staggered grid reveal
export const gridRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      duration: DURATION.normal,
      ease: EASING.smooth,
    },
  },
};

// ============================================================================
// SCROLL ANIMATION CONFIG
// ============================================================================

// Viewport margin for scroll-triggered animations
export const VIEWPORT_MARGIN = "-100px";

// Amount of element that must be visible to trigger animation
export const VIEWPORT_AMOUNT = 0.2;

// Once animation triggers, it stays visible
export const VIEWPORT_ONCE = true;

// ============================================================================
// MOTION UTILITIES
// ============================================================================

// Create staggered delay array
export const createStaggeredDelays = (count: number, baseDelay: number = 0.1): number[] => {
  return Array.from({ length: count }, (_, i) => i * baseDelay);
};

// Calculate delay based on index and stagger
export const getStaggeredDelay = (index: number, stagger: number = 0.1): number => {
  return index * stagger;
};

// Create custom transition with delay
export const createTransition = (
  duration: number = DURATION.normal,
  delay: number = 0,
  ease: [number, number, number, number] = EASING.smooth
): Transition => ({
  duration,
  delay,
  ease,
});

// ============================================================================
// MOTION PRESETS
// ============================================================================

// Common motion combinations
export const MOTION_PRESETS = {
  // Hero section entrance
  heroEntrance: {
    variants: heroTextRevealVariants,
    initial: "hidden",
    animate: "visible",
  },
  
  // Card reveal
  cardReveal: {
    variants: fadeScaleVariants,
    initial: "hidden",
    animate: "visible",
  },
  
  // List item reveal
  listItemReveal: {
    variants: fadeUpVariants,
    initial: "hidden",
    animate: "visible",
  },
  
  // Staggered children
  staggeredReveal: {
    variants: staggeredChildren,
    initial: "hidden",
    animate: "visible",
  },
  
  // Continuous pulse
  continuousPulse: {
    variants: pulseVariants,
    initial: "idle",
    animate: "pulse",
  },
  
  // Continuous float
  continuousFloat: {
    variants: floatVariants,
    initial: "idle",
    animate: "float",
  },
  
  // Continuous rotate
  continuousRotate: {
    variants: rotateVariants,
    initial: "idle",
    animate: "rotate",
  },
};
