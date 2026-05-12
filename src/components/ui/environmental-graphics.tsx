"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, TrendingDown, Globe, Code, Database, ArrowRight, ArrowDownRight, ArrowUpRight, Cpu, BarChart3, PieChart, LineChart } from "lucide-react";

interface FloatingIconProps {
  icon: React.ElementType;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  delay?: number;
  size?: number;
  color?: string;
}

export function FloatingIcon({ icon: Icon, position = {}, delay = 0, size = 20, color = "#10B981" }: FloatingIconProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ ...position }}
      animate={{
        y: [0, -15, 0],
        opacity: [0.1, 0.25, 0.1],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div
        className="rounded-lg flex items-center justify-center"
        style={{
          width: size + 8,
          height: size + 8,
          background: `${color}08`,
          border: `1px solid ${color}20`,
        }}
      >
        <Icon size={size} style={{ color }} />
      </div>
    </motion.div>
  );
}

interface AnimatedMeshGradientProps {
  variant?: "hero" | "section" | "cta";
  className?: string;
}

export function AnimatedMeshGradient({ variant = "section", className = "" }: AnimatedMeshGradientProps) {
  const colors = {
    hero: ["#10B981", "#0F766E", "#34D399", "#059669"],
    section: ["#10B981", "#14B8A6", "#0F766E", "#34D399"],
    cta: ["#10B981", "#0F766E", "#14B8A6", "#059669"],
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        animate={{
          x: [-200, 200, -200],
          y: [-100, 100, -100],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${colors[variant][0]}30 0%, transparent 70%)`,
          top: "-200px",
          left: "-200px",
        }}
      />
      <motion.div
        animate={{
          x: [200, -200, 200],
          y: [100, -100, 100],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, ${colors[variant][1]}25 0%, transparent 70%)`,
          bottom: "-150px",
          right: "-150px",
        }}
      />
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [200, -200, 200],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${colors[variant][2]}20 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

interface TopologyMapProps {
  className?: string;
}

export function TopologyMap({ className = "" }: TopologyMapProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" width="100%" height="100%">
        <defs>
          <linearGradient id="topologyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#0F766E" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Animated network lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M ${10 + i * 15}% 20 L ${20 + i * 15}% 50 L ${30 + i * 15}% 80`}
            stroke="url(#topologyGradient)"
            strokeWidth="1"
            fill="none"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              strokeDasharray: "1000",
            }}
          />
        ))}
        
        {/* Network nodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.circle
            key={`node-${i}`}
            r="3"
            fill="#10B981"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              cx: `${15 + i * 15}%`,
              cy: `${30 + i * 10}%`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

interface FloatingDataStreamsProps {
  className?: string;
}

export function FloatingDataStreams({ className = "" }: FloatingDataStreamsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" width="100%" height="100%">
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M ${5 + i * 10}% 0 Q ${15 + i * 10}% 50% ${25 + i * 10}% 100%`}
            stroke="#10B981"
            strokeWidth="2"
            fill="none"
            animate={{
              strokeDashoffset: [-400, 0, -400],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            style={{
              strokeDasharray: "400",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

interface AmbientParticleFieldProps {
  count?: number;
  className?: string;
}

export function AmbientParticleField({ count = 20, className = "" }: AmbientParticleFieldProps) {
  const particles = useMemo(() => {
    return [...Array(count)].map((_, i) => {
      // Deterministic values for React 19 purity
      const seed = (i + 1) * 123.456;
      const pseudoRandom = (s: number) => (Math.sin(s) + 1) / 2;
      
      return {
        width: pseudoRandom(seed) * 4 + 2,
        height: pseudoRandom(seed + 1) * 4 + 2,
        top: pseudoRandom(seed + 2) * 100,
        left: pseudoRandom(seed + 3) * 100,
        opacity: pseudoRandom(seed + 4) * 0.3 + 0.1,
        yRange: pseudoRandom(seed + 5) * 30 + 10,
        xRange: pseudoRandom(seed + 6) * 20 - 10,
        duration: pseudoRandom(seed + 7) * 5 + 5,
        delay: pseudoRandom(seed + 8) * 3,
      };
    });
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            background: `rgba(16, 185, 129, ${particle.opacity})`,
          }}
          animate={{
            y: [0, -particle.yRange, 0],
            x: [0, particle.xRange, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

interface InfrastructureSketchProps {
  className?: string;
}

export function InfrastructureSketch({ className = "" }: InfrastructureSketchProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" width="100%" height="100%">
        {/* Animated grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={i}
            x1="0"
            y1={`${20 + i * 20}%`}
            x2="100%"
            y2={`${20 + i * 20}%`}
            stroke="#10B981"
            strokeWidth="0.5"
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Animated vertical lines */}
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={`v-${i}`}
            x1={`${20 + i * 20}%`}
            y1="0"
            x2={`${20 + i * 20}%`}
            y2="100%"
            stroke="#10B981"
            strokeWidth="0.5"
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

interface LayeredGlassPanelsProps {
  className?: string;
}

export function LayeredGlassPanels({ className = "" }: LayeredGlassPanelsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl"
          style={{
            width: `${200 + i * 50}px`,
            height: `${150 + i * 30}px`,
            top: `${10 + i * 15}%`,
            right: `${5 + i * 10}%`,
            background: `rgba(16, 185, 129, ${0.03 + i * 0.01})`,
            border: `1px solid rgba(16, 185, 129, ${0.1 + i * 0.05})`,
            backdropFilter: "blur(4px)",
          }}
          animate={{
            y: [0, -10 + i * 5, 0],
            rotate: [0, 2 - i, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
