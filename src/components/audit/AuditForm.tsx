"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { X, Plus, ArrowRight, CheckCircle2, AlertCircle, Activity, Zap, Globe, Cpu, Database, Trash2, Sparkles, Bot, Shield, TrendingDown, Users } from "lucide-react";
import { toast } from "sonner";
import { useAuditStore } from "@/store/audit-store";
import type { ToolInput } from "@/types/audit";
import { LiveIntelligenceSidebar } from "@/components/audit/LiveIntelligenceSidebar";
import { AdvancedBackground, AmbientGlow, FloatingParticles } from "@/components/ui/advanced-backgrounds";
import { FloatingDoodle, OptimizationPath, InfrastructureSketch, GlowingNode, FloatingMetricPill } from "@/components/ui/advanced-doodles";
import { TOOLS } from "@/data/tools";
import { AuditInputSchema, type AuditInputFormValues, USE_CASES } from "@/lib/schemas/audit-input";
import { runAudit } from "@/lib/audit-engine";

const USE_CASE_LABELS: Record<string, string> = {
  coding: "Coding",
  writing: "Writing",
  data: "Data / Analytics",
  research: "Research",
  mixed: "Mixed",
};

export default function AuditForm() {
  const router = useRouter();
  const { formState, setFormState, setAuditResult, setAuditId, resetForm } = useAuditStore();

  const { control, handleSubmit, watch, setValue, register, formState: { errors, isSubmitting } } = useForm<AuditInputFormValues>({
    resolver: zodResolver(AuditInputSchema),
    defaultValues: {
      teamSize: formState.teamSize || 1,
      useCase: formState.useCase || "mixed",
      tools: formState.tools.length > 0 ? formState.tools : [{ id: nanoid(), tool: "cursor", plan: "pro", monthlySpend: 0, seats: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });

  // Sync form → Zustand on every change
  const watchedValues = watch();
  useEffect(() => {
    setFormState(watchedValues);
  }, [JSON.stringify(watchedValues)]);

  const onSubmit = async (data: AuditInputFormValues) => {
    try {
      const result = runAudit(data);
      setAuditResult(result);
      setAuditId(nanoid(10));
      router.push("/results");
    } catch (err) {
      toast.error("Something went wrong running the audit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      <AdvancedBackground variant="audit">
        {/* Massive Graphics Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <InfrastructureSketch complexity="complex" className="opacity-10" />
          <OptimizationPath direction="diagonal" className="opacity-20" />
          <AmbientGlow position="center" />
          <FloatingParticles count={20} />
          
          <FloatingDoodle icon={Zap} position={{ top: "15%", left: "5%" }} delay={0} size={80} opacity={0.1} />
          <FloatingDoodle icon={Bot} position={{ bottom: "15%", right: "5%" }} delay={2} size={100} opacity={0.1} />
          <FloatingDoodle icon={Database} position={{ top: "40%", right: "8%" }} delay={1} size={60} opacity={0.1} />
          
          <FloatingMetricPill value="LIVE" label="Audit" position={{ top: "25%", left: "10%" }} delay={1.5} />
          <GlowingNode position={{ top: "10%", right: "20%" }} delay={0.5} size={150} className="bg-emerald-500 blur-[100px]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 pt-32 pb-24 relative z-10">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Main Form Area */}
            <div className="space-y-8">
              {/* Page title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 shadow-xl shadow-emerald-200">
                  <Sparkles size={14} />
                  Intelligence Intake
                </div>
                <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-4 text-slate-950 leading-none drop-shadow-sm">
                  Audit your <span className="text-emerald-600">AI stack</span>
                </h1>
                <p className="text-lg text-slate-600 font-bold uppercase tracking-tight">
                  Add the AI tools your team pays for. Results are instant.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                {/* Global inputs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-200 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <h2 className="text-xs font-black mb-8 text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
                      <Users size={16} className="text-emerald-500" />
                      01 / Team Context
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Team size */}
                      <div>
                        <label htmlFor="teamSize" className="block text-xs font-black mb-3 text-slate-500 uppercase tracking-widest">
                          Headcount
                        </label>
                        <input
                          id="teamSize"
                          type="number"
                          min={1}
                          placeholder="e.g. 12"
                          className="w-full px-6 py-4 text-lg font-bold rounded-2xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                          {...register("teamSize", { valueAsNumber: true })}
                        />
                        {errors.teamSize && (
                          <p className="text-xs mt-2 font-bold text-red-500 uppercase tracking-widest">{errors.teamSize.message}</p>
                        )}
                      </div>

                      {/* Use case */}
                      <div>
                        <label htmlFor="useCase" className="block text-xs font-black mb-3 text-slate-500 uppercase tracking-widest">
                          Primary Use Case
                        </label>
                        <Controller
                          control={control}
                          name="useCase"
                          render={({ field }) => (
                            <select
                              id="useCase"
                              className="w-full px-6 py-4 text-lg font-bold rounded-2xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none bg-white"
                              {...field}
                            >
                              {USE_CASES.map((uc) => (
                                <option key={uc} value={uc}>{USE_CASE_LABELS[uc]}</option>
                              ))}
                            </select>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Tool cards */}
                <div className="space-y-4">
                  <h2 className="text-xs font-black mb-6 text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
                    <Database size={16} className="text-emerald-500" />
                    02 / Tool Vector Scan ({fields.length})
                  </h2>

                  <AnimatePresence mode="popLayout">
                    {fields.map((field, index) => {
                      const selectedTool = watch(`tools.${index}.tool`);
                      const toolDef = TOOLS.find((t) => t.id === selectedTool);

                      return (
                        <motion.div
                          key={field.id}
                          layout
                          initial={{ opacity: 0, x: -50, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 50, scale: 0.9 }}
                          className="bg-white rounded-[2.5rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-slate-200 relative group"
                        >
                          <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">
                              Vector_{index + 1}
                            </span>
                            {fields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                              >
                                <Trash2 size={20} />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Tool selector */}
                            <div>
                              <label className="block text-[10px] font-black mb-2 text-slate-400 uppercase tracking-widest">
                                Tool
                              </label>
                              <Controller
                                control={control}
                                name={`tools.${index}.tool`}
                                render={({ field: f }) => (
                                  <select
                                    className="w-full px-4 py-3 text-sm font-bold rounded-xl border-2 border-slate-50 focus:border-emerald-500 outline-none transition-all bg-slate-50"
                                    {...f}
                                    onChange={(e) => {
                                      f.onChange(e);
                                      const newTool = TOOLS.find(t => t.id === e.target.value);
                                      setValue(`tools.${index}.plan`, newTool?.plans[0]?.id ?? "");
                                    }}
                                  >
                                    {TOOLS.map((t) => (
                                      <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                  </select>
                                )}
                              />
                            </div>

                            {/* Plan selector */}
                            <div>
                              <label className="block text-[10px] font-black mb-2 text-slate-400 uppercase tracking-widest">
                                Plan
                              </label>
                              <Controller
                                control={control}
                                name={`tools.${index}.plan`}
                                render={({ field: f }) => (
                                  <select
                                    className="w-full px-4 py-3 text-sm font-bold rounded-xl border-2 border-slate-50 focus:border-emerald-500 outline-none transition-all bg-slate-50"
                                    {...f}
                                  >
                                    {(toolDef?.plans ?? []).map((p) => (
                                      <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                  </select>
                                )}
                              />
                            </div>

                            {/* Monthly spend */}
                            <div>
                              <label className="block text-[10px] font-black mb-2 text-slate-400 uppercase tracking-widest">
                                Spend (USD)
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-300">$</span>
                                <input
                                  type="number"
                                  min={0}
                                  className="w-full pl-8 pr-4 py-3 text-sm font-bold rounded-xl border-2 border-slate-50 focus:border-emerald-500 outline-none transition-all bg-slate-50 font-mono"
                                  {...register(`tools.${index}.monthlySpend`, { valueAsNumber: true })}
                                />
                              </div>
                            </div>

                            {/* Seats */}
                            <div>
                              <label className="block text-[10px] font-black mb-2 text-slate-400 uppercase tracking-widest">
                                Seats
                              </label>
                              <input
                                type="number"
                                min={1}
                                className="w-full px-4 py-3 text-sm font-bold rounded-xl border-2 border-slate-50 focus:border-emerald-500 outline-none transition-all bg-slate-50"
                                {...register(`tools.${index}.seats`, { valueAsNumber: true })}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6">
                  <button
                    type="button"
                    onClick={() => append({ id: nanoid(), tool: "cursor", plan: "pro", monthlySpend: 0, seats: 1 })}
                    className="flex items-center justify-center gap-3 py-6 rounded-3xl text-sm font-black uppercase tracking-[0.3em] transition-all hover:bg-white border-2 border-dashed border-slate-200 text-slate-400 hover:border-emerald-500 hover:text-emerald-500 active:scale-95"
                  >
                    <Plus size={20} />
                    Append_Vector
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center justify-center gap-4 py-6 rounded-3xl font-black text-lg transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.4)] hover:translate-y-[-4px] active:scale-95 relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #10B981 0%, #0F766E 100%)",
                      color: "#FFFFFF",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    {isSubmitting ? "AUDITING..." : "RUN_AUDIT"}
                    {!isSubmitting && <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar with Energy */}
            <div className="lg:sticky lg:top-32 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
                
                <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-6 flex items-center gap-2">
                  <Activity size={14} />
                  Intelligence_Node
                </h3>
                
                <p className="text-xl font-bold leading-tight mb-8 drop-shadow-sm">
                  Our audit system analyzes <span className="text-emerald-400">200+ pricing plans</span> across the AI landscape to find your optimal stack.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Shield, text: "Privacy-first analysis" },
                    { icon: Zap, text: "Instant cost-recovery" },
                    { icon: Bot, text: "AI-driven reasoning" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-500">
                        <item.icon size={14} />
                      </div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </motion.div>

              <LiveIntelligenceSidebar />
            </div>
          </div>
        </div>
      </AdvancedBackground>
    </div>
  );
}
