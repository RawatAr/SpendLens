"use client";

import { motion } from "framer-motion";
import { BarChart3, ArrowUpRight, ArrowDownRight, Zap, Target } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import type { ToolAuditResult } from "@/types/audit";
import { useCurrency } from "@/context/currency-context";

interface AnalyticalGraphsProps {
  tools: ToolAuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
}

export function AnalyticalGraphs({ tools, totalMonthlySavings, totalAnnualSavings }: AnalyticalGraphsProps) {
  const { formatValue } = useCurrency();
  const toolsWithSavings = tools.filter(t => t.monthlySavings > 0);
  
  if (toolsWithSavings.length === 0) {
    return null;
  }

  const totalCurrent = tools.reduce((sum, t) => sum + t.currentMonthlyCost, 0);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUpVariants}
      className="bg-white rounded-[2.5rem] p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.05)] border border-slate-200 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg">
            <BarChart3 size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-1">
              Efficiency_Matrix
            </h3>
            <p className="text-xl font-black text-slate-950 tracking-tighter">
              Statistical Variance Map
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "Current Burn", value: formatValue(totalCurrent), icon: ArrowUpRight, color: "text-slate-400" },
            { label: "Optimized Burn", value: formatValue(totalCurrent - totalMonthlySavings), icon: ArrowDownRight, color: "text-emerald-500" },
            { label: "Capital Recovery", value: formatValue(totalMonthlySavings), icon: Zap, color: "text-emerald-500", highlight: true },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className={`p-6 rounded-[2rem] border ${stat.highlight ? "bg-slate-950 border-slate-900 shadow-2xl" : "bg-slate-50 border-slate-100"}`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className={`text-[10px] font-black uppercase tracking-widest ${stat.highlight ? "text-emerald-400" : "text-slate-400"}`}>
                    {stat.label}
                  </div>
                  <div className={`text-3xl font-black font-mono tracking-tighter ${stat.highlight ? "text-white" : "text-slate-950"}`}>
                    {stat.value}<span className={`text-xs ml-1 opacity-40 ${stat.highlight ? "text-white" : "text-slate-400"}`}>/mo</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.highlight ? "bg-emerald-500" : "bg-white border border-slate-200 shadow-sm"}`}>
                  <stat.icon size={20} className={stat.highlight ? "text-white" : stat.color} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-8 bg-emerald-500 rounded-[2.5rem] text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
          <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70 mb-2">Projected Annual Recovery</div>
          <div className="text-5xl font-black font-mono tracking-tighter">{formatValue(totalAnnualSavings)}</div>
        </div>
      </div>
    </motion.div>
  );
}
