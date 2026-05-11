"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";

interface RadialAnalyticalProps {
  confidence: "high" | "medium" | "low";
  label?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function RadialAnalytical({ confidence, label, size = "md", showIcon = true }: RadialAnalyticalProps) {
  const sizeMap = {
    sm: { diameter: 52, strokeWidth: 5, fontSize: "text-base" },
    md: { diameter: 80, strokeWidth: 8, fontSize: "text-xl" },
    lg: { diameter: 120, strokeWidth: 10, fontSize: "text-3xl" },
  };

  const { diameter, strokeWidth, fontSize } = sizeMap[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const confidenceMap = {
    high: { value: 99, color: "#10B981", icon: ShieldCheck, text: "High" },
    medium: { value: 72, color: "#F59E0B", icon: ShieldAlert, text: "Med" },
    low: { value: 45, color: "#EF4444", icon: ShieldQuestion, text: "Low" },
  };

  const { value, color, icon: Icon } = confidenceMap[confidence];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: diameter, height: diameter }}>
        {/* Background circle */}
        <svg width={diameter} height={diameter} className="transform -rotate-90">
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />
          
          {/* Animated progress circle */}
          <motion.circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: value / 100 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>

        {/* Center content - Improved alignment */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center -translate-y-1"
          >
            <span className={`${fontSize} font-black text-slate-950 tracking-tighter leading-none`}>
              {value}<span className="text-[0.6em] opacity-40">%</span>
            </span>
          </motion.div>
        </div>

        {/* Outer Glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: `0 0 20px ${color}20`,
          }}
        />
      </div>

      {label && (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
          <Icon size={10} style={{ color }} />
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
