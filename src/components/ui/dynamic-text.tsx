"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface RotatingTextProps {
  phrases: string[];
  className?: string;
  interval?: number;
}

export function RotatingText({ phrases, className = "", interval = 3000 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <span className={`inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#0F766E] to-[#34D399] bg-[length:200%_auto]"
        >
          {phrases[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypingText({ text, className = "", speed = 50, delay = 0 }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2 h-5 bg-[#10B981] ml-1"
        />
      )}
    </span>
  );
}

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradientText({ children, className = "" }: AnimatedGradientTextProps) {
  return (
    <motion.span
      animate={{
        backgroundPosition: ["0%", "100%", "0%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#0F766E] to-[#34D399] bg-[length:200%_auto] ${className}`}
    >
      {children}
    </motion.span>
  );
}

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function StaggeredText({ text, className = "", delay = 0 }: StaggeredTextProps) {
  const letters = text.split("");

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + index * 0.03 }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

interface MorphingHeadlineProps {
  phrases: string[];
  className?: string;
}

export function MorphingHeadline({ phrases, className = "" }: MorphingHeadlineProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentPhrase}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          {phrases[currentPhrase]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
