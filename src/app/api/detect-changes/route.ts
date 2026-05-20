/**
 * POST /api/detect-changes
 *
 * Manual trigger for pricing-change detection + email dispatch.
 * Also called by GitHub Actions on a daily cron schedule.
 *
 * Auth: Bearer token via CRON_SECRET environment variable.
 * Without auth, anyone could spam notification emails — always set CRON_SECRET.
 *
 * Body (optional): { dryRun: true } — detect but don't send emails or update DB.
 *
 * Response:
 * {
 *   scanned: number,        — audits checked
 *   flagged: number,        — audits with changed recommendations
 *   emailsSent: number,     — unique users emailed
 *   errors: string[],       — any non-fatal errors
 *   pricingChanges: PricingDiff[]
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { detectPricingChanges } from "@/lib/detect-changes";
import { sendReauditEmail } from "@/lib/reaudit-email";
import { db } from "@/db";
import { storedAudits } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Vercel: allow up to 60s for detection run

export async function POST(req: NextRequest) {
  // ── Auth check ────────────────────────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (token !== cronSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ── Parse body ─────────────────────────────────────────────────────────────
  let dryRun = false;
  try {
    const body = await req.json().catch(() => ({}));
    dryRun = body?.dryRun === true;
  } catch {
    // Ignore parse errors — proceed with defaults
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://spend-lens-rho.vercel.app";

  // ── Run detection ──────────────────────────────────────────────────────────
  let detectionResult;
  try {
    detectionResult = await detectPricingChanges(appUrl);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[detect-changes] Detection failed:", msg);
    return NextResponse.json({ error: "Detection failed", detail: msg }, { status: 500 });
  }

  const { scanned, flagged, affectedByEmail, pricingDiffs } = detectionResult;

  if (flagged === 0) {
    return NextResponse.json({
      scanned,
      flagged: 0,
      emailsSent: 0,
      errors: [],
      pricingChanges: [],
      message: "No changes detected — all audits are current",
    });
  }

  // ── Send emails (unless dry run) ───────────────────────────────────────────
  const errors: string[] = [];
  let emailsSent = 0;
  const emailedAuditIds: string[] = [];

  if (!dryRun) {
    for (const [userEmail, audits] of affectedByEmail) {
      const result = await sendReauditEmail(userEmail, audits, appUrl);
      if (result.success) {
        emailsSent++;
        emailedAuditIds.push(...audits.map((a) => a.auditId));
      } else {
        errors.push(`Failed to email ${userEmail}: ${result.error}`);
      }
    }

    // Mark successfully-emailed audits with timestamp
    if (emailedAuditIds.length > 0) {
      await db
        .update(storedAudits)
        .set({ reauditEmailSentAt: new Date() })
        .where(inArray(storedAudits.id, emailedAuditIds));
    }
  }

  return NextResponse.json({
    scanned,
    flagged,
    emailsSent: dryRun ? 0 : emailsSent,
    dryRun,
    errors,
    pricingChanges: pricingDiffs,
    affectedUsers: dryRun
      ? Array.from(affectedByEmail.keys())
      : undefined,
  });
}

// ── GET — Health check / status ─────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "POST /api/detect-changes",
    auth: "Bearer CRON_SECRET",
    body: { dryRun: "boolean (optional)" },
  });
}
