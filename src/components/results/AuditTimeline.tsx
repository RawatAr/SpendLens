"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Activity, Zap, Cpu, Database, Globe, Code, TrendingDown } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import type { ToolAuditResult } from "@/types/audit";

interface AuditTimelineProps {
  tools: ToolAuditResult[];
}

export function AuditTimeline({ tools }: AuditTimelineProps) {
  // Get tools with savings to create timeline
  const toolsWithSavings = tools.filter(t => t.monthlySavings > 0);
  
  if (toolsWithSavings.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={0}
      variants={fadeUpVariants}
      className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-8 mb-8 relative overflow-hidden"
    >
      {/* Animated background glow */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10B981]/5 to-transparent pointer-events-none"
      />

      <div className="flex items-center gap-3 mb-6 relative z-10">
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
          <Activity size={24} className="text-[#10B981]" />
        </motion.div>
        <div>
          <h3 className="text-lg font-bold text-[#0F172A]">
            AI Audit Reasoning Flow
          </h3>
          <p className="text-sm text-[#94A3B8]">
            How we identified your optimization opportunities
          </p>
        </div>
      </div>

      <div className="space-y-0 relative z-10">
        {toolsWithSavings.map((tool, index) => (
          <div key={tool.toolDisplayName} className="relative">
            {/* Animated Timeline Line */}
            {index < toolsWithSavings.length - 1 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="absolute left-[19px] top-10 w-0.5 bg-gradient-to-b from-[#10B981]/50 to-[#10B981]/20"
              />
            )}

            <motion.div
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="flex gap-4 pb-8 last:pb-0"
            >
              {/* Step Number with pulse animation */}
              <div className="flex-shrink-0">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(16, 185, 129, 0.4)",
                      "0 0 0 8px rgba(16, 185, 129, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#0F766E] flex items-center justify-center text-white font-bold text-sm"
                >
                  {index + 1}
                </motion.div>
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-base font-bold text-[#0F172A] mb-1">
                      {tool.toolDisplayName} Optimization
                    </h4>
                    <p className="text-sm text-[#475569]">
                      {tool.recommendedAction}
                    </p>
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                    className="text-right"
                  >
                    <div className="text-lg font-bold text-[#10B981] font-mono">
                      ${tool.monthlySavings}/mo
                    </div>
                    <div className="text-xs text-[#94A3B8]">
                      ${tool.annualSavings}/yr
                    </div>
                  </motion.div>
                </div>

                {/* Animated Analysis Details */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="mt-3 p-3 bg-[#F7F8F6] rounded-lg border border-[#E2E8F0] relative overflow-hidden"
                >
                  {/* Animated background glow */}
                  <motion.div
                    animate={{
                      opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 to-transparent"
                  />

                  <div className="relative flex items-start gap-2 text-xs text-[#475569]">
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
                      <Zap size={14} className="text-[#10B981] mt-0.5 shrink-0" />
                    </motion.div>
                    <div>
                      <span className="font-semibold text-[#0F172A]">Analysis:</span>{" "}
                      {tool.recommendation === "downgrade" && (
                        <>
                          Detected oversized plan for your team size. Current plan includes features (admin controls, SSO, audit logs) that are typically only needed for teams of 50+ users.
                        </>
                      )}
                      {tool.recommendation === "switch" && (
                        <>
                          Identified a more cost-effective alternative with comparable capabilities for your use case. The recommended tool offers similar functionality at a significantly lower price point.
                        </>
                      )}
                      {tool.recommendation === "optimize" && (
                        <>
                          Usage-based optimization opportunities detected. Implementing prompt caching, token limits, and batching can reduce costs by 30-50% without sacrificing performance.
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Animated Total Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-6 border-t border-[#E2E8F0] relative z-10"
      >
        <div className="flex items-center justify-between">
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
              <CheckCircle2 size={20} className="text-[#10B981]" />
            </motion.div>
            <span className="text-sm font-medium text-[#0F172A]">
              Total Potential Savings
            </span>
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
            <div className="text-xl font-bold text-[#10B981] font-mono">
              ${toolsWithSavings.reduce((sum, t) => sum + t.monthlySavings, 0).toLocaleString()}/mo
            </div>
            <div className="text-xs text-[#94A3B8]">
              ${toolsWithSavings.reduce((sum, t) => sum + t.annualSavings, 0).toLocaleString()}/yr
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating AI intelligence indicators */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[Cpu, Database, Globe, Code, TrendingDown].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              top: `${20 + i * 15}%`,
              right: `${5 + i * 3}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.15)",
              }}
            >
              <Icon size={16} className="text-[#10B981]" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
