"use client";

import { motion } from "framer-motion";
import { TrendingDown, CheckCircle2, AlertTriangle, XCircle, BarChart3, PieChart, Activity, Zap } from "lucide-react";
import { FloatingDoodle, OptimizationPath, GlowingNode, FloatingMetricPill } from "@/components/ui/advanced-doodles";

const DEMO_TOOLS = [
  {
    name: "Cursor",
    plan: "Business",
    cost: "$800/mo",
    rec: "downgrade",
    action: "Downgrade to Pro",
    saving: "$400/mo",
    reason: "Business adds admin controls not needed at 20 seats for a coding team.",
  },
  {
    name: "GitHub Copilot",
    plan: "Enterprise",
    cost: "$780/mo",
    rec: "downgrade",
    action: "Downgrade to Business",
    saving: "$400/mo",
    reason: "Enterprise-tier model fine-tuning isn't needed for your team size.",
  },
  {
    name: "Claude",
    plan: "Pro",
    cost: "$100/mo",
    rec: "keep",
    action: "Keep as-is",
    saving: "$0",
    reason: "Plan is well-matched for your writing and research use case.",
  },
];

const REC_CONFIG = {
  downgrade: {
    icon: AlertTriangle,
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.2)",
    borderLeft: "5px solid #F59E0B",
    label: "Downgrade",
  },
  keep: {
    icon: CheckCircle2,
    color: "#22C55E",
    bg: "rgba(34, 197, 94, 0.08)",
    border: "rgba(34, 197, 94, 0.2)",
    borderLeft: "5px solid #22C55E",
    label: "Keep",
  },
  switch: {
    icon: XCircle,
    color: "#EF4444",
    bg: "rgba(239, 68, 68, 0.08)",
    border: "rgba(239, 68, 68, 0.2)",
    borderLeft: "5px solid #EF4444",
    label: "Switch",
  },
};

export default function DemoPreview() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Heavy Graphic Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <OptimizationPath direction="horizontal" className="opacity-10 top-1/4" />
        <OptimizationPath direction="vertical" className="opacity-10 left-1/4" />
        <GlowingNode position={{ top: "20%", left: "10%" }} delay={0} size={150} className="opacity-10 blur-[100px] bg-emerald-500" />
        <GlowingNode position={{ bottom: "20%", right: "10%" }} delay={2} size={200} className="opacity-10 blur-[120px] bg-teal-500" />
        
        <FloatingDoodle icon={BarChart3} position={{ top: "15%", right: "15%" }} delay={0.5} size={60} opacity={0.1} />
        <FloatingDoodle icon={PieChart} position={{ bottom: "15%", left: "12%" }} delay={1.5} size={50} opacity={0.1} />
        <FloatingDoodle icon={Zap} position={{ top: "40%", left: "5%" }} delay={2.2} size={40} opacity={0.1} />
        
        <FloatingMetricPill value="$8.4k" label="Potential" position={{ top: "25%", left: "15%" }} delay={1.1} />
        <FloatingMetricPill value="22%" label="Inefficient" position={{ bottom: "30%", right: "15%" }} delay={3.3} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="text-sm font-black tracking-[0.4em] uppercase mb-4 text-emerald-600 flex items-center gap-2"
            >
              <Activity size={16} />
              THE INTELLIGENCE
            </div>
            <h2
              className="text-5xl sm:text-7xl font-black tracking-tighter mb-8 text-slate-950 leading-none drop-shadow-sm"
            >
              Defensible numbers, <br />
              <span className="text-emerald-500">plain-English</span> reasoning
            </h2>
            <p
              className="text-lg sm:text-xl leading-relaxed mb-10 text-slate-700 font-medium max-w-lg"
            >
              Every recommendation explains exactly why — so you can agree or
              push back with confidence. No manufactured savings, no vague
              advice.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex flex-col p-8 rounded-3xl bg-emerald-600 text-white shadow-2xl shadow-emerald-200 cursor-pointer relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="text-5xl font-black font-mono mb-2">$800/mo</div>
              <div className="text-sm font-bold opacity-80 uppercase tracking-widest flex items-center gap-2">
                Potential savings identified <TrendingDown size={16} />
              </div>
            </motion.div>
          </motion.div>

          {/* Card side */}
          <div className="space-y-6 relative">
            {/* Visual connector */}
            <div className="absolute left-[-40px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden lg:block" />
            
            {DEMO_TOOLS.map((tool, i) => {
              const config = REC_CONFIG[tool.rec as keyof typeof REC_CONFIG];
              const Icon = config.icon;
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2, type: "spring" }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="p-6 rounded-[2rem] bg-white shadow-2xl border border-slate-100 relative overflow-hidden group"
                  style={{
                    borderLeft: config.borderLeft,
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xl font-black text-slate-950">
                          {tool.name}
                        </span>
                        <span
                          className="text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest"
                          style={{
                            background: config.bg,
                            color: config.color,
                            border: `1px solid ${config.border}`,
                          }}
                        >
                          {config.label}
                        </span>
                      </div>
                      <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                        {tool.plan} · {tool.cost}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div
                        className="text-2xl font-black font-mono"
                        style={{ color: config.color }}
                      >
                        {tool.saving}
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-4 rounded-2xl bg-slate-50 text-xs text-slate-700 font-bold leading-relaxed border border-slate-100 flex gap-3 items-start"
                  >
                    <Icon size={16} className="shrink-0 mt-0.5" style={{ color: config.color }} />
                    {tool.reason}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
