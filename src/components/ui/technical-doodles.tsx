"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight, ArrowUpRight, Zap, Minus } from "lucide-react";

interface DoodleProps {
  type: "arrow" | "circle" | "line" | "annotation";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function TechnicalDoodle({ type, position = "top-right", className = "" }: DoodleProps) {
  const positionStyles = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`absolute ${positionStyles[position]} ${className}`}
    >
      {type === "arrow" && (
        <motion.div
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowRight size={20} className="text-[#10B981]/30" />
        </motion.div>
      )}
      
      {type === "circle" && (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-8 h-8 rounded-full"
            style={{
              border: "2px solid rgba(16, 185, 129, 0.3)",
            }}
          />
        </motion.div>
      )}
      
      {type === "line" && (
        <motion.div
          animate={{
            width: [20, 30, 20],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="h-0.5"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent)",
            }}
          />
        </motion.div>
      )}
      
      {type === "annotation" && (
        <motion.div
          animate={{
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center gap-1">
            <Minus size={16} className="text-[#10B981]/30" />
            <div className="w-12 h-0.5 bg-[#10B981]/20" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface AnimatedDoodleProps {
  icon: React.ElementType;
  className?: string;
  delay?: number;
}

export function AnimatedDoodle({ icon: Icon, className = "", delay = 0 }: AnimatedDoodleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon size={20} className="text-[#10B981]/30" />
      </motion.div>
    </motion.div>
  );
}

interface FlowingArrowProps {
  direction?: "right" | "down-right" | "up-right";
  className?: string;
}

export function FlowingArrow({ direction = "right", className = "" }: FlowingArrowProps) {
  const icons = {
    right: ArrowRight,
    "down-right": ArrowDownRight,
    "up-right": ArrowUpRight,
  };

  const Icon = icons[direction];

  return (
    <motion.div
      animate={{
        x: [0, 10, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      <Icon size={16} className="text-[#10B981]" />
    </motion.div>
  );
}

interface HighlightDoodleProps {
  children: React.ReactNode;
  className?: string;
}

export function HighlightDoodle({ children, className = "" }: HighlightDoodleProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className="absolute inset-0 -z-10 rounded"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "rgba(16, 185, 129, 0.1)",
        }}
      />
      {children}
    </div>
  );
}

interface DoodleAnnotationProps {
  text: string;
  className?: string;
}

export function DoodleAnnotation({ text, className = "" }: DoodleAnnotationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Zap size={14} className="text-[#10B981]" />
      </motion.div>
      <span className="text-xs font-semibold text-[#0F172A]">{text}</span>
    </motion.div>
  );
}
