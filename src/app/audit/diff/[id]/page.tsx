/**
 * /audit/diff/[id] — Re-audit diff page
 *
 * Shown when a user clicks "View Updated Audit" from the pricing-change email.
 * Loads the stored audit (old result + input), re-runs with current pricing,
 * and renders a side-by-side diff via <DiffView />.
 */

import { db } from "@/db";
import { storedAudits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";
import { runAudit } from "@/lib/audit-engine";
import { DiffView } from "@/components/results/DiffView";
import type { AuditInput, AggregateAuditResult } from "@/types/audit";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Re-audit · ${id} | SpendLens`,
    description: "See how pricing changes affect your AI tool audit recommendations.",
  };
}

export default async function DiffPage({ params }: PageProps) {
  const { id } = await params;

  // ── Load stored audit ────────────────────────────────────────────────────
  let stored;
  try {
    [stored] = await db
      .select()
      .from(storedAudits)
      .where(eq(storedAudits.id, id))
      .limit(1);
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: "#A1A1AA" }}>
            Database unavailable — cannot load audit.
          </p>
          <Link href="/audit" style={{ color: "#10B981", fontSize: 13 }}>
            Run a new audit →
          </Link>
        </div>
      </div>
    );
  }

  if (!stored) notFound();

  const oldResult = stored.outputResult as unknown as AggregateAuditResult;
  const inputStack = stored.inputStack as unknown as AuditInput;

  // ── Re-run with current pricing ──────────────────────────────────────────
  let newResult: AggregateAuditResult;
  try {
    newResult = runAudit(inputStack);
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: "#A1A1AA" }}>
            Could not re-run audit. Input data may be invalid.
          </p>
          <Link href="/audit" style={{ color: "#10B981", fontSize: 13 }}>
            Start a fresh audit →
          </Link>
        </div>
      </div>
    );
  }

  const isFlagged = stored.flaggedForReaudit;

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid #1f1f1f" }}>
        <div className="max-w-[720px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
            <span className="text-sm font-semibold" style={{ color: "#FAFAFA" }}>SpendLens</span>
          </Link>
          <Link
            href="/audit"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[6px]"
            style={{ background: "#10B981", color: "#fff" }}
          >
            New audit <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-6 py-12">
        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: "rgb(245 158 11 / 0.1)", border: "1px solid rgb(245 158 11 / 0.25)" }}
          >
            <RefreshCw size={11} style={{ color: "#F59E0B" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Pricing updated
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#FAFAFA", letterSpacing: "-0.02em" }}>
            Re-audit comparison
          </h1>
          <p className="text-sm" style={{ color: "#71717A" }}>
            AI tool pricing has changed since your original audit.
            Below is your previous recommendation vs what our engine suggests today.
          </p>
        </div>

        {/* ── Audit meta ───────────────────────────────────────────────────── */}
        <div
          className="flex items-center gap-4 p-4 rounded-[10px] mb-8"
          style={{ background: "#111111", border: "1px solid #262626" }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
              Audit ID
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#FAFAFA", fontFamily: "monospace" }}>
              {id}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
              Original date
            </div>
            <div style={{ fontSize: 13, color: "#A1A1AA" }}>
              {new Date(stored.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
              Re-run date
            </div>
            <div style={{ fontSize: 13, color: "#A1A1AA" }}>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* ── Diff View ────────────────────────────────────────────────────── */}
        <DiffView auditId={id} oldResult={oldResult} newResult={newResult} />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div
          className="mt-10 p-8 rounded-[16px] text-center"
          style={{ background: "rgb(16 185 129 / 0.04)", border: "1px solid rgb(16 185 129 / 0.15)" }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#FAFAFA" }}>
            Want a fresh audit from scratch?
          </h3>
          <p className="text-sm mb-5" style={{ color: "#A1A1AA" }}>
            Re-run with current pricing, updated team size, or different tools.
          </p>
          <Link
            href="/audit"
            id="diff-page-new-audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] font-semibold text-sm"
            style={{ background: "#10B981", color: "#fff" }}
          >
            Start fresh audit <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
