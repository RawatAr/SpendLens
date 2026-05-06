"use client";

import { motion } from "framer-motion";
import { 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Activity,
  Zap,
  DollarSign
} from "lucide-react";
import { fadeUpVariants, graphBarVariants, savingsRevealVariants } from "@/lib/motion";

const SAMPLE_AUDIT_DATA = {
  totalMonthlyCurrent: 1980,
  totalMonthlyOptimized: 970,
  totalMonthlySavings: 1010,
  tools: [
    {
      name: "Cursor",
      icon: "🔍",
      current: "$800",
      optimized: "$400",
      savings: "$400",
      recommendation: "downgrade",
      confidence: "high",
    },
    {
      name: "Claude",
      icon: "🤖",
      current: "$500",
      optimized: "$400",
      savings: "$100",
      recommendation: "downgrade",
      confidence: "high",
    },
    {
      name: "ChatGPT",
      icon: "💬",
      current: "$300",
      optimized: "$300",
      savings: "$0",
      recommendation: "keep",
      confidence: "high",
    },
    {
      name: "Copilot",
      icon: "👨‍💻",
      current: "$380",
      optimized: "$190",
      savings: "$190",
      recommendation: "downgrade",
      confidence: "medium",
    },
  ],
};

export function SampleAuditTerminal() {
  const savingsPercentage = Math.round(
    (SAMPLE_AUDIT_DATA.totalMonthlySavings / SAMPLE_AUDIT_DATA.totalMonthlyCurrent) * 100
  );

  return (
    <section className="py-24 bg-[#F7F8F6]/50">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
            See Your Savings in Action
          </h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            A premium financial intelligence terminal that surfaces hidden
            inefficiencies in your AI stack.
          </p>
        </motion.div>

        {/* Terminal Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUpVariants}
          className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-[#10B981]/10 to-[#0F766E]/10 border-b border-[#E2E8F0] px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity size={20} className="text-[#10B981]" />
                <span className="text-sm font-semibold text-[#0F172A]">
                  AI Spend Audit Report
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                <Activity size={14} className="animate-pulse" />
                <span>Live Analysis</span>
              </div>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-8">
            {/* Animated Spend Transformation Visualization */}
            <div className="mb-8 p-6 bg-gradient-to-br from-[#10B981]/5 to-[#0F766E]/5 rounded-xl border border-[#10B981]/20 relative overflow-hidden">
              {/* Animated background glow */}
              <motion.div
                animate={{
                  x: [-100, 100, -100],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10B981]/10 to-transparent"
              />

              <div className="relative">
                {/* Spend Transformation Bars */}
                <div className="space-y-6">
                  {/* Current Spend Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <DollarSign size={18} className="text-[#F59E0B]" />
                        </motion.div>
                        <span className="text-sm font-medium text-[#94A3B8]">Current Spend</span>
                      </div>
                      <motion.span
                        animate={{
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-2xl font-bold text-[#0F172A] font-mono"
                      >
                        ${SAMPLE_AUDIT_DATA.totalMonthlyCurrent.toLocaleString()}/mo
                      </motion.span>
                    </div>
                    <div className="relative h-8 bg-[#F1F5F9] rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-lg relative"
                      >
                        {/* Pulsing glow effect */}
                        <motion.div
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/30 to-[#F97316]/30"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Animated Transformation Arrow */}
                  <div className="flex justify-center relative">
                    <motion.div
                      animate={{
                        y: [-8, 8, -8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex items-center gap-2 text-[#10B981]"
                    >
                      <TrendingDown size={24} />
                      <span className="text-xs font-semibold">Optimizing...</span>
                    </motion.div>
                    {/* Flowing particles */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#10B981]"
                        animate={{
                          y: [-8, 8],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut",
                        }}
                        style={{
                          left: `${40 + i * 10}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Optimized Spend Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5,
                            ease: "easeInOut",
                          }}
                        >
                          <DollarSign size={18} className="text-[#10B981]" />
                        </motion.div>
                        <span className="text-sm font-medium text-[#94A3B8]">Optimized Spend</span>
                      </div>
                      <motion.span
                        animate={{
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                          ease: "easeInOut",
                        }}
                        className="text-2xl font-bold text-[#10B981] font-mono"
                      >
                        ${SAMPLE_AUDIT_DATA.totalMonthlyOptimized.toLocaleString()}/mo
                      </motion.span>
                    </div>
                    <div className="relative h-8 bg-[#F1F5F9] rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(SAMPLE_AUDIT_DATA.totalMonthlyOptimized / SAMPLE_AUDIT_DATA.totalMonthlyCurrent) * 100}%` }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#10B981] to-[#0F766E] rounded-lg relative"
                      >
                        {/* Pulsing glow effect */}
                        <motion.div
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-[#10B981]/30 to-[#0F766E]/30"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Savings Highlight */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-6 p-4 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Zap size={20} className="text-[#10B981]" />
                      </motion.div>
                      <div>
                        <div className="text-sm font-medium text-[#0F172A]">
                          Monthly Savings
                        </div>
                        <div className="text-xs text-[#94A3B8]">
                          {savingsPercentage}% reduction
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-right"
                    >
                      <div className="text-3xl font-bold text-[#10B981] font-mono">
                        ${SAMPLE_AUDIT_DATA.totalMonthlySavings.toLocaleString()}
                      </div>
                      <div className="text-xs text-[#94A3B8]">
                        ${(SAMPLE_AUDIT_DATA.totalMonthlySavings * 12).toLocaleString()}/year
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Tool Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#0F172A] flex items-center gap-2">
                <BarChart3 size={20} className="text-[#10B981]" />
                Tool Breakdown
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {SAMPLE_AUDIT_DATA.tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariants}
                    className="bg-[#F7F8F6] rounded-xl p-5 border border-[#E2E8F0] hover:border-[#10B981]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tool.icon}</span>
                        <div>
                          <div className="font-semibold text-[#0F172A]">
                            {tool.name}
                          </div>
                          <div className="text-xs text-[#94A3B8]">
                            {tool.recommendation === "keep" ? "Optimal" : tool.recommendation}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          tool.recommendation === "keep"
                            ? "bg-[#0F766E]/10 text-[#0F766E]"
                            : tool.recommendation === "downgrade"
                            ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                            : "bg-[#F97316]/10 text-[#F97316]"
                        }`}
                      >
                        {tool.recommendation === "keep" ? (
                          <CheckCircle2 size={12} />
                        ) : tool.recommendation === "downgrade" ? (
                          <TrendingDown size={12} />
                        ) : (
                          <AlertTriangle size={12} />
                        )}
                        <span className="capitalize">{tool.recommendation}</span>
                      </div>
                    </div>

                    {/* Spend Comparison */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#94A3B8]">Current</span>
                        <span className="font-medium text-[#475569]">{tool.current}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#94A3B8]">Optimized</span>
                        <span className="font-medium text-[#10B981]">{tool.optimized}</span>
                      </div>
                      {tool.savings !== "$0" && (
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E2E8F0]">
                          <span className="text-[#94A3B8]">Savings</span>
                          <span className="font-bold text-[#10B981]">{tool.savings}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-base transition-all shadow-lg hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #10B981 0%, #0F766E 100%)",
                  color: "#FFFFFF",
                }}
              >
                Audit Your Stack
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
