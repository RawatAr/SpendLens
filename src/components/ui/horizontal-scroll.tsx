"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function HorizontalScroll({ children, className = "", speed = 0.5 }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex gap-6">
        {children}
        {children}
      </motion.div>
    </div>
  );
}

interface HorizontalCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function HorizontalCard({ children, className = "", index = 0 }: HorizontalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex-shrink-0 w-[400px] ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface HorizontalSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function HorizontalSection({ title, subtitle, children, className = "" }: HorizontalSectionProps) {
  return (
    <section className={`py-24 relative overflow-hidden ${className}`}>
      <div className="max-w-[1280px] mx-auto px-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-4"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      <HorizontalScroll className="px-6">
        {children}
      </HorizontalScroll>
    </section>
  );
}
