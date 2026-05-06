"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Activity, CheckCircle2, Zap, TrendingDown } from "lucide-react";

interface OptimizationStage {
  id: "overspending" | "analysis" | "results";
  title: string;
  subtitle: string;
}

const STAGES: OptimizationStage[] = [
  {
    id: "overspending",
    title: "AI stack is leaking money",
    subtitle: "Detecting waste and inefficient plans",
  },
  {
    id: "analysis",
    title: "AI analysis in progress",
    subtitle: "Scanning benchmark data",
  },
  {
    id: "results",
    title: "Optimization complete",
    subtitle: "Projected savings identified",
  },
];

const SAMPLE_TOOLS = [
  { name: "Cursor Business", current: 400, optimized: 200, savings: 200 },
  { name: "Copilot Enterprise", current: 300, optimized: 120, savings: 180 },
  { name: "Claude Team", current: 250, optimized: 150, savings: 100 },
];

export function HeroOptimizationSimulator() {
  const [currentStage, setCurrentStage] = useState<"overspending" | "analysis" | "results">("overspending");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStage === "overspending") {
            setCurrentStage("analysis");
            return 0;
          } else if (currentStage === "analysis") {
            setCurrentStage("results");
            return 0;
          }
          return 100;
        }
        return prev + 4; // Faster progress for snappier feel
      });
    }, 60);

    return () => clearInterval(interval);
  }, [currentStage]);

  const currentStageInfo = STAGES.find((s) => s.id === currentStage) || STAGES[0];

  return (
    <div className="relative bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 opacity-50" />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
            currentStage === "overspending" ? "bg-red-50 border-red-100 text-red-500" :
            currentStage === "analysis" ? "bg-amber-50 border-amber-100 text-amber-500" :
            "bg-emerald-50 border-emerald-100 text-emerald-500"
          }`}>
            {currentStage === "overspending" && <AlertTriangle size={20} />}
            {currentStage === "analysis" && <Activity size={20} className="animate-spin-slow" />}
            {currentStage === "results" && <CheckCircle2 size={20} />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
              {currentStageInfo.title}
            </h3>
            <p className="text-xs font-medium text-slate-500">
              {currentStageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            className={`h-full ${
              currentStage === "overspending" ? "bg-red-500" :
              currentStage === "analysis" ? "bg-amber-500" :
              "bg-emerald-500"
            }`}
          />
        </div>
      </div>

      {/* Tool List */}
      <div className="space-y-2 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {SAMPLE_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className={`flex items-center justify-between p-3 rounded-lg border text-xs font-bold ${
                  currentStage === "overspending" ? "bg-red-50 border-red-100" :
                  currentStage === "analysis" ? "bg-amber-50 border-amber-100" :
                  "bg-emerald-50 border-emerald-100"
                } mb-2`}
              >
                <span className="text-slate-900">{tool.name}</span>
                <div className="flex items-center gap-3">
                  {currentStage === "overspending" && (
                    <span className="text-red-500 font-mono">${tool.current}/mo</span>
                  )}
                  {currentStage === "analysis" && (
                    <span className="text-amber-500 animate-pulse uppercase tracking-widest">Scanning...</span>
                  )}
                  {currentStage === "results" && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 line-through font-mono">${tool.current}</span>
                      <TrendingDown size={12} className="text-emerald-500" />
                      <span className="text-emerald-600 font-mono">${tool.optimized}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Result Card */}
      <AnimatePresence>
        {currentStage === "results" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-emerald-600 rounded-lg text-white relative z-10"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Projected Annual Savings</div>
                <div className="text-2xl font-bold font-mono">$5,760/yr</div>
              </div>
              <Zap size={24} className="opacity-80" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
