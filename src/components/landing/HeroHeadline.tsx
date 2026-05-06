"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, CheckCircle2, Shield, Clock, BarChart3 } from "lucide-react";
import { heroTextRevealVariants, buttonHoverVariants } from "@/lib/motion";
import { RotatingText, AnimatedGradientText } from "@/components/ui/dynamic-text";

export function HeroHeadline() {
  const rotatingPhrases = [
    "leaking money",
    "overpaying silently",
    "wasting budget",
    "bloated with waste",
    "inefficient",
  ];

  return (
    <div className="max-w-3xl">
      {/* Eyebrow */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={heroTextRevealVariants}
        className="flex items-center gap-2 mb-8"
      >
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            color: "#10B981",
          }}
        >
          <Zap size={10} fill="currentColor" />
          Free · No Login · Instant Results
        </span>
      </motion.div>

      {/* Cinematic Editorial Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-[#0F172A] drop-shadow-sm"
        style={{ lineHeight: 0.9 }}
      >
        Your AI stack is{" "}
        <div className="mt-2 block">
          <RotatingText phrases={rotatingPhrases} interval={3000} className="text-emerald-600 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]" />
        </div>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg sm:text-xl mb-10 max-w-2xl text-[#475569] font-medium leading-relaxed"
      >
        See where your AI budget disappears. SpendLens audits your AI tool spend
        in under 2 minutes — surfacing overspend, recommending cheaper
        alternatives, and calculating your exact monthly savings.
      </motion.p>

      {/* Premium CTA */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={3}
        variants={heroTextRevealVariants}
        className="flex flex-col sm:flex-row gap-4 mb-10 relative items-center"
      >
        <motion.div variants={buttonHoverVariants} initial="initial" whileHover="hover">
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[8px] font-semibold text-base transition-all shadow-lg hover:shadow-xl relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #0F766E 100%)",
              color: "#FFFFFF",
            }}
          >
            <span className="relative z-10">Audit My AI Spend</span>
            <ArrowRight size={18} className="relative z-10" />
          </Link>
        </motion.div>
        <span className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-[#475569]">
          No credit card · Results in &lt;2 minutes
        </span>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={4}
        variants={heroTextRevealVariants}
        className="flex flex-wrap gap-6"
      >
        {[
          { icon: CheckCircle2, text: "Real pricing data" },
          { icon: Shield, text: "Trusted by founders" },
          { icon: Clock, text: "Instant audit" },
          { icon: BarChart3, text: "Defensible reasoning" },
        ].map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="flex items-center gap-2 text-sm text-[#475569]"
          >
            <item.icon size={16} className="text-[#10B981]" />
            <span className="font-medium">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
