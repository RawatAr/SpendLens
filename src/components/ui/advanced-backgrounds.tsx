"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

interface AdvancedBackgroundProps {
  variant?: "hero" | "audit" | "insights" | "cta" | "default";
  children: React.ReactNode;
}

export function AdvancedBackground({ variant = "default", children }: AdvancedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Removed mouse move tracking for performance optimization
  const mousePosition = { x: 400, y: 400 };

  const getBackgroundConfig = () => {
    switch (variant) {
      case "hero":
        return {
          baseColor: "#F7F8F6",
          gradientColors: ["rgba(16, 185, 129, 0.08)", "rgba(15, 118, 110, 0.05)", "rgba(52, 211, 153, 0.03)"],
          glowColor: "rgba(16, 185, 129, 0.15)",
          meshColor: "rgba(16, 185, 129, 0.02)",
        };
      case "audit":
        return {
          baseColor: "#F7F8F6",
          gradientColors: ["rgba(16, 185, 129, 0.06)", "rgba(15, 118, 110, 0.04)", "rgba(52, 211, 153, 0.02)"],
          glowColor: "rgba(16, 185, 129, 0.1)",
          meshColor: "rgba(16, 185, 129, 0.015)",
        };
      case "insights":
        return {
          baseColor: "#F7F8F6",
          gradientColors: ["rgba(16, 185, 129, 0.05)", "rgba(15, 118, 110, 0.03)", "rgba(52, 211, 153, 0.02)"],
          glowColor: "rgba(16, 185, 129, 0.08)",
          meshColor: "rgba(16, 185, 129, 0.01)",
        };
      case "cta":
        return {
          baseColor: "#F7F8F6",
          gradientColors: ["rgba(16, 185, 129, 0.12)", "rgba(15, 118, 110, 0.08)", "rgba(52, 211, 153, 0.05)"],
          glowColor: "rgba(16, 185, 129, 0.2)",
          meshColor: "rgba(16, 185, 129, 0.03)",
        };
      default:
        return {
          baseColor: "#F7F8F6",
          gradientColors: ["rgba(16, 185, 129, 0.04)", "rgba(15, 118, 110, 0.03)", "rgba(52, 211, 153, 0.02)"],
          glowColor: "rgba(16, 185, 129, 0.06)",
          meshColor: "rgba(16, 185, 129, 0.01)",
        };
    }
  };

  const config = getBackgroundConfig();

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: config.baseColor }}
    >
      {/* Layer 1: Soft Radial Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${config.gradientColors[0]} 0%, ${config.gradientColors[1]} 40%, ${config.gradientColors[2]} 70%, transparent 100%)`,
          }}
        />
      </div>

      {/* Layer 2: Subtle Mesh Gradient (Reduced Animation) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, ${config.meshColor} 0%, transparent 50%),
              linear-gradient(225deg, ${config.meshColor} 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Layer 4: Static Subtle Grid Overlay (Removed Noise for Performance) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${config.glowColor} 1px, transparent 1px),
            linear-gradient(90deg, ${config.glowColor} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Layer 6: Static Ambient Glow (Removed Cursor Spotlight for Performance) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Layer 7: Flowing Connector Lines (Hero variant only) */}
      {variant === "hero" && (
        <svg className="absolute inset-0 pointer-events-none opacity-[0.05]" width="100%" height="100%">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#0F766E" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 50% Q 25% 40% 50% 50% T 100% 50%"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            animate={{
              strokeDashoffset: [0, -1000],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              strokeDasharray: "1000",
            }}
          />
          <motion.path
            d="M 0 60% Q 25% 70% 50% 60% T 100% 60%"
            stroke="url(#flowGradient)"
            strokeWidth="1.5"
            fill="none"
            animate={{
              strokeDashoffset: [0, -1000],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              strokeDasharray: "1000",
            }}
          />
        </svg>
      )}

      {/* Layer 8: Ambient Glow Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, ${config.glowColor} 0%, transparent 40%),
              radial-gradient(circle at 70% 80%, ${config.glowColor} 0%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Deterministic values for React 19 purity
      const seed = (i + 1) * 789.012;
      const pseudoRandom = (s: number) => (Math.sin(s) + 1) / 2;
      
      return {
        id: i,
        x: pseudoRandom(seed) * 100,
        y: pseudoRandom(seed + 1) * 100,
        size: pseudoRandom(seed + 2) * 4 + 2,
        duration: pseudoRandom(seed + 3) * 10 + 10,
        delay: pseudoRandom(seed + 4) * 5,
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: "rgba(16, 185, 129, 0.2)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedGridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10B981" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>
    </div>
  );
}

export function AmbientGlow({ position = "center" }: { position?: "top" | "center" | "bottom" }) {
  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return "top-0 left-1/2 -translate-x-1/2";
      case "bottom":
        return "bottom-0 left-1/2 -translate-x-1/2";
      default:
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
    }
  };

  return (
    <motion.div
      className={`absolute ${getPositionStyles()} w-[1000px] h-[1000px] rounded-full blur-3xl pointer-events-none`}
      animate={{
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(15, 118, 110, 0.1) 40%, transparent 70%)",
      }}
    />
  );
}
