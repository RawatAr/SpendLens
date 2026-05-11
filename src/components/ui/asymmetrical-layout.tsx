"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AsymmetricalSectionProps {
  children: ReactNode;
  className?: string;
}

export function AsymmetricalSection({ children, className = "" }: AsymmetricalSectionProps) {
  return (
    <section className={`relative ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          {/* Left offset content */}
          <div className="lg:w-[60%] lg:pr-16">
            {children}
          </div>
          
          {/* Right floating elements */}
          <div className="hidden lg:block absolute top-0 right-0 w-[35%]">
            {/* Floating decorative elements */}
            <div className="relative h-full">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#10B981]/10 to-[#0F766E]/5 rounded-2xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#34D399]/10 to-[#10B981]/5 rounded-2xl"
              />
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-20 right-5 w-28 h-28 bg-gradient-to-br from-[#0F766E]/10 to-[#14B8A6]/5 rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface OverlappingCardsProps {
  children: ReactNode[];
  className?: string;
}

export function OverlappingCards({ children, className = "" }: OverlappingCardsProps) {
  return (
    <div className={`relative ${className}`}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.6 }}
          className="relative"
          style={{
            marginTop: index > 0 ? "-2rem" : 0,
            marginLeft: index > 0 ? `${index * 2}rem` : 0,
            zIndex: 10 - index,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface EditorialLayoutProps {
  children: ReactNode[];
  className?: string;
}

export function EditorialLayout({ children, className = "" }: EditorialLayoutProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${className}`}>
      {children.map((child, index) => {
        const spanClasses = [
          "lg:col-span-7",
          "lg:col-span-4 lg:col-start-9",
          "lg:col-span-12",
        ];
        return (
          <div key={index} className={spanClasses[index % spanClasses.length]}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

interface SplitScreenProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  reverse?: boolean;
}

export function SplitScreen({ left, right, className = "", reverse = false }: SplitScreenProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${className}`}>
      <div className={reverse ? "lg:order-2" : "lg:order-1"}>
        {left}
      </div>
      <div className={reverse ? "lg:order-1" : "lg:order-2"}>
        {right}
      </div>
    </div>
  );
}

interface OffsetGridProps {
  children: ReactNode[];
  className?: string;
}

export function OffsetGrid({ children, className = "" }: OffsetGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={index % 3 === 0 ? "md:col-span-2" : ""}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface DiagonalFlowProps {
  children: ReactNode[];
  className?: string;
}

export function DiagonalFlow({ children, className = "" }: DiagonalFlowProps) {
  return (
    <div className={`relative ${className}`}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15, duration: 0.6 }}
          className="relative"
          style={{
            marginBottom: index > 0 ? "-4rem" : 0,
            marginLeft: index % 2 === 0 ? 0 : "4rem",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface DepthStackProps {
  children: ReactNode[];
  className?: string;
}

export function DepthStack({ children, className = "" }: DepthStackProps) {
  return (
    <div className={`relative ${className}`}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? -5 : 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="absolute"
          style={{
            top: `${index * 2}rem`,
            left: `${index * 1.5}rem`,
            zIndex: 10 - index,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface CinematicFrameProps {
  children: ReactNode;
  className?: string;
}

export function CinematicFrame({ children, className = "" }: CinematicFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Cinematic frame border */}
      <div className="absolute inset-0 border-2 border-[#10B981]/20 rounded-2xl pointer-events-none" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#10B981]/40 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#10B981]/40 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#10B981]/40 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#10B981]/40 rounded-br-xl" />
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
