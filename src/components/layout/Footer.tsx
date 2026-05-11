"use client";

import Link from "next/link";
import { Activity, ArrowRight, ExternalLink, Zap, Shield, Bot, Sparkles, Network } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,#10B981,transparent_70%)]" />
        <div className="absolute top-[20%] right-[10%]"><Network size={200} /></div>
        <div className="absolute bottom-[10%] left-[5%]"><Activity size={150} /></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-5"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <Activity size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tighter">SpendLens</h3>
              <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.4em]">by Credex Intelligence</p>
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-10">
            {[
              { label: "Audit", href: "/audit", icon: Zap },
              { label: "Privacy", href: "/privacy", icon: Shield },
              { label: "Intelligence", href: "#", icon: Bot },
              { label: "Network", href: "#", icon: Network },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <link.icon size={18} className="group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
            © 2026 CREDEX INTELLIGENCE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              Observatory Online
            </motion.div>
            <div className="flex gap-4">
              <ExternalLink size={16} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
              <Sparkles size={16} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
