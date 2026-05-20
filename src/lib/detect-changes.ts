/**
 * Detect Changes — Round 2 Core Logic
 *
 * Pure business logic for pricing change detection.
 * Separated from the HTTP route so it can be unit-tested independently.
 *
 * Flow:
 * 1. Compute current pricing hash
 * 2. Fetch all stored audits where pricingHash != currentHash (and not unsubscribed)
 * 3. For each: re-run runAudit() with stored inputStack + current pricing
 * 4. Compare old vs new recommendations
 * 5. Return flagged audits grouped by user email
 */

import { db } from "@/db";
import { storedAudits, pricingChanges } from "@/db/schema";
import { ne, eq, and } from "drizzle-orm";
import { getCurrentPricingHash, getPricingSnapshot, diffPricingSnapshots } from "@/lib/pricing-snapshot";
import { runAudit } from "@/lib/audit-engine";
import type { AuditInput, AggregateAuditResult, ToolAuditResult } from "@/types/audit";
import type { ToolDefinition } from "@/types/audit";

export interface AffectedAudit {
  auditId: string;
  userEmail: string;
  oldResult: AggregateAuditResult;
  newResult: AggregateAuditResult;
  changedTools: ChangedTool[];
  rerunUrl: string;
}

export interface ChangedTool {
  toolDisplayName: string;
  oldRecommendation: string;
  newRecommendation: string;
  oldMonthlySavings: number;
  newMonthlySavings: number;
  oldAction: string;
  newAction: string;
}

export interface DetectionResult {
  scanned: number;
  flagged: number;
  affectedByEmail: Map<string, AffectedAudit[]>;
  pricingDiffs: ReturnType<typeof diffPricingSnapshots>;
}

/**
 * Checks if two tool results have a meaningfully different recommendation.
 * Tolerates ±$1 rounding differences.
 */
function recommendationChanged(oldTool: ToolAuditResult, newTool: ToolAuditResult): boolean {
  if (oldTool.recommendation !== newTool.recommendation) return true;
  if (Math.abs(oldTool.monthlySavings - newTool.monthlySavings) > 1) return true;
  return false;
}

export async function detectPricingChanges(appUrl: string): Promise<DetectionResult> {
  const currentHash = getCurrentPricingHash();
  const currentSnapshot = getPricingSnapshot();

  // Fetch all audits that used a different pricing hash and haven't unsubscribed
  const candidateAudits = await db
    .select()
    .from(storedAudits)
    .where(
      and(
        ne(storedAudits.pricingHash, currentHash),
        eq(storedAudits.unsubscribed, false)
      )
    );

  const affectedByEmail = new Map<string, AffectedAudit[]>();
  let flaggedCount = 0;

  for (const stored of candidateAudits) {
    const inputStack = stored.inputStack as unknown as AuditInput;
    const oldResult = stored.outputResult as unknown as AggregateAuditResult;
    const oldSnapshot = stored.pricingSnapshot as unknown as ToolDefinition[];

    // Re-run audit with current pricing
    let newResult: AggregateAuditResult;
    try {
      newResult = runAudit(inputStack);
    } catch {
      console.warn(`[detectChanges] Failed to re-run audit ${stored.id} — skipping`);
      continue;
    }

    // Compare tool-by-tool
    const changedTools: ChangedTool[] = [];
    for (const oldTool of oldResult.tools) {
      const newTool = newResult.tools.find((t) => t.tool === oldTool.tool);
      if (!newTool) continue;
      if (recommendationChanged(oldTool, newTool)) {
        changedTools.push({
          toolDisplayName: oldTool.toolDisplayName,
          oldRecommendation: oldTool.recommendation,
          newRecommendation: newTool.recommendation,
          oldMonthlySavings: oldTool.monthlySavings,
          newMonthlySavings: newTool.monthlySavings,
          oldAction: oldTool.recommendedAction,
          newAction: newTool.recommendedAction,
        });
      }
    }

    if (changedTools.length === 0) {
      // Hash changed but recommendations didn't — update hash silently
      await db
        .update(storedAudits)
        .set({ pricingHash: currentHash })
        .where(eq(storedAudits.id, stored.id));
      continue;
    }

    flaggedCount++;

    // Mark as flagged
    await db
      .update(storedAudits)
      .set({ flaggedForReaudit: true })
      .where(eq(storedAudits.id, stored.id));

    const affected: AffectedAudit = {
      auditId: stored.id,
      userEmail: stored.userEmail,
      oldResult,
      newResult,
      changedTools,
      rerunUrl: `${appUrl}/audit/diff/${stored.id}`,
    };

    const existing = affectedByEmail.get(stored.userEmail) ?? [];
    existing.push(affected);
    affectedByEmail.set(stored.userEmail, existing);
  }

  // Log pricing diffs to pricing_changes table if any audits were affected
  let pricingDiffs: ReturnType<typeof diffPricingSnapshots> = [];
  if (flaggedCount > 0) {
    // Use first affected audit's old snapshot to build the diff
    const firstAffected = candidateAudits[0];
    if (firstAffected) {
      const oldSnapshot = firstAffected.pricingSnapshot as unknown as ToolDefinition[];
      pricingDiffs = diffPricingSnapshots(oldSnapshot, currentSnapshot);

      if (pricingDiffs.length > 0) {
        await db.insert(pricingChanges).values(
          pricingDiffs.map((d) => ({
            toolId: d.toolId,
            toolName: d.toolName,
            planId: d.planId,
            fieldChanged: d.fieldChanged,
            oldValue: d.oldValue || null,
            newValue: d.newValue || null,
            description: d.description,
          }))
        );
      }
    }
  }

  return {
    scanned: candidateAudits.length,
    flagged: flaggedCount,
    affectedByEmail,
    pricingDiffs,
  };
}
