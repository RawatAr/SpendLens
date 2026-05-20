/**
 * Store Audit — Round 2 Server Action
 *
 * Persists a completed audit to stored_audits table with:
 * - The user's email
 * - The raw AuditInput (so we can re-run with future pricing)
 * - The AggregateAuditResult snapshot (so we can diff later)
 * - A snapshot + hash of the current pricing data
 *
 * Called immediately after runAudit() succeeds on the client,
 * before showing results to the user.
 */

"use server";

import { db } from "@/db";
import { storedAudits } from "@/db/schema";
import { getPricingSnapshot, hashPricingSnapshot } from "@/lib/pricing-snapshot";
import type { AuditInput, AggregateAuditResult } from "@/types/audit";

export interface StoreAuditInput {
  auditId: string;
  userEmail: string;
  inputStack: AuditInput;
  outputResult: AggregateAuditResult;
}

export interface StoreAuditResult {
  success: boolean;
  error?: string;
}

export async function storeAudit(input: StoreAuditInput): Promise<StoreAuditResult> {
  // Skip if DB not configured (dev without Supabase)
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("your_")) {
    console.warn("[storeAudit] DATABASE_URL not configured — skipping storage");
    return { success: true };
  }

  try {
    const pricingSnapshot = getPricingSnapshot();
    const pricingHash = hashPricingSnapshot(pricingSnapshot);

    await db
      .insert(storedAudits)
      .values({
        id: input.auditId,
        userEmail: input.userEmail.toLowerCase().trim(),
        inputStack: input.inputStack as unknown as Record<string, unknown>,
        outputResult: input.outputResult as unknown as Record<string, unknown>,
        pricingSnapshot: pricingSnapshot as unknown as Record<string, unknown>[],
        pricingHash,
      })
      .onConflictDoNothing(); // Idempotent — re-submissions don't overwrite

    return { success: true };
  } catch (err) {
    console.error("[storeAudit] DB insert failed:", err);
    // Don't surface DB errors to the user — audit still works without storage
    return { success: false, error: "Storage failed — audit is still valid" };
  }
}
