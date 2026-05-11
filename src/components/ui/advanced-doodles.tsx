"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingDoodleProps {
  icon: LucideIcon;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  delay?: number;
  size?: number;
  rotation?: number;
  opacity?: number;
  className?: string;
}

export function FloatingDoodle({ 
  icon: Icon, 
  position, 
  delay = 0, 
  size = 24, 
  rotation = 0,
  opacity = 0.15,
  className = ""
}: FloatingDoodleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity, 
        scale: 1,
        rotate: [rotation, rotation + 5, rotation],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute pointer-events-none ${className}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
    >
      <Icon size={size} strokeWidth={1.5} className="text-[#10B981]" />
    </motion.div>
  );
}

interface OptimizationPathProps {
  className?: string;
  direction?: "horizontal" | "vertical" | "diagonal";
}

export function OptimizationPath({ className = "", direction = "horizontal" }: OptimizationPathProps) {
  const path = direction === "horizontal"
    ? "M0,50 C100,30 200,70 300,50 C400,30 500,70 600,50"
    : direction === "vertical"
    ? "M50,0 C30,100 70,200 50,300 C30,400 70,500 50,600"
    : "M0,0 C100,50 200,150 300,200 C400,250 500,350 600,400";

  return (
    <motion.svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 600 400"
      preserveAspectRatio="none"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#0F766E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        stroke="url(#pathGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <motion.circle
        cx="0"
        cy="50"
        r="4"
        fill="#10B981"
        animate={{
          cx: [0, 100, 200, 300, 400, 500, 600],
          cy: [50, 30, 70, 50, 30, 70, 50],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}

interface InfrastructureSketchProps {
  className?: string;
  complexity?: "simple" | "medium" | "complex";
}

export function InfrastructureSketch({ className = "", complexity = "medium" }: InfrastructureSketchProps) {
  const nodes = complexity === "simple" ? 5 : complexity === "medium" ? 8 : 12;

  return (
    <motion.svg
      className={`absolute inset-0 w-full h-full opacity-20 ${className}`}
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.2 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {Array.from({ length: nodes }).map((_, i) => {
        const x = 50 + (i * 300) / (nodes - 1);
        const y = 50 + Math.sin(i * 0.8) * 100 + 100;
        
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#10B981" />
            {i < nodes - 1 && (
              <motion.line
                x1={x}
                y1={y}
                x2={50 + ((i + 1) * 300) / (nodes - 1)}
                y2={50 + Math.sin((i + 1) * 0.8) * 100 + 100}
                stroke="#10B981"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            )}
          </g>
        );
      })}
    </motion.svg>
  );
}

interface AnalyticalArrowProps {
  className?: string;
  direction?: "up" | "down" | "right" | "left";
  animated?: boolean;
}

export function AnalyticalArrow({ className = "", direction = "right", animated = true }: AnalyticalArrowProps) {
  const rotation = {
    up: -90,
    down: 90,
    right: 0,
    left: 180,
  }[direction];

  return (
    <motion.svg
      className={`w-16 h-16 ${className}`}
      viewBox="0 0 64 64"
      initial={{ rotate: rotation }}
      animate={animated ? {
        x: [0, 10, 0],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
      </defs>
      <path
        d="M8,32 L48,32 M40,24 L48,32 L40,40"
        stroke="url(#arrowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </motion.svg>
  );
}

interface FloatingMetricPillProps {
  value: string;
  label: string;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  delay?: number;
  className?: string;
}

export function FloatingMetricPill({ 
  value, 
  label, 
  position, 
  delay = 0,
  className = ""
}: FloatingMetricPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute pointer-events-none bg-white/80 backdrop-blur-sm border border-[#10B981]/20 rounded-full px-4 py-2 shadow-lg ${className}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-[#10B981]">{value}</span>
        <span className="text-xs text-slate-600">{label}</span>
      </div>
    </motion.div>
  );
}

interface GlowingNodeProps {
  position: { top?: string; left?: string; right?: string; bottom?: string };
  delay?: number;
  size?: number;
  className?: string;
}

export function GlowingNode({ 
  position, 
  delay = 0, 
  size = 16,
  className = ""
}: GlowingNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute pointer-events-none ${className}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
    >
      <div 
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
