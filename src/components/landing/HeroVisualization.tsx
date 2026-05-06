"use client";

import { motion } from "framer-motion";
import { 
  ArrowDownRight, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  DollarSign,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Cpu,
  Database,
  Globe,
  Code
} from "lucide-react";
import { floatVariants, cardHoverVariants, fadeUpVariants } from "@/lib/motion";

// Floating tool cards data
const TOOL_CARDS = [
  { name: "Cursor", icon: "🔍", current: "$800", optimized: "$400", savings: "$400" },
  { name: "Claude", icon: "🤖", current: "$500", optimized: "$400", savings: "$100" },
  { name: "ChatGPT", icon: "💬", current: "$300", optimized: "$300", savings: "$0" },
  { name: "Copilot", icon: "👨‍💻", current: "$380", optimized: "$190", savings: "$190" },
];

// AI ecosystem elements
const ECOSYSTEM_ELEMENTS = [
  { icon: Cpu, position: { top: "10%", left: "5%" }, delay: 0 },
  { icon: Database, position: { top: "15%", right: "8%" }, delay: 1 },
  { icon: Globe, position: { bottom: "20%", left: "8%" }, delay: 2 },
  { icon: Code, position: { bottom: "15%", right: "5%" }, delay: 3 },
  { icon: Sparkles, position: { top: "50%", left: "2%" }, delay: 1.5 },
  { icon: Activity, position: { top: "50%", right: "2%" }, delay: 2.5 },
];

export function HeroVisualization() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Floating AI ecosystem elements */}
      {ECOSYSTEM_ELEMENTS.map((element, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none"
          style={{
            top: element.position.top,
            left: element.position.left,
            right: element.position.right,
            bottom: element.position.bottom,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.15)",
            }}
          >
            <element.icon size={20} className="text-[#10B981]" />
          </div>
        </motion.div>
      ))}

      {/* Connecting lines between ecosystem elements */}
      <svg className="absolute inset-0 pointer-events-none opacity-[0.03]" width="100%" height="100%">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0F766E" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 50 100 Q 200 150 350 100"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          animate={{
            strokeDashoffset: [0, -200],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            strokeDasharray: "200",
          }}
        />
        <motion.path
          d="M 50 250 Q 200 200 350 250"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          animate={{
            strokeDashoffset: [0, -200],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
          style={{
            strokeDasharray: "200",
          }}
        />
      </svg>

      {/* Main visualization container */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUpVariants}
        className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#E2E8F0] p-8"
      >
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            AI Spend Observatory
          </h3>
          <p className="text-sm text-[#475569]">
            Real-time optimization analysis
          </p>
        </div>

        {/* Spend transformation visualization */}
        <div className="relative mb-8">
          {/* Current spend bar with pulsing animation */}
          <div className="flex items-center gap-4 mb-4">
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
                <DollarSign size={20} className="text-[#F59E0B]" />
              </motion.div>
              <span className="text-sm font-medium text-[#475569]">Current</span>
            </div>
            <div className="flex-1 h-8 bg-[#F1F5F9] rounded-lg overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-lg"
              />
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
                className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20"
              />
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
              className="text-sm font-bold text-[#0F172A]"
            >
              $1,980/mo
            </motion.span>
          </div>

          {/* Animated flowing arrow indicator */}
          <div className="flex justify-center my-2 relative">
            <motion.div
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center gap-2 text-[#10B981]"
            >
              <ArrowDownRight size={24} />
              <span className="text-xs font-semibold">Optimizing...</span>
            </motion.div>
            {/* Flowing particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#10B981]"
                animate={{
                  y: [-10, 10],
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

          {/* Optimized spend bar with pulsing animation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut",
                }}
              >
                <DollarSign size={20} className="text-[#10B981]" />
              </motion.div>
              <span className="text-sm font-medium text-[#475569]">Optimized</span>
            </div>
            <div className="flex-1 h-8 bg-[#F1F5F9] rounded-lg overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "49%" }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#10B981] to-[#0F766E] rounded-lg"
              />
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
                className="absolute inset-0 bg-gradient-to-r from-[#10B981]/20 to-[#0F766E]/20"
              />
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
              className="text-sm font-bold text-[#10B981]"
            >
              $970/mo
            </motion.span>
          </div>
        </div>

        {/* Floating tool cards with enhanced motion */}
        <div className="relative h-[200px]">
          {TOOL_CARDS.map((tool, index) => (
            <motion.div
              key={tool.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="absolute bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-4 w-48"
              style={{
                left: `${(index % 2) * 55}%`,
                top: `${Math.floor(index / 2) * 55}%`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                  className="text-2xl"
                >
                  {tool.icon}
                </motion.span>
                <span className="text-sm font-semibold text-[#0F172A]">{tool.name}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Current</span>
                  <motion.span
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                    className="font-medium text-[#475569]"
                  >
                    {tool.current}
                  </motion.span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Optimized</span>
                  <motion.span
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3 + 0.1,
                      ease: "easeInOut",
                    }}
                    className="font-medium text-[#10B981]"
                  >
                    {tool.optimized}
                  </motion.span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#F1F5F9]">
                  <span className="text-[#94A3B8]">Savings</span>
                  <motion.span
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                    className="font-bold text-[#10B981]"
                  >
                    {tool.savings}
                  </motion.span>
                </div>
              </div>
              {/* Recommendation indicator with pulse */}
              <div className="flex items-center gap-1 mt-2 pt-2 border-t border-[#F1F5F9]">
                {tool.savings !== "$0" ? (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut",
                      }}
                    >
                      <TrendingDown size={12} className="text-[#10B981]" />
                    </motion.div>
                    <span className="text-xs text-[#10B981]">Downgrade</span>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut",
                      }}
                    >
                      <CheckCircle2 size={12} className="text-[#0F766E]" />
                    </motion.div>
                    <span className="text-xs text-[#0F766E]">Optimal</span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total savings highlight with enhanced motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#10B981]/10 to-[#0F766E]/10 border border-[#10B981]/20 relative overflow-hidden"
        >
          {/* Animated background glow */}
          <motion.div
            animate={{
              x: [-100, 100, -100],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10B981]/10 to-transparent"
          />
          <div className="relative flex items-center justify-between">
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
              <span className="text-sm font-medium text-[#0F172A]">Total Monthly Savings</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-2xl font-bold text-[#10B981]"
              >
                $1,010
              </motion.span>
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={16} className="text-[#10B981]" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced animated activity indicator with live processing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4 flex items-center gap-2 text-xs text-[#94A3B8]"
        >
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
            <Activity size={14} className="text-[#10B981]" />
          </motion.div>
          <motion.span
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Analyzing 4 tools · Detecting 2 optimization opportunities
          </motion.span>
          <motion.div
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
          />
        </motion.div>
      </motion.div>

      {/* Enhanced background decorative elements with ambient motion */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#10B981]/20 to-[#0F766E]/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          y: [-15, 15, -15],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
          delay: 3,
        }}
        className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[#34D399]/20 to-[#A7F3D0]/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          x: [-10, 10, -10],
          y: [-10, 10, -10],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-[#10B981]/10 to-[#0F766E]/10 rounded-full blur-3xl"
      />
    </div>
  );
}
