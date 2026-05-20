"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import type { AggregateAuditResult, ToolAuditResult } from "@/types/audit";

interface DiffViewProps {
  auditId: string;
  oldResult: AggregateAuditResult;
  newResult: AggregateAuditResult;
}

const REC_CONFIG = {
  keep: { icon: CheckCircle2, color: "#22C55E", label: "Keep" },
  downgrade: { icon: AlertTriangle, color: "#F59E0B", label: "Downgrade" },
  switch: { icon: XCircle, color: "#EF4444", label: "Switch" },
  optimize: { icon: Zap, color: "#818CF8", label: "Optimize" },
} as const;

function toolChanged(oldTool: ToolAuditResult, newTool: ToolAuditResult): boolean {
  return (
    oldTool.recommendation !== newTool.recommendation ||
    Math.abs(oldTool.monthlySavings - newTool.monthlySavings) > 1
  );
}

function SavingsDelta({ old: oldVal, next: newVal }: { old: number; next: number }) {
  const delta = newVal - oldVal;
  if (Math.abs(delta) <= 1) return <span style={{ color: "#71717A" }}>—</span>;
  const isGain = delta > 0;
  const Icon = isGain ? TrendingUp : TrendingDown;
  return (
    <span
      style={{
        color: isGain ? "#10B981" : "#EF4444",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      <Icon size={12} />
      {isGain ? "+" : ""}${delta}/mo
    </span>
  );
}

function RecommendationCell({ tool }: { tool: ToolAuditResult }) {
  const config = REC_CONFIG[tool.recommendation as keyof typeof REC_CONFIG] ?? REC_CONFIG.optimize;
  const Icon = config.icon;
  return (
    <div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontSize: 12,
          fontWeight: 700,
          color: config.color,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        <Icon size={12} />
        {config.label}
      </span>
      <div style={{ fontSize: 12, color: "#71717A", marginTop: 4, lineHeight: 1.5 }}>
        ${tool.monthlySavings}/mo saved
      </div>
    </div>
  );
}

export function DiffView({ auditId, oldResult, newResult }: DiffViewProps) {
  const [showUnchanged, setShowUnchanged] = useState(false);

  const totalDelta = newResult.totalMonthlySavings - oldResult.totalMonthlySavings;
  const isGain = totalDelta > 0;

  const toolPairs = oldResult.tools.map((oldTool) => {
    const newTool = newResult.tools.find((t) => t.tool === oldTool.tool) ?? oldTool;
    return { oldTool, newTool, changed: toolChanged(oldTool, newTool) };
  });

  const changedPairs = toolPairs.filter((p) => p.changed);
  const unchangedPairs = toolPairs.filter((p) => !p.changed);

  return (
    <div>
      {/* ── Delta hero ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: isGain
            ? "rgb(16 185 129 / 0.06)"
            : Math.abs(totalDelta) <= 1
            ? "rgb(129 140 248 / 0.06)"
            : "rgb(239 68 68 / 0.06)",
          border: `1px solid ${
            isGain
              ? "rgb(16 185 129 / 0.2)"
              : Math.abs(totalDelta) <= 1
              ? "rgb(129 140 248 / 0.2)"
              : "rgb(239 68 68 / 0.2)"
          }`,
          borderRadius: 16,
          padding: "28px 32px",
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 11, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Change in monthly savings
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: isGain ? "#10B981" : Math.abs(totalDelta) <= 1 ? "#818CF8" : "#EF4444",
          }}
        >
          {Math.abs(totalDelta) <= 1
            ? "No change"
            : `${isGain ? "+" : "-"}$${Math.abs(totalDelta).toLocaleString()}/mo`}
        </div>
        {Math.abs(totalDelta) > 1 && (
          <div style={{ fontSize: 13, color: "#71717A", marginTop: 6 }}>
            {isGain
              ? `Updated pricing saves you $${Math.abs(totalDelta * 12).toLocaleString()} more per year`
              : `Updated pricing reduces your savings by $${Math.abs(totalDelta * 12).toLocaleString()}/year`}
          </div>
        )}
      </motion.div>

      {/* ── Column headers ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          gap: "0 16px",
          padding: "8px 16px",
          marginBottom: 8,
        }}
      >
        {["Tool", "Previous audit", "Updated audit", "Delta"].map((h) => (
          <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {h}
          </div>
        ))}
      </div>

      {/* ── Changed tools ───────────────────────────────────────────────────── */}
      {changedPairs.length === 0 && (
        <div
          style={{
            padding: "24px 16px",
            textAlign: "center",
            background: "#111111",
            border: "1px solid #262626",
            borderRadius: 12,
            color: "#71717A",
            fontSize: 13,
            marginBottom: 8,
          }}
        >
          No recommendation changes detected for your tools.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <AnimatePresence>
          {changedPairs.map(({ oldTool, newTool }) => (
            <motion.div
              key={oldTool.tool}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
                gap: "0 16px",
                padding: "16px",
                background: "#111111",
                border: "1px solid rgb(245 158 11 / 0.3)",
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#FAFAFA" }}>
                  {oldTool.toolDisplayName}
                </div>
                <div style={{ fontSize: 11, color: "#71717A", marginTop: 2 }}>
                  {oldTool.currentPlan}
                </div>
              </div>

              <div style={{ opacity: 0.6 }}>
                <RecommendationCell tool={oldTool} />
              </div>

              <div>
                <RecommendationCell tool={newTool} />
              </div>

              <div>
                <SavingsDelta old={oldTool.monthlySavings} next={newTool.monthlySavings} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Unchanged tools (collapsible) ────────────────────────────────────── */}
      {unchangedPairs.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => setShowUnchanged((s) => !s)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#71717A",
              fontSize: 12,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 0",
              marginBottom: 8,
            }}
          >
            {showUnchanged ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            {unchangedPairs.length} tool{unchangedPairs.length !== 1 ? "s" : ""} unchanged
          </button>

          <AnimatePresence>
            {showUnchanged && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: 6 }}
              >
                {unchangedPairs.map(({ oldTool }) => (
                  <div
                    key={oldTool.tool}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr auto",
                      gap: "0 16px",
                      padding: "14px 16px",
                      background: "#0d0d0d",
                      border: "1px solid #1a1a1a",
                      borderRadius: 10,
                      alignItems: "center",
                      opacity: 0.55,
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#A1A1AA" }}>
                      {oldTool.toolDisplayName}
                    </div>
                    <RecommendationCell tool={oldTool} />
                    <RecommendationCell tool={oldTool} />
                    <Minus size={12} style={{ color: "#52525B" }} />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── Totals row ──────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          gap: "0 16px",
          padding: "16px",
          background: "#0a0a0a",
          border: "1px solid #262626",
          borderRadius: 12,
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Total
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#A1A1AA" }}>
          ${oldResult.totalMonthlySavings.toLocaleString()}/mo
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#FAFAFA" }}>
          ${newResult.totalMonthlySavings.toLocaleString()}/mo
        </div>
        <SavingsDelta old={oldResult.totalMonthlySavings} next={newResult.totalMonthlySavings} />
      </div>
    </div>
  );
}
