/**
 * Server Action — Save Audit
 *
 * Persists the completed audit to Supabase and returns a unique nanoid
 * for the shareable URL. Falls back to a local nanoid if DB is unavailable.
 */

"use server";

import { nanoid } from "nanoid";
import { db } from "@/db";
import { audits } from "@/db/schema";
import type { AggregateAuditResult } from "@/types/audit";

export async function saveAudit(
  auditResult: AggregateAuditResult
): Promise<{ auditId: string }> {
  const auditId = nanoid(10); // e.g. "V1StGXR8_Z"

  // Only persist if DB is configured
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("your_")) {
    try {
      await db.insert(audits).values({
        id: auditId,
        toolsSnapshot: auditResult.tools,
        savingsTier: auditResult.savingsTier,
        totalMonthlySavings: String(auditResult.totalMonthlySavings),
        totalAnnualSavings: String(auditResult.totalAnnualSavings),
        teamSize: String(auditResult.teamSize),
        useCase: auditResult.useCase,
      });
    } catch (err) {
      console.error("[saveAudit] DB insert failed:", err);
      // Return auditId anyway — share URL still works client-side
    }
  }

  return { auditId };
}
