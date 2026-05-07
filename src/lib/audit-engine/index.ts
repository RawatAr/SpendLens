/**
 * Audit Engine — Main Orchestrator
 *
 * Composes rules, alternatives, credits, and API optimizer into a single
 * runAudit() function. Synchronous, < 500ms, no external calls.
 */

import { nanoid } from "nanoid";
import type {
  AuditInput,
  AggregateAuditResult,
  ToolAuditResult,
  SavingsTier,
} from "@/types/audit";
import { getToolByName } from "@/data/tools";
import { checkPlanFit, checkAnnualBillingOpportunity } from "./rules";
import { checkCheaperAlternative } from "./alternatives";
import { isCredexAvailable } from "./credits";
import { isApiTool, getApiOptimizationTips } from "./api-optimizer";

function classifySavingsTier(monthlySavings: number): SavingsTier {
  if (monthlySavings >= 500) return "high";
  if (monthlySavings >= 100) return "medium";
  if (monthlySavings > 0) return "low";
  return "optimal";
}

export function runAudit(input: AuditInput): AggregateAuditResult {
  const toolResults: ToolAuditResult[] = input.tools.map((toolInput) => {
    const toolDef = getToolByName(toolInput.tool);
    const toolDisplayName = toolDef?.name ?? toolInput.tool;

    // ── Seat Correction Logic ───────────────────────────────────────────────
    // If the user enters a large spend but leaves seats at 1, infer the seats
    // based on the current plan's price to avoid static calculations.
    let correctedSeats = toolInput.seats;
    const currentPlanDef = toolDef?.plans.find((p) => p.id === toolInput.plan);
    if (
      currentPlanDef && 
      !currentPlanDef.isUsageBased && 
      toolInput.monthlySpend > currentPlanDef.pricePerSeat &&
      toolInput.seats === 1
    ) {
      correctedSeats = Math.ceil(toolInput.monthlySpend / currentPlanDef.pricePerSeat);
    }
    const toolWithCorrectedSeats = { ...toolInput, seats: correctedSeats };

    // ── Handle API / Usage-based tools ────────────────────────────────────────
    if (isApiTool(toolInput.tool)) {
      return {
        toolId: toolInput.id,
        tool: toolInput.tool,
        toolDisplayName,
        currentPlan: toolInput.plan,
        currentMonthlyCost: toolInput.monthlySpend,
        recommendation: "optimize",
        recommendedAction:
          "Usage-based API pricing — optimise how you call the API rather than switching plans. See tips below.",
        monthlySavings: 0,
        annualSavings: 0,
        confidence: "medium",
        credexAvailable: isCredexAvailable(toolInput.tool),
        apiOptimizationTips: getApiOptimizationTips(toolInput.tool),
      };
    }

    // ── Step 1: Check plan fit (same-vendor downgrade) ────────────────────────
    const planFitResult = checkPlanFit(toolWithCorrectedSeats, input.useCase, input.teamSize);

    // ── Step 2: Check cheaper alternative tool ────────────────────────────────
    const alternativeResult = checkCheaperAlternative(
      toolWithCorrectedSeats,
      input.useCase,
      input.teamSize
    );

    // Use the better of the two recommendations (higher savings wins)
    let bestResult = planFitResult;
    if (
      alternativeResult &&
      alternativeResult.monthlySavings > (planFitResult?.monthlySavings ?? 0)
    ) {
      bestResult = alternativeResult;
    }

    // ── Step 3: Annual billing opportunity ────────────────────────────────────
    const annualBillingSavings = checkAnnualBillingOpportunity(toolWithCorrectedSeats);

    if (!bestResult || bestResult.monthlySavings <= 0) {
      // Tool is well-optimised — keep
      return {
        toolId: toolInput.id,
        tool: toolInput.tool,
        toolDisplayName,
        currentPlan: toolInput.plan,
        currentMonthlyCost: toolInput.monthlySpend,
        recommendation: annualBillingSavings ? "optimize" : "keep",
        recommendedAction: annualBillingSavings
          ? `Your plan selection looks good. Consider switching to annual billing to save ~$${annualBillingSavings}/month.`
          : `Your ${toolDisplayName} plan is well-matched to your team size and ${input.useCase} use case.`,
        monthlySavings: annualBillingSavings ?? 0,
        annualSavings: (annualBillingSavings ?? 0) * 12,
        confidence: "high",
        credexAvailable: isCredexAvailable(toolInput.tool),
        annualBillingSavings,
      };
    }

    const monthlySavings = Math.round(Math.max(0, bestResult.monthlySavings));
    const annualSavings = monthlySavings * 12;

    return {
      toolId: toolInput.id,
      tool: toolInput.tool,
      toolDisplayName,
      currentPlan: toolInput.plan,
      currentMonthlyCost: toolInput.monthlySpend,
      recommendation: bestResult.recommendation,
      recommendedAction: bestResult.recommendedAction,
      monthlySavings,
      annualSavings,
      confidence: bestResult.confidence,
      credexAvailable: isCredexAvailable(toolInput.tool),
      annualBillingSavings,
    };
  });

  // ── Aggregate totals ──────────────────────────────────────────────────────
  const totalMonthlyCurrent = toolResults.reduce(
    (sum, t) => sum + t.currentMonthlyCost,
    0
  );
  const totalMonthlySavings = toolResults.reduce(
    (sum, t) => sum + t.monthlySavings,
    0
  );
  const totalMonthlyOptimized = Math.max(
    0,
    totalMonthlyCurrent - totalMonthlySavings
  );
  const totalAnnualSavings = totalMonthlySavings * 12;

  return {
    tools: toolResults,
    totalMonthlyCurrent: Math.round(totalMonthlyCurrent),
    totalMonthlyOptimized: Math.round(totalMonthlyOptimized),
    totalMonthlySavings: Math.round(totalMonthlySavings),
    totalAnnualSavings: Math.round(totalAnnualSavings),
    savingsTier: classifySavingsTier(totalMonthlySavings),
    teamSize: input.teamSize,
    useCase: input.useCase,
    generatedAt: new Date().toISOString(),
  };
}
