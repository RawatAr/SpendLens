"use client";

import { motion } from "framer-motion";
import { Search, Zap, TrendingDown, Activity, Cpu, Database, Globe } from "lucide-react";
import { FloatingDoodle, InfrastructureSketch, GlowingNode } from "@/components/ui/advanced-doodles";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Enter Your Tools",
    desc: "Add every AI tool your team pays for — tool, plan, monthly spend, and seats.",
    gradient: "from-blue-500/10 to-emerald-500/10"
  },
  {
    icon: Zap,
    step: "02",
    title: "Get Instant Audit",
    desc: "Our rule-based engine evaluates plan fit, use-case alignment, and cheaper alternatives.",
    gradient: "from-amber-500/10 to-emerald-500/10"
  },
  {
    icon: TrendingDown,
    step: "03",
    title: "Reduce Spend",
    desc: "See exactly where to downgrade, switch, or optimize — with dollar amounts and reasoning.",
    gradient: "from-emerald-500/10 to-teal-500/10"
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-[#F2F4F2] relative overflow-hidden"
    >
      {/* Heavy Visual Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <InfrastructureSketch complexity="medium" className="scale-150 rotate-12" />
        <GlowingNode position={{ top: "10%", left: "5%" }} delay={0} size={100} className="opacity-20 blur-3xl" />
        <GlowingNode position={{ bottom: "10%", right: "5%" }} delay={2} size={120} className="opacity-20 blur-3xl" />
        
        <div className="absolute top-[20%] right-[10%] opacity-20">
          <Activity size={120} className="text-emerald-500" />
        </div>
        <div className="absolute bottom-[20%] left-[10%] opacity-20">
          <Database size={100} className="text-emerald-500" />
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16 text-center mx-auto"
        >
          <div
            className="text-sm font-black tracking-[0.3em] uppercase mb-4 text-emerald-600 drop-shadow-sm"
          >
            THE METHODOLOGY
          </div>
          <h2
            className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-950 mb-6 drop-shadow-sm"
            style={{ lineHeight: 0.95 }}
          >
            Audit your AI stack in <span className="text-emerald-500 italic">3 tactical steps</span>
          </h2>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative p-10 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden group`}
              >
                {/* Internal Card Decor */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform"
                    >
                      <Icon size={28} />
                    </div>
                    <span
                      className="text-6xl font-black font-mono text-slate-100 group-hover:text-emerald-100 transition-colors"
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-black mb-4 text-slate-950 group-hover:text-emerald-700 transition-colors"
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-base text-slate-600 leading-relaxed font-medium"
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
