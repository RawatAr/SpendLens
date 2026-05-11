"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface PremiumButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return {
            background: "linear-gradient(135deg, #10B981 0%, #0F766E 100%)",
            color: "#FFFFFF",
            shadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
            hoverShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
          };
        case "secondary":
          return {
            background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
            color: "#FFFFFF",
            shadow: "0 4px 14px rgba(245, 158, 11, 0.3)",
            hoverShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
          };
        case "outline":
          return {
            background: "transparent",
            color: "#0F172A",
            border: "1px solid #E2E8F0",
            shadow: "none",
            hoverShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
          };
        default:
          return {
            background: "linear-gradient(135deg, #10B981 0%, #0F766E 100%)",
            color: "#FFFFFF",
            shadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
            hoverShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
          };
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return "px-4 py-2 text-sm";
        case "md":
          return "px-6 py-3 text-base";
        case "lg":
          return "px-8 py-4 text-lg";
        default:
          return "px-6 py-3 text-base";
      }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    return (
      <motion.button
        ref={ref}
        className={`${sizeStyles} rounded-[8px] font-semibold transition-all relative overflow-hidden ${className}`}
        style={{
          background: variantStyles.background,
          color: variantStyles.color,
          border: variant === "outline" ? variantStyles.border : "none",
          boxShadow: variantStyles.shadow,
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: variantStyles.hoverShadow,
        }}
        whileTap={{
          scale: 0.98,
        }}
        {...props}
      >
        {/* Magnetic hover glow effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: [-100, 100, -100],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";
