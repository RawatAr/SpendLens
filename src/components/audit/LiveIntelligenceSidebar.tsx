"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, Cpu, Database, TrendingDown, CheckCircle2, Sparkles, Network } from "lucide-react";

const INTELLIGENCE_EVENTS = [
  { id: 1, type: "analysis", icon: Cpu, message: "Analyzing tool configurations...", status: "processing" },
  { id: 2, type: "optimization", icon: TrendingDown, message: "Identifying optimization opportunities...", status: "complete" },
  { id: 3, type: "calculation", icon: Database, message: "Calculating potential savings...", status: "complete" },
  { id: 4, type: "validation", icon: CheckCircle2, message: "Validating plan recommendations...", status: "success" },
];

export function LiveIntelligenceSidebar() {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block w-full pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2.5rem] p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-200 relative overflow-hidden group"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
            <Activity size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-950 uppercase tracking-[0.3em] mb-1">
              Live Intelligence
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Real-time analysis
              </span>
            </div>
          </div>
        </div>

        {/* Intelligence Events */}
        <div className="space-y-3 relative z-10">
          {INTELLIGENCE_EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group/item"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:rotate-12 ${
                  event.status === "success" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                <event.icon size={18} />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest leading-tight">
                  {event.message}
                </p>
                <div className="mt-1 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: "0%" }}
                    animate={{ width: event.status === "processing" ? "60%" : "100%" }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Processing Indicator */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 relative z-10">
          <div className="flex items-center gap-3">
            <Network size={16} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              {isProcessing ? "PROCESSING_STREAM" : "READY_FOR_DATA"}
            </span>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={16} className="text-emerald-500" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
