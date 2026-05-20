import { db } from "@/db";
import { audits, storedAudits } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, AlertTriangle, XCircle, Zap, ArrowRight } from "lucide-react";
import type { ToolAuditResult } from "@/types/audit";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

// Always server-render — never statically generate (requires DB at runtime)
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://spendlens.io";

  try {
    const [audit] = await db.select().from(audits).where(eq(audits.id, id)).limit(1);
    if (!audit) return { title: "Audit Not Found | SpendLens" };

    const savings = Number(audit.totalMonthlySavings);
    const annual = Number(audit.totalAnnualSavings);
    const tools = (audit.toolsSnapshot as ToolAuditResult[]).map((t) => t.toolDisplayName).join(",");

    return {
      title: `AI Spend Audit — $${savings}/month in savings found`,
      description: `This team could save $${annual.toLocaleString()}/year by optimising their AI tool stack. Audit yours free.`,
      openGraph: {
        title: `AI Spend Audit — $${savings}/month in savings found`,
        description: `This team could save $${annual.toLocaleString()}/year. Audit yours free.`,
        images: [`${appUrl}/api/og?savings=${savings}&annual=${annual}&tier=${audit.savingsTier}&tools=${tools}`],
      },
      twitter: {
        card: "summary_large_image",
        title: `AI Spend Audit — $${savings}/month in savings found`,
        images: [`${appUrl}/api/og?savings=${savings}&annual=${annual}&tier=${audit.savingsTier}&tools=${tools}`],
      },
    };
  } catch {
    return { title: "AI Spend Audit | SpendLens" };
  }
}

const REC_CONFIG = {
  keep: { icon: CheckCircle2, color: "#22C55E", label: "Keep" },
  downgrade: { icon: AlertTriangle, color: "#F59E0B", label: "Downgrade" },
  switch: { icon: XCircle, color: "#EF4444", label: "Switch" },
  optimize: { icon: Zap, color: "#818CF8", label: "Optimize" },
};

const TIER_CONFIG = {
  high: { label: "HIGH SAVINGS", color: "#10B981", bg: "rgb(16 185 129 / 0.1)", border: "rgb(16 185 129 / 0.25)" },
  medium: { label: "MEDIUM SAVINGS", color: "#F59E0B", bg: "rgb(245 158 11 / 0.1)", border: "rgb(245 158 11 / 0.25)" },
  low: { label: "LOW SAVINGS", color: "#EF4444", bg: "rgb(239 68 68 / 0.1)", border: "rgb(239 68 68 / 0.25)" },
  optimal: { label: "ALREADY OPTIMAL", color: "#818CF8", bg: "rgb(129 140 248 / 0.1)", border: "rgb(129 140 248 / 0.25)" },
};

export default async function SharePage({ params }: PageProps) {
  const { id } = await params;

  let audit;
  let isFlagged = false;
  try {
    [audit] = await db.select().from(audits).where(eq(audits.id, id)).limit(1);
    // Round 2: check if this audit has been flagged due to pricing changes
    const [storedAudit] = await db
      .select({ flaggedForReaudit: storedAudits.flaggedForReaudit })
      .from(storedAudits)
      .where(eq(storedAudits.id, id))
      .limit(1);
    isFlagged = storedAudit?.flaggedForReaudit ?? false;
  } catch {
    // DB not configured — show a fallback
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: "#A1A1AA" }}>This audit is not available for sharing yet.</p>
          <Link href="/audit" className="text-sm" style={{ color: "#10B981" }}>Run your own audit →</Link>
        </div>
      </div>
    );
  }

  if (!audit) notFound();

  const tools = audit.toolsSnapshot as ToolAuditResult[];
  const tier = audit.savingsTier as keyof typeof TIER_CONFIG;
  const tierConfig = TIER_CONFIG[tier] ?? TIER_CONFIG.medium;
  const monthly = Number(audit.totalMonthlySavings);
  const annual = Number(audit.totalAnnualSavings);

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #1f1f1f" }}>
        <div className="max-w-[720px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
            <span className="text-sm font-semibold" style={{ color: "#FAFAFA" }}>SpendLens</span>
          </Link>
          <Link href="/audit" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[6px]"
            style={{ background: "#10B981", color: "#fff" }}>
            Audit my stack <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-6 py-12">
        {/* Banner */}
        <div className="text-xs mb-4 px-3 py-2 rounded-[6px] text-center" style={{ background: "#111111", border: "1px solid #262626", color: "#71717A" }}>
          This is a shared audit result. Personal details have been removed.
        </div>

        {/* Stale audit banner — shown when pricing has changed since this audit was run */}
        {isFlagged && (
          <div
            className="text-xs mb-6 px-4 py-3 rounded-[8px] flex items-center justify-between gap-4"
            style={{ background: "rgb(245 158 11 / 0.08)", border: "1px solid rgb(245 158 11 / 0.3)", color: "#F59E0B" }}
          >
            <span>⚡ Pricing has changed since this audit was run. Recommendations may be outdated.</span>
            <Link
              href={`/audit/diff/${id}`}
              className="shrink-0 font-semibold underline"
              style={{ color: "#F59E0B" }}
            >
              See updated audit →
            </Link>
          </div>
        )}

        {/* Hero */}
        <div className="p-8 rounded-[16px] mb-6" style={{ background: "#111111", border: "1px solid #262626" }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="text-xs mb-2" style={{ color: "#71717A" }}>Potential monthly savings</div>
              <div className="savings-hero">${monthly.toLocaleString()}</div>
              <div className="text-base mt-1 font-mono" style={{ color: "#A1A1AA" }}>
                ${annual.toLocaleString()}/year
              </div>
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{ background: tierConfig.bg, color: tierConfig.color, border: `1px solid ${tierConfig.border}` }}>
              {tierConfig.label}
            </span>
          </div>
        </div>

        {/* Tool breakdown */}
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#FAFAFA" }}>Tools audited</h2>
        <div className="space-y-2 mb-10" role="list" aria-label="Audited tools">
          {tools.map((tool) => {
            const config = REC_CONFIG[tool.recommendation as keyof typeof REC_CONFIG] ?? REC_CONFIG.optimize;
            const Icon = config.icon;
            return (
              <div key={tool.toolId} role="listitem"
                className="p-4 rounded-[12px] flex items-center justify-between gap-4"
                style={{ background: "#111111", border: "1px solid #262626" }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={15} style={{ color: config.color }} aria-label={config.label} />
                  <div>
                    <span className="text-sm font-medium" style={{ color: "#FAFAFA" }}>{tool.toolDisplayName}</span>
                    <div className="text-xs" style={{ color: "#71717A" }}>{tool.recommendedAction.split("—")[0]?.trim()}</div>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                  style={{ background: `${config.color}18`, color: config.color, border: `1px solid ${config.color}30` }}>
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-[16px]" style={{ background: "rgb(16 185 129 / 0.04)", border: "1px solid rgb(16 185 129 / 0.15)" }}>
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#FAFAFA" }}>Audit your own AI spend →</h3>
          <p className="text-sm mb-6" style={{ color: "#A1A1AA" }}>Free, no login. Results in under 2 minutes.</p>
          <Link href="/audit" id="share-page-cta"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[8px] font-semibold"
            style={{ background: "#10B981", color: "#fff" }}>
            Start my free audit <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
