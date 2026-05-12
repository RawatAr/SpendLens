"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Copy, Bot, Send, Download, TrendingDown, Database, Terminal, Shield } from "lucide-react";
import { toast } from "sonner";
import { useAuditStore } from "@/store/audit-store";
import { saveAudit } from "@/actions/save-audit";
import { submitLead } from "@/actions/submit-lead";
import { ResultsHero } from "./ResultsHero";
import { ToolAuditCard } from "./ToolAuditCard";
import { AuditTimeline } from "./AuditTimeline";
import { AnalyticalGraphs } from "./AnalyticalGraphs";
import { ObservabilityHeatmap } from "./ObservabilityHeatmap";
import { IntelligenceLogs } from "./IntelligenceLogs";
import Footer from "@/components/layout/Footer";
import { AdvancedBackground, AmbientGlow } from "@/components/ui/advanced-backgrounds";
import { useCurrency } from "@/context/currency-context";
import { generateFallbackSummary } from "@/lib/fallback-summary";

export default function ResultsPage() {
  const router = useRouter();
  const { auditResult, auditId, setAuditId } = useAuditStore();
  const { formatValue } = useCurrency();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    if (!auditResult) { router.replace("/audit"); return; }

    saveAudit(auditResult).then(({ auditId: id }) => {
      setAuditId(id);
      setSavedId(id);
    });

    fetch("/api/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auditResult }),
    })
      .then((r) => r.json())
      .then(({ summary }) => { 
        if (summary && summary.length > 50) {
          setAiSummary(summary); 
        } else {
          setAiSummary(generateFallbackSummary(auditResult));
        }
        setSummaryLoading(false); 
      })
      .catch(() => { 
        setAiSummary(generateFallbackSummary(auditResult));
        setSummaryLoading(false); 
      });
  }, [auditResult]);

  if (!auditResult) return null;

  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${appUrl}/audit/${savedId ?? auditId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => toast.success("Link copied to clipboard!"));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLeadSubmitting(true);
    const result = await submitLead({
      email,
      companyName: company || undefined,
      role: role || undefined,
      honeypot: honeypotRef.current?.value ?? "",
      auditId: savedId ?? auditId ?? "unknown",
      monthlySavings: auditResult.totalMonthlySavings,
      annualSavings: auditResult.totalAnnualSavings,
      savingsTier: auditResult.savingsTier,
    });
    setLeadSubmitting(false);
    if (result.success) { setLeadDone(true); toast.success("✓ Check your inbox!"); }
    else toast.error(result.error ?? "Something went wrong");
  };

  return (
    <div className="min-h-screen relative bg-[#F7F8F6] selection:bg-emerald-500 selection:text-white print:bg-white">
      <AdvancedBackground variant="insights">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <AmbientGlow position="center" />
        </div>

        <div className="max-w-[1340px] mx-auto px-6 py-12 relative z-10">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
            {/* Primary Analysis - Main Column */}
            <div className="space-y-12">
              {/* 1. Results Summary */}
              <ResultsHero auditResult={auditResult} />

              {/* 2. Tool Breakdown */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                    <Database size={14} className="text-emerald-500" />
                    01 / Vector_Segmentation
                  </h2>
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{auditResult.tools.length} Optimized Nodes</div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {auditResult.tools.map((tool) => (
                    <ToolAuditCard key={tool.toolId} tool={tool} />
                  ))}
                </div>
              </div>

              {/* 3. AI Synthesis Report */}
              <div className="px-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-200 relative overflow-hidden"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center shadow-xl">
                      <Bot size={24} className="text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-0.5">Intelligence_Synthesis</h3>
                      <p className="text-xl font-black text-slate-950 tracking-tighter leading-none">Executive Summary</p>
                    </div>
                  </div>

                  <div className="relative z-10 min-h-[120px]">
                    {summaryLoading ? (
                      <div className="space-y-3">
                        <div className="h-4 rounded-lg bg-slate-100 animate-pulse w-full" />
                        <div className="h-4 rounded-lg bg-slate-100 animate-pulse w-[90%]" />
                        <div className="h-4 rounded-lg bg-slate-100 animate-pulse w-[85%]" />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <p className="text-lg font-bold leading-relaxed text-slate-700 tracking-tight">
                          {aiSummary}
                        </p>
                        <div className="flex items-center gap-2 text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 w-fit px-4 py-2 rounded-full border border-emerald-100">
                          <CheckCircle2 size={12} />
                          MARKET_DATA_VERIFIED
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* 4. Optimization Timeline */}
              <div className="space-y-6 px-2">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                  <TrendingDown size={14} className="text-emerald-500" />
                  02 / Optimization_Timeline
                </h2>
                <AuditTimeline tools={auditResult.tools} />
              </div>
            </div>

            {/* Sidebar - Secondary Column */}
            <div className="space-y-6 lg:sticky lg:top-6">
              {/* Mail Capture */}
              <AnimatePresence mode="wait">
                {!leadDone ? (
                  <motion.div
                    key="lead"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950 rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/5"
                  >
                    <h3 className="text-2xl font-black mb-1 tracking-tighter leading-none">
                      Dispatch <span className="text-emerald-400">Report</span>
                    </h3>
                    <p className="text-[9px] font-black mb-6 text-slate-500 uppercase tracking-widest">Secure Document Capture</p>
                    
                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <input ref={honeypotRef} name="website" type="text" tabIndex={-1} aria-hidden="true" className="hidden" />
                      <div className="space-y-2">
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@startup.com"
                          className="w-full px-5 py-3.5 text-sm font-bold rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 text-white" />
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                          placeholder="Company Name (Optional)"
                          className="w-full px-5 py-3.5 text-sm font-bold rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 text-white" />
                      </div>
                      <button type="submit" disabled={leadSubmitting}
                        className="w-full group relative flex items-center justify-center gap-2 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest bg-emerald-500 text-white overflow-hidden transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                        {leadSubmitting ? "DISPATCHING..." : "SEND_AUDIT_DOCUMENT"}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500 rounded-[2.5rem] p-10 text-white text-center shadow-xl"
                  >
                    <CheckCircle2 size={40} className="mx-auto mb-4" />
                    <p className="text-2xl font-black mb-1 uppercase tracking-tighter">Document Dispatched</p>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Check your secure inbox</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* High Savings Credex CTA */}
              {auditResult.totalMonthlySavings > 500 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-20"><Shield size={40} /></div>
                  <h4 className="text-xl font-black mb-2 tracking-tight">Capture High Yield</h4>
                  <p className="text-xs font-bold opacity-80 leading-relaxed mb-6">You are eligible for Credex Infrastructure Credits. Recover up to 40% of your AI spend immediately.</p>
                  <button className="w-full py-3 rounded-xl bg-white text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all">
                    Book Credex Consultation
                  </button>
                </motion.div>
              )}

              {/* Live Analytics */}
              <AnalyticalGraphs 
                tools={auditResult.tools}
                totalMonthlySavings={auditResult.totalMonthlySavings}
                totalAnnualSavings={auditResult.totalAnnualSavings}
              />

              {/* Heatmap Map */}
              <ObservabilityHeatmap tools={auditResult.tools} />

              {/* Action Layer */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-200 grid grid-cols-1 gap-2">
                <button onClick={handleCopyLink} className="flex items-center justify-between px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest hover:border-emerald-500 transition-all group">
                  Copy Shareable Link <Copy size={14} className="group-hover:text-emerald-500" />
                </button>
                <button onClick={() => window.print()} className="flex items-center justify-between px-6 py-4 rounded-xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                  Export PDF Report <Download size={14} />
                </button>
              </div>

              {/* Audit Logs */}
              <IntelligenceLogs key={JSON.stringify(auditResult.tools)} tools={auditResult.tools} />
            </div>
          </div>
        </div>
      </AdvancedBackground>
      <Footer />
    </div>
  );
}
