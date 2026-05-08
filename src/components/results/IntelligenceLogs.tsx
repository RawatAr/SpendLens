"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, Cpu, Database, TrendingDown, CheckCircle2, Terminal, Shield, Zap } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import type { ToolAuditResult } from "@/types/audit";
import { useCurrency } from "@/context/currency-context";

interface IntelligenceLogsProps {
  tools: ToolAuditResult[];
}

interface LogEntry {
  id: number;
  timestamp: string;
  type: "analysis" | "optimization" | "recommendation" | "validation";
  message: string;
  status: "processing" | "complete" | "success" | "warning";
}

export function IntelligenceLogs({ tools }: IntelligenceLogsProps) {
  const { formatValue } = useCurrency();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    // Reset logs when tools change to feel "live"
    setLogs([]);
    setIsStreaming(true);

    const dynamicLogs: LogEntry[] = [];
    let logId = 1;
    const now = new Date();

    tools.forEach((tool, i) => {
      const timeStr = new Date(now.getTime() + i * 800).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      dynamicLogs.push({
        id: logId++,
        timestamp: timeStr,
        type: "analysis",
        message: `Scanning ${tool.toolDisplayName} metadata...`,
        status: "complete"
      });

      dynamicLogs.push({
        id: logId++,
        timestamp: timeStr,
        type: "analysis",
        message: `Cross-referencing ${tool.currentPlan} with market benchmarks`,
        status: "complete"
      });

      if (tool.monthlySavings > 0) {
        dynamicLogs.push({
          id: logId++,
          timestamp: timeStr,
          type: "optimization",
          message: `LEAK_DETECTED: ${formatValue(tool.monthlySavings)}/mo excess in ${tool.toolDisplayName}`,
          status: "warning"
        });
        dynamicLogs.push({
          id: logId++,
          timestamp: timeStr,
          type: "recommendation",
          message: `Recommended: ${tool.recommendation} protocol initiated`,
          status: "success"
        });
      } else {
        dynamicLogs.push({
          id: logId++,
          timestamp: timeStr,
          type: "validation",
          message: `${tool.toolDisplayName} efficiency verified: 100% match`,
          status: "success"
        });
      }
    });

    dynamicLogs.push({
      id: logId++,
      timestamp: new Date().toLocaleTimeString(),
      type: "validation",
      message: "Final structural synthesis complete.",
      status: "success"
    });

    let index = 0;
    const interval = setInterval(() => {
      if (index < dynamicLogs.length) {
        const nextLog = dynamicLogs[index];
        if (nextLog) {
          setLogs((prev) => [...prev, nextLog]);
        }
        index++;
      } else {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [tools, formatValue]); // Stable dependency array

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUpVariants}
      className="bg-slate-950 rounded-[2.5rem] shadow-2xl border border-slate-800 p-8 relative overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Terminal size={20} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-[9px] font-black text-emerald-400/60 uppercase tracking-[0.4em] mb-0.5">
              INTELLIGENCE_STREAM
            </h3>
            <p className="text-lg font-black text-white tracking-tighter">
              Reasoning Engine
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isStreaming && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">COMPLETE</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-slate-900/50 rounded-2xl p-6 font-mono text-[11px] border border-slate-800 relative z-10 max-h-[300px] overflow-y-auto scrollbar-hide">
        <div className="space-y-3">
          {logs.map((log) => {
            const Icon = {
              analysis: Cpu,
              optimization: Zap,
              recommendation: TrendingDown,
              validation: Shield,
            }[log.type];
            
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3"
              >
                <span className="text-slate-600 text-[9px] pt-1 shrink-0">
                  [{log.timestamp}]
                </span>
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 bg-slate-800/50 border border-slate-700 ${log.status === "success" ? "text-emerald-400" : log.status === "warning" ? "text-amber-400" : "text-slate-400"}`}>
                  <Icon size={12} />
                </div>
                <div className="flex-1 pt-0.5">
                  <span className={`font-medium tracking-tight ${log.status === "success" ? "text-emerald-400" : log.status === "warning" ? "text-amber-400" : "text-slate-200"}`}>
                    {log.message}
                  </span>
                </div>
              </motion.div>
            );
          })}
          {isStreaming && (
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-1.5 h-3 bg-emerald-500 ml-16"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
