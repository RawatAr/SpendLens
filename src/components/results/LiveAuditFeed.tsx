"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, Cpu, Database, Globe, Code, TrendingDown, CheckCircle2, Zap } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";

const AUDIT_EVENTS = [
  {
    id: 1,
    type: "analysis",
    icon: Cpu,
    message: "Analyzing Cursor Business plan configuration...",
    timestamp: "Just now",
    status: "processing",
  },
  {
    id: 2,
    type: "comparison",
    icon: Database,
    message: "Comparing against Cursor Pro tier capabilities...",
    timestamp: "2s ago",
    status: "complete",
  },
  {
    id: 3,
    type: "optimization",
    icon: TrendingDown,
    message: "Identified $400/month savings opportunity",
    timestamp: "5s ago",
    status: "success",
  },
  {
    id: 4,
    type: "analysis",
    icon: Globe,
    message: "Evaluating Copilot Enterprise usage patterns...",
    timestamp: "8s ago",
    status: "complete",
  },
  {
    id: 5,
    type: "validation",
    icon: CheckCircle2,
    message: "Verified zero capability loss with recommended changes",
    timestamp: "12s ago",
    status: "success",
  },
  {
    id: 6,
    type: "processing",
    icon: Code,
    message: "Calculating annualized savings projections...",
    timestamp: "15s ago",
    status: "complete",
  },
];

export function LiveAuditFeed() {
  const [events, setEvents] = useState(AUDIT_EVENTS);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={0}
      variants={fadeUpVariants}
      className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 mb-8 relative overflow-hidden"
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

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
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
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              <Activity size={20} className="text-[#10B981]" />
            </div>
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">
              Live Audit Feed
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Real-time AI analysis stream
            </p>
          </div>
        </div>
        <motion.div
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="flex items-center gap-2 text-xs text-[#94A3B8]"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Activity size={14} className="text-[#10B981]" />
          </motion.div>
          <span>{isProcessing ? "Processing..." : "Analysis complete"}</span>
        </motion.div>
      </div>

      {/* Feed Items */}
      <div className="space-y-3 relative z-10">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 bg-[#F7F8F6] rounded-xl border border-[#E2E8F0] hover:border-[#10B981]/30 transition-colors"
          >
            {/* Icon */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex-shrink-0"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    event.status === "success"
                      ? "rgba(16, 185, 129, 0.15)"
                      : event.status === "processing"
                      ? "rgba(245, 158, 11, 0.15)"
                      : "rgba(15, 118, 110, 0.15)",
                  border:
                    event.status === "success"
                      ? "1px solid rgba(16, 185, 129, 0.3)"
                      : event.status === "processing"
                      ? "1px solid rgba(245, 158, 11, 0.3)"
                      : "1px solid rgba(15, 118, 110, 0.3)",
                }}
              >
                <event.icon
                  size={16}
                  className={
                    event.status === "success"
                      ? "text-[#10B981]"
                      : event.status === "processing"
                      ? "text-[#F59E0B]"
                      : "text-[#0F766E]"
                  }
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#0F172A] font-medium">
                {event.message}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[#94A3B8]">
                  {event.timestamp}
                </span>
                {event.status === "success" && (
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap size={12} className="text-[#10B981]" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Status Indicator */}
            {event.status === "processing" && (
              <motion.div
                animate={{
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="flex-shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              </motion.div>
            )}
            {event.status === "success" && (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex-shrink-0"
              >
                <CheckCircle2 size={16} className="text-[#10B981]" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Animated Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 pt-4 border-t border-[#E2E8F0] relative z-10"
      >
        <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2">
          <span>Analysis Progress</span>
          <span>100%</span>
        </div>
        <div className="h-2 bg-[#F7F8F6] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[#10B981] to-[#0F766E]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
