"use client";

import React from "react";
import { motion } from "framer-motion";

// ── Atmospheric Background ─────────────────────────────────────────────────────

interface AtmosphericBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function AtmosphericBackground({ children, className = "" }: AtmosphericBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Soft radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7F8F6] via-[#F2F3F1] to-[#E8EAE6] opacity-100" />
      
      {/* Subtle ambient glow */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#10B981]/5 to-transparent rounded-full blur-3xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#0F766E]/5 to-transparent rounded-full blur-3xl"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {children}
    </div>
  );
}

// ── Mesh Gradient Background ───────────────────────────────────────────────────

interface MeshGradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function MeshGradientBackground({ children, className = "" }: MeshGradientBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7F8F6] via-[#F2F3F1] to-[#E8EAE6]" />
      
      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-gradient-to-br from-[#10B981]/10 to-[#0F766E]/10 rounded-full blur-3xl" />
        <div className="absolute top-[60%] right-[20%] w-[350px] h-[350px] bg-gradient-to-bl from-[#34D399]/10 to-[#A7F3D0]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-[40%] w-[300px] h-[300px] bg-gradient-to-t from-[#0F766E]/10 to-[#10B981]/10 rounded-full blur-3xl" />
      </div>
      
      {children}
    </div>
  );
}

// ── Noise Texture Background ───────────────────────────────────────────────────

interface NoiseTextureBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function NoiseTextureBackground({ 
  children, 
  className = "",
  intensity = "low"
}: NoiseTextureBackgroundProps) {
  const opacityMap = {
    low: 0.03,
    medium: 0.05,
    high: 0.08,
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7F8F6] via-[#F2F3F1] to-[#E8EAE6]" />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: opacityMap[intensity],
        }}
      />
      
      {children}
    </div>
  );
}

// ── Grid Overlay Background ─────────────────────────────────────────────────────

interface GridOverlayBackgroundProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}

export function GridOverlayBackground({ 
  children, 
  className = "",
  size = "medium"
}: GridOverlayBackgroundProps) {
  const sizeMap = {
    small: "40px",
    medium: "60px",
    large: "80px",
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7F8F6] via-[#F2F3F1] to-[#E8EAE6]" />
      
      {/* Ultra-light grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: sizeMap[size],
        }}
      />
      
      {children}
    </div>
  );
}

// ── Floating Shapes Background ─────────────────────────────────────────────────

interface FloatingShapesBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingShapesBackground({ children, className = "" }: FloatingShapesBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7F8F6] via-[#F2F3F1] to-[#E8EAE6]" />
      
      {/* Floating blurred shapes */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-[200px] h-[200px] bg-gradient-to-br from-[#10B981]/8 to-[#0F766E]/8 rounded-full blur-2xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-[30%] right-[20%] w-[150px] h-[150px] bg-gradient-to-bl from-[#34D399]/8 to-[#A7F3D0]/8 rounded-full blur-2xl"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute bottom-[20%] left-[30%] w-[180px] h-[180px] bg-gradient-to-tr from-[#0F766E]/8 to-[#10B981]/8 rounded-full blur-2xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 25, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute bottom-[40%] right-[30%] w-[120px] h-[120px] bg-gradient-to-tl from-[#A7F3D0]/8 to-[#34D399]/8 rounded-full blur-2xl"
        animate={{
          y: [0, 35, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      {children}
    </div>
  );
}

// ── Premium Background (Combines all) ────────────────────────────────────────────

interface PremiumBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function PremiumBackground({ children, className = "" }: PremiumBackgroundProps) {
  return (
    <AtmosphericBackground className={className}>
      <GridOverlayBackground size="medium">
        <NoiseTextureBackground intensity="low">
          <FloatingShapesBackground>
            {children}
          </FloatingShapesBackground>
        </NoiseTextureBackground>
      </GridOverlayBackground>
    </AtmosphericBackground>
  );
}
