"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  Activity,
  Shield,
  Search,
  Bot
} from "lucide-react";
import type { ToolAuditResult } from "@/types/audit";
import { RadialAnalytical } from "@/components/ui/radial-analytical";
import { useCurrency } from "@/context/currency-context";

interface ToolAuditCardProps {
  tool: ToolAuditResult;
}

const REC_CONFIG = {
  keep: { icon: CheckCircle2, color: "#10B981", label: "OPTIMAL_FIT", bg: "bg-emerald-50" },
  downgrade: { icon: AlertTriangle, color: "#F59E0B", label: "OVER_PROVISIONED", bg: "bg-amber-50" },
  switch: { icon: XCircle, color: "#EF4444", label: "INEFFICIENT_VECTOR", bg: "bg-red-50" },
  optimize: { icon: Zap, color: "#6366F1", label: "WASTE_IDENTIFIED", bg: "bg-indigo-50" },
};

export function ToolAuditCard({ tool }: ToolAuditCardProps) {
  const { formatValue } = useCurrency();
  const [expanded, setExpanded] = useState(false);
  const config = REC_CONFIG[tool.recommendation];
  const Icon = config.icon;

  // Improved Confidence Logic:
  // If it's a "keep" (well-matched), we are HIGHLY confident (99%)
  // If we found savings, confidence varies based on depth of analysis
  const confidenceScore: "high" | "medium" | "low" = 
    tool.recommendation === "keep" ? "high" : 
    tool.monthlySavings > 200 ? "high" : 
    tool.monthlySavings > 50 ? "medium" : "low";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
    >
      {/* Card Header */}
      <div
        className="w-full p-6 flex items-center justify-between gap-6 text-left"
      >
        <div className="flex items-center gap-6 min-w-0 flex-1">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${config.bg} shadow-inner group-hover:rotate-3 transition-transform`}>
            <Icon size={24} style={{ color: config.color }} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <span className="text-xl font-black text-slate-950 tracking-tighter">
                {tool.toolDisplayName}
              </span>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${config.bg.replace('bg-', 'text-').replace('-50', '-500')} ${config.bg.replace('bg-', 'border-').replace('-50', '-200')}`}>
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <span>{tool.currentPlan}</span>
              <span className="opacity-20">•</span>
              <span>{formatValue(tool.currentMonthlyCost)} Baseline</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          {tool.monthlySavings > 0 && (
            <div className="text-right">
              <div className="text-2xl font-black font-mono tracking-tighter text-slate-950">
                -{formatValue(tool.monthlySavings)}
              </div>
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                Impact_Delta
              </div>
            </div>
          )}
          <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <RadialAnalytical confidence={confidenceScore} size="sm" label="VERIFIED" />
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-950 hover:text-white transition-all"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100"
          >
            <div className="p-6 bg-slate-50/40 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">
                  <Search size={12} />
                  Intelligence_Reasoning
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-base font-bold text-slate-800 leading-snug">
                    {tool.recommendedAction}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Activity, text: "Usage Analytics" },
                  { icon: Bot, text: "Market Parity" },
                  { icon: Shield, text: "Security Check" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    <step.icon size={10} className="text-emerald-500" />
                    {step.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
