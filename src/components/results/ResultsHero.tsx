"use client";

import { motion } from "framer-motion";
import { Activity, Zap, Target, ShieldCheck, CheckCircle2 } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import type { AggregateAuditResult } from "@/types/audit";
import { useCurrency } from "@/context/currency-context";

interface ResultsHeroProps {
  auditResult: AggregateAuditResult;
}

const TIER_CONFIG = {
  high: { label: "CRITICAL_SAVINGS", color: "#10B981", badge: "High Yield", theme: "emerald" },
  medium: { label: "OPTIMIZATION_PATH", color: "#F59E0B", badge: "Med Yield", theme: "amber" },
  low: { label: "MARGINAL_GAINS", color: "#64748B", badge: "Low Yield", theme: "slate" },
  optimal: { label: "SYSTEM_OPTIMAL", color: "#6366F1", badge: "Optimized", theme: "indigo" },
};

export function ResultsHero({ auditResult }: ResultsHeroProps) {
  const { formatValue } = useCurrency();
  const isOptimal = auditResult.totalMonthlySavings === 0;
  const tierConfig = TIER_CONFIG[auditResult.savingsTier];
  
  const savingsPercentage = auditResult.totalMonthlyCurrent > 0 
    ? Math.round((auditResult.totalMonthlySavings / auditResult.totalMonthlyCurrent) * 100)
    : 0;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={0}
      variants={fadeUpVariants}
      className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.05)] border border-slate-200 p-8 sm:p-10 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg">
            <Activity size={22} className={isOptimal ? "text-indigo-400" : "text-emerald-400"} />
          </div>
          <div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-0.5">
              Audit_Sequence
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isOptimal ? "bg-indigo-500" : "bg-emerald-500"} animate-pulse`} />
              <span className="text-[11px] font-black text-slate-950 uppercase tracking-widest leading-none">
                {isOptimal ? "System_Integrity_Verified" : "Intelligence_Synthesis_Complete"}
              </span>
            </div>
          </div>
        </div>

        <div className="px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase border"
          style={{ borderColor: `${tierConfig.color}40`, color: tierConfig.color, background: `${tierConfig.color}08` }}>
          {tierConfig.label}
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-center relative z-10 mb-8">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-7xl font-black text-slate-950 tracking-tighter leading-[0.9]">
            {isOptimal ? (
              <>Stack is <span className="text-indigo-500">Optimal</span></>
            ) : (
              <>{formatValue(auditResult.totalAnnualSavings)} <span className="text-slate-200 font-normal">Opportunity</span></>
            )}
          </h1>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              <span>Monthly Burn</span>
              <span>{formatValue(auditResult.totalMonthlyCurrent)}/mo</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isOptimal ? "100%" : `${(auditResult.totalMonthlyOptimized / auditResult.totalMonthlyCurrent) * 100}%` }}
                transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
                className={`h-full ${isOptimal ? "bg-indigo-600" : "bg-slate-950"} rounded-full relative`}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">
                {isOptimal ? "Operating Efficiency" : "Target Efficiency"}
              </span>
              <span className={`text-xs font-black uppercase tracking-widest ${isOptimal ? "text-indigo-500" : "text-emerald-500"}`}>
                {isOptimal ? "100% Correct" : `-${savingsPercentage}% Variance`}
              </span>
            </div>
          </div>
        </div>

        {/* Highlight Card */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className={`rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group cursor-pointer ${isOptimal ? "bg-indigo-600 shadow-indigo-500/20" : "bg-emerald-500 shadow-emerald-500/20"}`}
        >
          {isOptimal ? (
            <ShieldCheck size={28} className="mb-6 opacity-50" />
          ) : (
            <Zap size={28} className="mb-6 opacity-50" />
          )}
          <div className="text-[10px] font-black opacity-70 uppercase tracking-[0.2em] mb-1">
            {isOptimal ? "Monthly Integrity" : "Monthly Yield"}
          </div>
          <div className="text-5xl font-black tracking-tighter mb-6 font-mono leading-none">
            {isOptimal ? "1.0" : formatValue(auditResult.totalMonthlySavings)}
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] bg-white/20 w-fit px-5 py-2.5 rounded-2xl border border-white/10 backdrop-blur-sm">
            {isOptimal ? <CheckCircle2 size={12} /> : <Target size={12} />}
            {isOptimal ? "System_Verified" : "Capture_Sequence"}
          </div>
        </motion.div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-slate-100 relative z-10">
        {[
          { label: "Efficiency", value: isOptimal ? "100%" : `${100 - savingsPercentage}%`, icon: Target },
          { label: "Variance", value: isOptimal ? "0.0%" : "+12.4%", icon: Activity },
          { label: "Nodes", value: auditResult.tools.length, icon: ShieldCheck },
          { label: "Synthesis", value: "Verified", icon: Zap },
        ].map((stat, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
              <stat.icon size={10} className={isOptimal ? "text-indigo-500" : "text-emerald-500"} />
              {stat.label}
            </div>
            <div className="text-2xl font-black text-slate-950 tracking-tighter">{stat.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
