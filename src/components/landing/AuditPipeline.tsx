"use client";

import { motion } from "framer-motion";
import { 
  Keyboard, 
  Cpu, 
  TrendingDown, 
  CheckCircle2,
  ArrowRight,
  Activity,
  Zap,
  Database,
  Globe,
  Code,
  Sparkles,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Shield,
  Network
} from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import { FloatingDoodle, OptimizationPath, InfrastructureSketch, GlowingNode, FloatingMetricPill } from "@/components/ui/advanced-doodles";

const PIPELINE_STEPS = [
  {
    icon: Keyboard,
    title: "Input",
    description: "Enter your AI tools, plans, and spend",
    color: "#10B981",
    badge: "Vector Intake",
  },
  {
    icon: Cpu,
    title: "Analysis",
    description: "Audit engine evaluates plan fit & alternatives",
    color: "#0F766E",
    badge: "Neural Process",
    live: true,
  },
  {
    icon: TrendingDown,
    title: "Optimization",
    description: "Identify overspend & calculate savings",
    color: "#34D399",
    badge: "Synthesis",
  },
];

export function AuditPipeline() {
  return (
    <section className="py-32 bg-[#F7F8F6] relative overflow-hidden">
      {/* Massive Graphics Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <InfrastructureSketch complexity="medium" className="opacity-10 scale-125" />
        <OptimizationPath direction="diagonal" className="opacity-15" />
        <OptimizationPath direction="horizontal" className="opacity-10 top-1/2" />
        
        <FloatingDoodle icon={Database} position={{ top: "15%", left: "10%" }} delay={0} size={60} opacity={0.1} />
        <FloatingDoodle icon={Shield} position={{ bottom: "20%", right: "8%" }} delay={2} size={80} opacity={0.1} />
        <FloatingDoodle icon={Network} position={{ top: "40%", right: "15%" }} delay={1} size={40} opacity={0.1} />
        
        <GlowingNode position={{ top: "30%", left: "20%" }} delay={0.5} size={10} />
        <GlowingNode position={{ bottom: "30%", right: "20%" }} delay={1.5} size={12} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-xl shadow-emerald-200">
            <Sparkles size={14} />
            PIPELINE_ARCHITECTURE
          </div>
          <h2 className="text-5xl sm:text-7xl font-black text-slate-950 tracking-tighter mb-6 drop-shadow-sm leading-none">
            How the <span className="text-emerald-500 italic">intelligence</span> flows
          </h2>
          <p className="text-xl text-slate-600 font-bold uppercase tracking-tight max-w-2xl mx-auto">
            Our neural audit pipeline analyzes your stack in seconds, surfacing
            optimization opportunities with defensible reasoning.
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <div className="relative">
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            {PIPELINE_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring" }}
                className="relative"
              >
                {/* Step Card */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-[2.5rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-slate-200 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-10">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12"
                        style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}
                      >
                        <step.icon size={32} />
                      </div>
                      <span className="text-[10px] font-black px-4 py-2 rounded-xl bg-slate-900 text-white tracking-widest uppercase shadow-lg">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-950 mb-4 group-hover:text-emerald-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-base text-slate-600 font-bold leading-tight uppercase tracking-tight">
                      {step.description}
                    </p>

                    {step.live && (
                      <div className="mt-8 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Processing_Live</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Animated Connector Arrow */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-100 text-emerald-500"
                    >
                      <ArrowRight size={24} strokeWidth={3} />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
