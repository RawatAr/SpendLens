/**
 * Fallback Summary Generator
 *
 * Template-based ~100-word summary built from audit output.
 * Used when the Anthropic API fails (timeout, 429, 5xx).
 * Never shows an error or blank — always renders something useful.
 */

import type { AggregateAuditResult } from "@/types/audit";

export function generateFallbackSummary(audit: AggregateAuditResult): string {
  const { totalMonthlyCurrent, totalMonthlySavings, totalAnnualSavings, savingsTier, teamSize, useCase } = audit;

  const topAction = [...audit.tools]
    .filter((t) => t.monthlySavings > 0)
    .sort((a, b) => b.monthlySavings - a.monthlySavings)[0];

  if (savingsTier === "optimal") {
    return `Based on our structural analysis of your ${teamSize}-person team's ${useCase} stack, your current spend of $${totalMonthlyCurrent}/month is highly efficient. Your tool selection and plan tiers perfectly align with market best practices for your specific scale. No immediate corrective action is required, though we recommend a quarterly re-validation as pricing models in the AI sector remain volatile.`;
  }

  if (!topAction) {
    return `Your team of ${teamSize} is currently spending $${totalMonthlyCurrent}/month on AI tools. Our scan indicates that while your core tools are reasonably optimized for ${useCase} workflows, there are secondary margin opportunities in seat consolidation and tier right-sizing. Total annual capture potential is estimated at $${totalAnnualSavings.toLocaleString()} if fully optimized.`;
  }

  const tierDesc =
    savingsTier === "high"
      ? "critical"
      : savingsTier === "medium"
      ? "significant"
      : "marginal";

  return `Analysis complete: We identified ${tierDesc} overspend in your ${useCase} stack. Your team of ${teamSize} is currently burning $${totalMonthlyCurrent}/month, with a verified recovery path of $${totalMonthlySavings}/month. The primary inefficiency is ${topAction.toolDisplayName} (${topAction.currentPlan} tier), where a ${topAction.recommendation} protocol could capture immediate value. Implementing these optimizations will yield $${totalAnnualSavings.toLocaleString()} in annual capital recovery.`;
}
