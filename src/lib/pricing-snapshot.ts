/**
 * Pricing Snapshot — Round 2
 *
 * Utilities to capture a deterministic snapshot of the current pricing data
 * and hash it for change detection. Pure functions — no side effects.
 */

import { createHash } from "crypto";
import { TOOLS } from "@/data/tools";
import type { ToolDefinition } from "@/types/audit";

/**
 * Returns the current TOOLS array as a plain JSON-serialisable object.
 * This is what gets stored with each audit as "the pricing used".
 */
export function getPricingSnapshot(): ToolDefinition[] {
  return TOOLS;
}

/**
 * Produces a stable SHA-256 hash of the pricing data.
 * Used to quickly detect whether pricing has changed since an audit was run.
 *
 * Stability guarantee: JSON.stringify on a fixed array gives the same string
 * every time as long as the array contents and key order are unchanged.
 * TOOLS is a static import — it won't mutate at runtime.
 */
export function hashPricingSnapshot(snapshot: ToolDefinition[]): string {
  const serialised = JSON.stringify(snapshot);
  return createHash("sha256").update(serialised).digest("hex");
}

/**
 * Returns the hash of the *current* live pricing.
 * Compare this against the stored hash to quickly detect changes.
 */
export function getCurrentPricingHash(): string {
  return hashPricingSnapshot(getPricingSnapshot());
}

/**
 * Computes a human-readable diff between two pricing snapshots.
 * Returns a list of change descriptions for use in notification emails.
 */
export interface PricingDiff {
  toolId: string;
  toolName: string;
  planId: string;
  fieldChanged: string;
  oldValue: string;
  newValue: string;
  description: string;
}

export function diffPricingSnapshots(
  oldSnapshot: ToolDefinition[],
  newSnapshot: ToolDefinition[]
): PricingDiff[] {
  const diffs: PricingDiff[] = [];

  const oldMap = new Map(oldSnapshot.map((t) => [t.id, t]));
  const newMap = new Map(newSnapshot.map((t) => [t.id, t]));

  // Check tools that exist in new snapshot
  for (const [toolId, newTool] of newMap) {
    const oldTool = oldMap.get(toolId);

    if (!oldTool) {
      // Entirely new tool added
      diffs.push({
        toolId,
        toolName: newTool.name,
        planId: "*",
        fieldChanged: "tool_added",
        oldValue: "",
        newValue: newTool.name,
        description: `New tool added: ${newTool.name}`,
      });
      continue;
    }

    const oldPlanMap = new Map(oldTool.plans.map((p) => [p.id, p]));
    const newPlanMap = new Map(newTool.plans.map((p) => [p.id, p]));

    // Check plans in new tool
    for (const [planId, newPlan] of newPlanMap) {
      const oldPlan = oldPlanMap.get(planId);

      if (!oldPlan) {
        diffs.push({
          toolId,
          toolName: newTool.name,
          planId,
          fieldChanged: "plan_added",
          oldValue: "",
          newValue: String(newPlan.pricePerSeat),
          description: `${newTool.name}: New plan "${newPlan.name}" added at $${newPlan.pricePerSeat}/seat/month`,
        });
        continue;
      }

      // Check price change
      if (oldPlan.pricePerSeat !== newPlan.pricePerSeat) {
        diffs.push({
          toolId,
          toolName: newTool.name,
          planId,
          fieldChanged: "pricePerSeat",
          oldValue: String(oldPlan.pricePerSeat),
          newValue: String(newPlan.pricePerSeat),
          description: `${newTool.name} ${newPlan.name}: price changed from $${oldPlan.pricePerSeat} → $${newPlan.pricePerSeat}/seat/month`,
        });
      }

      // Check annual discount change
      if ((oldPlan.annualDiscountPct ?? 0) !== (newPlan.annualDiscountPct ?? 0)) {
        diffs.push({
          toolId,
          toolName: newTool.name,
          planId,
          fieldChanged: "annualDiscountPct",
          oldValue: String(oldPlan.annualDiscountPct ?? 0),
          newValue: String(newPlan.annualDiscountPct ?? 0),
          description: `${newTool.name} ${newPlan.name}: annual discount changed from ${oldPlan.annualDiscountPct ?? 0}% → ${newPlan.annualDiscountPct ?? 0}%`,
        });
      }
    }

    // Check for removed plans
    for (const [planId, oldPlan] of oldPlanMap) {
      if (!newPlanMap.has(planId)) {
        diffs.push({
          toolId,
          toolName: newTool.name,
          planId,
          fieldChanged: "plan_removed",
          oldValue: String(oldPlan.pricePerSeat),
          newValue: "",
          description: `${newTool.name}: Plan "${oldPlan.name}" removed`,
        });
      }
    }
  }

  // Check for removed tools
  for (const [toolId, oldTool] of oldMap) {
    if (!newMap.has(toolId)) {
      diffs.push({
        toolId,
        toolName: oldTool.name,
        planId: "*",
        fieldChanged: "tool_removed",
        oldValue: oldTool.name,
        newValue: "",
        description: `Tool removed: ${oldTool.name}`,
      });
    }
  }

  return diffs;
}
