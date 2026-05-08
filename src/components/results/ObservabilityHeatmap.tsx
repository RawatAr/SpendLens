"use client";

import { motion } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle2, Search } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import type { ToolAuditResult } from "@/types/audit";
import { useCurrency } from "@/context/currency-context";

interface ObservabilityHeatmapProps {
  tools: ToolAuditResult[];
}

export function ObservabilityHeatmap({ tools }: ObservabilityHeatmapProps) {
  const { formatValue } = useCurrency();
  
  const heatmapNodes = tools.map((tool) => ({
    id: tool.toolId,
    tool: tool.toolDisplayName,
    intensity: tool.monthlySavings > 100 ? "high" : tool.monthlySavings > 0 ? "medium" : "low",
    savings: tool.monthlySavings,
    status: tool.recommendation === "keep" ? "optimized" : tool.recommendation === "downgrade" ? "needs-attention" : "critical",
  }));

  const intensityConfig = {
    low: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-400", label: "STABLE" },
    medium: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-500", label: "OPTIMIZE" },
    high: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-500", label: "CRITICAL" },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUpVariants}
      className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-200 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center">
            <Search size={22} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-1">
              Observability_Heatmap
            </h3>
            <p className="text-xl font-black text-slate-950 tracking-tighter">
              Node Variance Index
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {heatmapNodes.map((node, index) => {
          const config = intensityConfig[node.intensity as keyof typeof intensityConfig];
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-[2rem] p-6 border ${config.bg} ${config.border} transition-all cursor-pointer relative overflow-hidden group hover:shadow-md`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                    {node.status === "optimized" && <CheckCircle2 size={14} className="text-emerald-500" />}
                    {node.status === "needs-attention" && <AlertTriangle size={14} className="text-amber-500" />}
                    {node.status === "critical" && <Activity size={14} className="text-red-500" />}
                  </div>
                  <div className={`text-[8px] font-black uppercase tracking-widest ${config.text}`}>
                    {config.label}
                  </div>
                </div>

                <div className="text-base font-black text-slate-950 mb-0.5 leading-none tracking-tight">
                  {node.tool}
                </div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  Vector_Node_{index.toString().padStart(2, '0')}
                </div>

                <div className="text-xl font-black text-slate-950 font-mono tracking-tighter">
                  {formatValue(node.savings)}<span className="text-[10px] opacity-40 ml-1 font-sans">/mo yield</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-slate-100 relative z-10">
        {[
          { color: "bg-slate-200", label: "LOW_VEC" },
          { color: "bg-amber-200", label: "MED_VEC" },
          { color: "bg-emerald-400", label: "HIGH_VEC" },
        ].map((legend) => (
          <div key={legend.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${legend.color}`} />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
              {legend.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
