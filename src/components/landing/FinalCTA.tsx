"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, TrendingDown, Sparkles, Activity, Bot } from "lucide-react";
import { AdvancedBackground, AmbientGlow, FloatingParticles } from "@/components/ui/advanced-backgrounds";
import { FloatingDoodle, OptimizationPath, GlowingNode } from "@/components/ui/advanced-doodles";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <AdvancedBackground variant="cta">
        {/* Massive Graphic Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AmbientGlow position="center" />
          <FloatingParticles count={30} />
          <OptimizationPath direction="diagonal" className="opacity-30 scale-150" />
          
          <FloatingDoodle icon={Zap} position={{ top: "10%", left: "10%" }} delay={0} size={80} opacity={0.1} />
          <FloatingDoodle icon={TrendingDown} position={{ bottom: "10%", right: "10%" }} delay={2} size={100} opacity={0.1} />
          <FloatingDoodle icon={Activity} position={{ top: "20%", right: "15%" }} delay={1} size={60} opacity={0.1} />
          
          <GlowingNode position={{ top: "50%", left: "5%" }} delay={0} size={300} className="bg-emerald-500 opacity-10 blur-[150px]" />
        </div>

        <div className="py-40 text-center relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-[0.5em] mb-12 shadow-2xl"
          >
            <Sparkles size={16} className="text-emerald-400" />
            FINAL CALL
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-12 text-slate-950 leading-[0.85] drop-shadow-2xl"
          >
            Your AI stack is <br />
            <span className="text-emerald-500 italic drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]">overpaying</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl mb-16 max-w-3xl mx-auto text-slate-700 font-black leading-tight uppercase tracking-tight"
          >
            Find out in 2 minutes what you&apos;re overpaying. No sign-up. No credit
            card. Just enter your tools and get a defensible audit with real
            numbers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
            className="mb-20"
          >
            <Link
              href="/audit"
              id="final-cta-button"
              className="group inline-flex items-center gap-6 px-16 py-8 rounded-[2.5rem] font-black text-3xl sm:text-4xl transition-all shadow-[0_30px_100px_-20px_rgba(16,185,129,0.5)] hover:shadow-[0_50px_120px_-20px_rgba(16,185,129,0.6)] hover:translate-y-[-10px] relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #0F766E 100%)",
                color: "#FFFFFF",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10 flex items-center gap-4">
                AUDIT FOR FREE
                <ArrowRight size={40} strokeWidth={3} className="group-hover:translate-x-4 transition-transform" />
              </span>
            </Link>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-10 text-sm font-black text-slate-400 uppercase tracking-[0.4em]">
            <motion.div whileHover={{ scale: 1.1, color: "#10B981" }} className="flex items-center gap-3 transition-colors">
              <Shield size={20} className="text-emerald-500" />
              <span>NO LOGIN</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, color: "#10B981" }} className="flex items-center gap-3 transition-colors">
              <Zap size={20} className="text-emerald-500" />
              <span>INSTANT AUDIT</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, color: "#10B981" }} className="flex items-center gap-3 transition-colors">
              <Bot size={20} className="text-emerald-500" />
              <span>AI POWERED</span>
            </motion.div>
          </div>
        </div>
      </AdvancedBackground>
    </section>
  );
}
