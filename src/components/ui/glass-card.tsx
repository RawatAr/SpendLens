"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", onClick }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.2)",
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function PremiumCard({ children, className = "", glowColor = "#10B981" }: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        y: -6,
      }}
      className={`relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden ${className}`}
    >
      {/* Animated glow */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}15 0%, transparent 70%)`,
        }}
      />
      
      {/* Layered depth effect */}
      <div className="relative z-10 p-6">{children}</div>
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: `inset 0 0 20px ${glowColor}10`,
        }}
      />
    </motion.div>
  );
}

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
}

export function InteractiveCard({ children, className = "" }: InteractiveCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        rotate: [0, 1, 0],
      }}
      transition={{
        duration: 0.3,
      }}
      className={`relative bg-gradient-to-br from-white to-[#F7F8F6] rounded-2xl shadow-lg border border-[#E2E8F0] ${className}`}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 118, 110, 0.05) 100%)",
        }}
      />
      
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
}

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingCard({ children, className = "", delay = 0 }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 ${className}`}
    >
      {/* Floating glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-[#10B981]/10 to-[#0F766E]/10 blur-xl"
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
