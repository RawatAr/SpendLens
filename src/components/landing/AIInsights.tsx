"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Bot, Activity, Quote, Sparkles, Brain, Cpu, Terminal, Shield, Zap } from "lucide-react";
import { FloatingDoodle, OptimizationPath, GlowingNode } from "@/components/ui/advanced-doodles";

const SAMPLE_SUMMARY = `Your team of 20 is spending $1,680/month on AI tools, but you're over-provisioned on two key products. The biggest opportunity is Cursor — upgrading to Business tier added admin controls your team doesn't use, while Pro delivers identical coding capability at half the price. Combined with a Copilot tier adjustment, you could redirect $9,600/year toward engineering capacity instead of vendor margins.`;

const INSIGHT_HIGHLIGHTS = [
  { text: "over-provisioned", type: "warning" },
  { text: "Cursor Business tier", type: "highlight" },
  { text: "$9,600/year savings", type: "success" },
];

export default function AIInsights() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < SAMPLE_SUMMARY.length) {
        setDisplayedText(SAMPLE_SUMMARY.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 15);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="py-32 bg-[#F2F4F2] relative overflow-hidden">
      {/* Massive Graphics Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <OptimizationPath direction="diagonal" className="opacity-15" />
        <GlowingNode position={{ top: "15%", left: "15%" }} delay={0} size={80} className="bg-emerald-500 opacity-20" />
        <GlowingNode position={{ bottom: "15%", right: "15%" }} delay={2} size={100} className="bg-teal-500 opacity-20" />
        
        <FloatingDoodle icon={Brain} position={{ top: "10%", right: "10%" }} delay={0.5} size={70} opacity={0.1} />
        <FloatingDoodle icon={Cpu} position={{ bottom: "10%", left: "10%" }} delay={1.5} size={60} opacity={0.1} />
        <FloatingDoodle icon={Terminal} position={{ top: "40%", left: "5%" }} delay={2.5} size={40} opacity={0.1} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500 text-white text-xs font-black uppercase tracking-[0.3em] mb-6 shadow-xl shadow-emerald-200"
          >
            <Sparkles size={14} />
            CLAUDE 3.5 SONNET SYNTHESIS
          </motion.div>
          <h2
            className="text-5xl sm:text-7xl font-black tracking-tighter text-slate-950 mb-8 drop-shadow-sm"
            style={{ lineHeight: 0.9 }}
          >
            Your audit, processed by <br />
            <span className="text-emerald-500 italic underline decoration-8 decoration-emerald-200 underline-offset-8">pure intelligence</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(16,185,129,0.15)] border border-slate-200 overflow-hidden relative group"
          >
            {/* Terminal Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Header */}
            <div className="bg-slate-950 px-10 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="h-4 w-px bg-slate-800 mx-2" />
                  <div className="flex items-center gap-3">
                    <Bot size={20} className="text-emerald-400" />
                    <div className="text-sm font-black text-white uppercase tracking-widest">spend_audit_summary.sh</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                    <motion.div
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Activity size={14} />
                    </motion.div>
                    {isTyping ? "PROCESSING_BYTES..." : "SYNTHESIS_COMPLETE"}
                  </div>
                  <Shield size={16} className="text-slate-700" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-12 sm:p-16 relative">
              <div className="relative">
                <Quote size={80} className="absolute -top-10 -left-10 text-slate-50" />
                <div className="pl-6">
                  <p className="text-2xl sm:text-3xl leading-tight text-slate-800 font-black italic tracking-tight">
                    "{displayedText}"
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-8 bg-emerald-500 ml-2 align-middle"
                      />
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-slate-100 flex flex-wrap gap-4">
                <div className="w-full text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">CRITICAL_VECTORS</div>
                {INSIGHT_HIGHLIGHTS.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg ${
                      highlight.type === "success"
                        ? "bg-emerald-500 text-white shadow-emerald-200"
                        : highlight.type === "warning"
                        ? "bg-amber-500 text-white shadow-amber-200"
                        : "bg-slate-900 text-white shadow-slate-200"
                    }`}
                  >
                    {highlight.type === "success" && <Zap size={14} />}
                    {highlight.text}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
