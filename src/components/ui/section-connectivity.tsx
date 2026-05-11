"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Activity, Zap, TrendingDown } from "lucide-react";

export function SectionConnectivity() {
  return (
    <div className="relative w-full h-32 pointer-events-none overflow-hidden">
      {/* Flowing data streams */}
      <svg className="absolute inset-0 w-full h-full" width="100%" height="100%">
        <defs>
          <linearGradient id="flowGradientConnectivity" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#0F766E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Animated connector paths */}
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M ${10 + i * 20}% 0 Q ${20 + i * 20}% 50% ${30 + i * 20}% 100%`}
            stroke="url(#flowGradientConnectivity)"
            strokeWidth="2"
            fill="none"
            animate={{
              strokeDashoffset: [0, -400],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1,
            }}
            style={{
              strokeDasharray: "400",
            }}
          />
        ))}
        
        {/* Flowing particles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`particle-${i}`}
            r="3"
            fill="#10B981"
            animate={{
              cy: [0, 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i * 1.5,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              cx: `${15 + i * 25}%`,
            }}
          />
        ))}
      </svg>

      {/* Floating intelligence indicators */}
      <div className="absolute inset-0">
        {[Activity, Zap, TrendingDown].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.15)",
              }}
            >
              <Icon size={12} className="text-[#10B981]" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Directional arrows */}
      <div className="absolute inset-0">
        {[ArrowDownRight, ArrowUpRight].map((Arrow, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${30 + i * 40}%`,
              right: `${15 + i * 10}%`,
            }}
            animate={{
              y: [0, 5, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
          >
            <Arrow size={16} className="text-[#10B981]/20" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
