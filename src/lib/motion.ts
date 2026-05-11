/**
 * Motion Utilities — Premium AI Finance Observatory
 *
 * Spring animations, staggered reveals, hover transitions,
 * scroll choreography, and parallax utilities.
 */

import { Variants } from "framer-motion";

// ── Spring Animation Presets ─────────────────────────────────────────────────────

export const springPresets = {
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  },
  smooth: {
    type: "spring" as const,
    stiffness: 150,
    damping: 20,
  },
  premium: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
  },
  snappy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
};

// ── Easing Functions ─────────────────────────────────────────────────────────────

export const easingPresets = {
  easeOut: [0, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  premium: [0.25, 0.1, 0.25, 1] as const,
  smooth: [0.2, 0, 0.2, 1] as const,
};

// ── Fade Up Variants ─────────────────────────────────────────────────────────────

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: easingPresets.easeOut,
    },
  }),
};

// ── Fade In Variants ────────────────────────────────────────────────────────────

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: easingPresets.easeOut,
    },
  }),
};

// ── Scale Fade Variants ─────────────────────────────────────────────────────────

export const scaleFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: easingPresets.premium,
    },
  }),
};

// ── Slide In Variants ────────────────────────────────────────────────────────────

export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: easingPresets.smooth,
    },
  }),
};

export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: easingPresets.smooth,
    },
  }),
};

// ── Staggered Children Variants ─────────────────────────────────────────────────

export const staggeredChildrenVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ── Card Hover Variants ─────────────────────────────────────────────────────────

export const cardHoverVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: easingPresets.smooth,
    },
  },
};

// ── Button Hover Variants ───────────────────────────────────────────────────────

export const buttonHoverVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: easingPresets.easeOut,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// ── Number Counter Animation ─────────────────────────────────────────────────────

export const counterVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easingPresets.premium,
    },
  },
};

// ── Parallax Scroll Variants ────────────────────────────────────────────────────

export const parallaxScrollVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easingPresets.smooth,
    },
  },
};

// ── Hero Text Reveal Variants ────────────────────────────────────────────────────

export const heroTextRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: easingPresets.premium,
    },
  }),
};

// ── Pulse Glow Variants ─────────────────────────────────────────────────────────

export const pulseGlowVariants: Variants = {
  initial: {
    opacity: 0.5,
    scale: 1,
  },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ── Float Variants ───────────────────────────────────────────────────────────────

export const floatVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ── Shimmer Variants ─────────────────────────────────────────────────────────────

export const shimmerVariants = {
  initial: {
    x: "-100%",
  },
  animate: {
    x: "100%",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ── Typing Indicator Variants ───────────────────────────────────────────────────

export const typingIndicatorVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: [0.2, 1, 0.2],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ── Scroll Progress Variants ────────────────────────────────────────────────────

export const scrollProgressVariants: Variants = {
  hidden: {
    width: "0%",
  },
  visible: {
    width: "100%",
    transition: {
      duration: 1.5,
      ease: easingPresets.smooth,
    },
  },
};

// ── Tooltip Variants ─────────────────────────────────────────────────────────────

export const tooltipVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: easingPresets.easeOut,
    },
  },
};

// ── Modal Variants ───────────────────────────────────────────────────────────────

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easingPresets.premium,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: easingPresets.easeIn,
    },
  },
};

// ── Tab Content Variants ───────────────────────────────────────────────────────

export const tabContentVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: easingPresets.smooth,
    },
  },
};

// ── Graph Animation Variants ─────────────────────────────────────────────────────

export const graphBarVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: (height: number) => ({
    height: `${height}%`,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: easingPresets.smooth,
    },
  }),
};

// ── Savings Animation Variants ───────────────────────────────────────────────────

export const savingsRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      delay: 0.3,
      ease: easingPresets.premium,
    },
  },
};

// ── Connection Line Variants ─────────────────────────────────────────────────────

export const connectionLineVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: easingPresets.smooth,
    },
  },
};

// ── Node Pulse Variants ─────────────────────────────────────────────────────────

export const nodePulseVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ── Marquee Variants ─────────────────────────────────────────────────────────────

export const marqueeVariants: Variants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
};

// ── Viewport Scroll Trigger Hook ─────────────────────────────────────────────────

export const viewportScrollTrigger = {
  once: true,
  amount: 0.3, // Trigger when 30% of element is visible
};

// ── Stagger Delay Calculator ───────────────────────────────────────────────────

export function getStaggerDelay(index: number, baseDelay: number = 0.1): number {
  return index * baseDelay;
}

// ── Duration Calculator ───────────────────────────────────────────────────────

export function getDuration(
  type: "fast" | "normal" | "slow" | "very-slow"
): number {
  const durations = {
    fast: 0.2,
    normal: 0.5,
    slow: 0.8,
    "very-slow": 1.2,
  };
  return durations[type];
}
