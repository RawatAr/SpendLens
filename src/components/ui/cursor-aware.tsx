"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface CursorAwareProps {
  children: React.ReactNode;
  className?: string;
  glowIntensity?: number;
}

export function CursorAware({ children, className = "", glowIntensity = 0.15 }: CursorAwareProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        className="absolute pointer-events-none rounded-full"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
          opacity: isHovering ? glowIntensity : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

interface ReactiveLightProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function ReactiveLight({ children, className = "", color = "#10B981" }: ReactiveLightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute pointer-events-none rounded-full"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        style={{
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

interface SpotlightEffectProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
}

export function SpotlightEffect({ children, className = "", size = 200 }: SpotlightEffectProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [size]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        className="absolute pointer-events-none rounded-full"
        animate={{
          x: mousePosition.x - size / 2,
          y: mousePosition.y - size / 2,
          opacity: isHovering ? 0.6 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        style={{
          width: size,
          height: size,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {children}
    </div>
  );
}
