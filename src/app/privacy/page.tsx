import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft, Lock, Database, EyeOff, Globe } from "lucide-react";
import { AdvancedBackground, AmbientGlow } from "@/components/ui/advanced-backgrounds";

export const metadata: Metadata = {
  title: "Privacy Protocol | SpendLens",
  description: "SpendLens data sovereignty and privacy protocol — how we protect your stack intelligence.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative bg-[#F7F8F6] selection:bg-emerald-500 selection:text-white">
      <AdvancedBackground variant="insights">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <AmbientGlow position="center" />
        </div>

        {/* Content */}
        <div className="max-w-[1340px] mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-16">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 hover:text-emerald-500 transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                RETURN_TO_INTAKE
              </Link>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center shadow-2xl">
                  <Shield size={28} className="text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-5xl sm:text-7xl font-black text-slate-950 tracking-tighter leading-none mb-2">
                    Privacy <span className="text-emerald-500">Protocol</span>
                  </h1>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Data_Sovereignty_Layer_V1.2</p>
                </div>
              </div>
            </div>

            {/* Grid Sections */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8 text-emerald-600">
                  <Database size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-950 mb-4 tracking-tight">Intelligence Intake</h2>
                <p className="text-base font-bold text-slate-500 leading-relaxed tracking-tight">
                  Your audit inputs are processed in-memory. We only persist tool names and savings figures to generate shareable URLs. No passwords or API keys are ever requested.
                </p>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center mb-8 text-emerald-400">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-950 mb-4 tracking-tight">Identity Isolation</h2>
                <p className="text-base font-bold text-slate-500 leading-relaxed tracking-tight">
                  Email addresses are stored separately from audit vectors. We use hashed identifiers for product analytics, ensuring your specific stack cannot be linked back to you.
                </p>
              </div>
            </div>

            {/* Detailed sections */}
            <div className="space-y-12 bg-white rounded-[3.5rem] p-10 sm:p-16 border border-slate-200 shadow-2xl">
              <section>
                <div className="flex items-center gap-3 text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-6">
                  <EyeOff size={16} />
                  01 / Zero_Access_Policy
                </div>
                <p className="text-xl font-bold text-slate-800 leading-relaxed tracking-tight">
                  We do not sell, trade, or distribute your intelligence to third-party data brokers. Our revenue is derived from the Credex marketplace, not your data.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-6">
                  <Globe size={16} />
                  02 / Infrastructure_Sovereignty
                </div>
                <p className="text-xl font-bold text-slate-800 leading-relaxed tracking-tight">
                  SpendLens infrastructure is hosted in isolated cloud environments with encrypted-at-rest databases. All traffic is routed through encrypted SSL/TLS channels.
                </p>
              </section>

              <section className="pt-12 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Questions regarding our protocol? Contact <span className="text-slate-900 underline decoration-emerald-500 decoration-2">privacy@credex.io</span>
                </p>
              </section>
            </div>
          </div>
        </div>
      </AdvancedBackground>
    </div>
  );
}
