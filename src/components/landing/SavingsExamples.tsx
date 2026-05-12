"use client";

import { motion } from "framer-motion";
import { TrendingDown, Users, Sparkles, Activity, Shield, Bot } from "lucide-react";
import { FloatingDoodle, GlowingNode } from "@/components/ui/advanced-doodles";

const EXAMPLES = [
  {
    label: "Series A startup · 18 devs",
    savings: "$11,200",
    period: "/year",
    story: "Had 18 seats on Cursor Business + Copilot Enterprise. Moved to Cursor Pro + Copilot Business. Zero capability loss.",
    reduction: "41%",
    monthlySavings: 933,
    tools: ["Cursor", "Copilot"],
    color: "emerald",
  },
  {
    label: "Founding team · 6 people",
    savings: "$3,840",
    period: "/year",
    story: "Had Claude Team + ChatGPT Team for a 6-person writing team. Consolidated to Claude Pro per user.",
    reduction: "55%",
    monthlySavings: 320,
    tools: ["Claude", "ChatGPT"],
    color: "blue",
  },
  {
    label: "Solo dev + contractor",
    savings: "$960",
    period: "/year",
    story: "Had ChatGPT Team at 2 seats for research. Switched to 2× Plus. Same features, half the admin overhead.",
    reduction: "33%",
    monthlySavings: 80,
    tools: ["ChatGPT"],
    color: "teal",
  },
];

export default function SavingsExamples() {
  return (
    <section className="py-32 bg-[#F2F3F1] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <FloatingDoodle icon={Shield} position={{ top: "10%", left: "5%" }} delay={0} size={100} />
        <FloatingDoodle icon={Bot} position={{ bottom: "10%", right: "5%" }} delay={2} size={120} />
        <GlowingNode position={{ top: "40%", right: "10%" }} size={200} className="bg-emerald-500 blur-[120px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-8"
          >
            <Sparkles size={16} className="text-emerald-600" />
            <span className="text-xs font-black text-emerald-700 uppercase tracking-[0.2em]">
              PROVEN TRACK RECORD
            </span>
          </motion.div>
          <h2 className="text-5xl sm:text-7xl font-black text-slate-950 mb-6 tracking-tighter leading-none drop-shadow-sm">
            Teams That <span className="text-emerald-500 italic">Audited</span> Their Stack
          </h2>
          <p className="text-xl text-slate-600 font-bold max-w-xl uppercase tracking-tight">
            Real startups, real savings, zero capability loss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {EXAMPLES.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-200 p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity size={100} />
              </div>
              
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-slate-400" />
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    {ex.label}
                  </span>
                </div>
                <div className="text-xs font-black px-4 py-2 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-100">
                  -{ex.reduction}
                </div>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-6xl font-black text-emerald-600 font-mono tracking-tighter">
                  {ex.savings}
                </span>
                <span className="text-lg text-slate-400 font-black uppercase">
                  {ex.period}
                </span>
              </div>

              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between text-xs font-black mb-3 uppercase tracking-widest">
                  <span className="text-slate-500">Monthly Yield</span>
                  <span className="text-slate-950 font-mono">
                    ${ex.monthlySavings}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                  <span className="text-slate-500">Stack Vectors</span>
                  <span className="text-slate-950">
                    {ex.tools.join(" + ")}
                  </span>
                </div>
              </div>

              <p className="text-base leading-relaxed text-slate-700 mb-8 font-bold italic tracking-tight">
                &quot;{ex.story}&quot;
              </p>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-3 text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
                <TrendingDown size={18} className="text-emerald-500" />
                ZERO CAPABILITY LOSS
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
