"use client";

import { motion } from "framer-motion";
import { TrendingDown, CheckCircle2 } from "lucide-react";
import { marqueeVariants } from "@/lib/motion";

const TICKER_ITEMS = [
  { type: "tool", text: "$9,200/year saved", icon: "💰" },
  { type: "saving", text: "Cursor downgraded", icon: "🔍" },
  { type: "tool", text: "3 unused seats detected", icon: "👥" },
  { type: "saving", text: "42% reduction", icon: "📉" },
  { type: "tool", text: "$4,800/month optimized", icon: "💎" },
  { type: "saving", text: "Copilot switched", icon: "👨‍💻" },
  { type: "tool", text: "5 tools audited", icon: "🤖" },
  { type: "saving", text: "Claude consolidated", icon: "🧠" },
];

export function SavingsTicker() {
  return (
    <div className="w-full relative py-8 overflow-hidden border-t border-[#E2E8F0] bg-[#F7F8F6]/50">
      {/* Gradient fades on edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F7F8F6]/50 to-transparent z-20" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F7F8F6]/50 to-transparent z-20" />
      
      <motion.div
        variants={marqueeVariants}
        animate="animate"
        className="flex gap-4 pr-4"
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full shrink-0 bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-lg">{item.icon}</span>
            {item.type === "tool" ? (
              <CheckCircle2 size={16} className="text-[#10B981]" />
            ) : (
              <TrendingDown size={16} className="text-[#0F766E]" />
            )}
            <span className="text-sm font-bold text-[#0F172A]">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
