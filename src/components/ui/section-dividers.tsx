"use client";

import { motion } from "framer-motion";

interface CurvedDividerProps {
  className?: string;
  direction?: "up" | "down";
  color?: string;
}

export function CurvedDivider({ className = "", direction = "down", color = "#DDE5DD" }: CurvedDividerProps) {
  const path = direction === "down"
    ? "M0,0 C320,100 640,0 1280,100 L1280,0 L0,0 Z"
    : "M0,100 C320,0 640,100 1280,0 L1280,100 L0,100 Z";

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1280 100"
        preserveAspectRatio="none"
        className="w-full h-24"
        style={{ fill: color }}
      >
        <motion.path
          d={path}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

interface WaveDividerProps {
  className?: string;
  color?: string;
}

export function WaveDivider({ className = "", color = "#DDE5DD" }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1280 80"
        preserveAspectRatio="none"
        className="w-full h-20"
        style={{ fill: color }}
      >
        <motion.path
          d="M0,40 C160,20 320,60 480,40 C640,20 800,60 960,40 C1120,20 1280,60 1280,40 L1280,80 L0,80 Z"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

interface GlowingDividerProps {
  className?: string;
}

export function GlowingDivider({ className = "" }: GlowingDividerProps) {
  return (
    <div className={`relative w-full h-px ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10B981] to-transparent"
      />
      <motion.div
        animate={{
          x: ["-100%", "100%", "-100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
    </div>
  );
}

interface DiagonalDividerProps {
  className?: string;
  direction?: "left" | "right";
  color?: string;
}

export function DiagonalDivider({ className = "", direction = "left", color = "#DDE5DD" }: DiagonalDividerProps) {
  const path = direction === "left"
    ? "M0,0 L1280,0 L1280,40 L0,80 Z"
    : "M0,80 L1280,40 L1280,80 L0,80 Z";

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1280 80"
        preserveAspectRatio="none"
        className="w-full h-20"
        style={{ fill: color }}
      >
        <motion.path
          d={path}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

interface AnimatedMeshDividerProps {
  className?: string;
}

export function AnimatedMeshDivider({ className = "" }: AnimatedMeshDividerProps) {
  return (
    <div className={`relative w-full h-32 overflow-hidden ${className}`}>
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="meshPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#10B981" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#meshPattern)" />
      </svg>
    </div>
  );
}

interface FloatingTransitionProps {
  className?: string;
}

export function FloatingTransition({ className = "" }: FloatingTransitionProps) {
  return (
    <div className={`relative w-full h-24 overflow-hidden ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#10B981]/40 to-transparent"
          style={{ top: `${20 + i * 30}%` }}
        />
      ))}
    </div>
  );
}
