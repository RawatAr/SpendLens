"use client";

import { motion } from "framer-motion";

const BRANDS = [
  "ChatGPT", "Claude", "Cursor", "OpenAI", "Anthropic", "GitHub Copilot", "Gemini", "Perplexity", "v0", "Midjourney"
];

export function BrandMarquee() {
  return (
    <div className="w-full overflow-hidden bg-white/50 backdrop-blur-sm border-y border-slate-200 py-6 relative z-10">
      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 justify-center">
        Auditing AI spend across leading tools
      </div>
      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-12 items-center px-12"
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-default">
              <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
              <span className="text-2xl sm:text-3xl font-black text-slate-300 group-hover:text-emerald-500 transition-colors uppercase tracking-tight">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
