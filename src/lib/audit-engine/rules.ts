/**
 * Audit Engine — Plan Fit Check Rules
 *
 * Evaluates whether a user's current plan is appropriate for their
 * seat count and use case. Returns a downgrade recommendation if
 * a cheaper plan from the same vendor is sufficient.
 */

import type { ToolInput, ToolAuditResult, UseCaseType } from "@/types/audit";
import { getToolByName } from "@/data/tools";

interface PlanFitResult {
  recommendation: ToolAuditResult["recommendation"];
  recommendedAction: string;
  monthlySavings: number;
  confidence: ToolAuditResult["confidence"];
}

export function checkPlanFit(
  input: ToolInput,
  useCase: UseCaseType,
  teamSize: number
): PlanFitResult | null {
  const toolDef = getToolByName(input.tool);
  if (!toolDef) return null;

  const currentPlan = toolDef.plans.find((p) => p.id === input.plan);
  if (!currentPlan || currentPlan.isUsageBased) return null;

  // ── Cursor-specific rules ────────────────────────────────────────────────────
  if (input.tool === "cursor") {
    // Business plan → downgrade to Pro for teams that don't need enterprise admin controls
    // Business adds SSO, audit logs, and admin policy controls — rarely needed unless org > 50
    if (
      input.plan === "business"
    ) {
      const proPlan = toolDef.plans.find((p) => p.id === "pro")!;
      const savings = (currentPlan.pricePerSeat - proPlan.pricePerSeat) * input.seats;
      if (savings > 0) {
        return {
          recommendation: "downgrade",
          recommendedAction: `Downgrade to Cursor Pro — Business adds SSO and admin policies that are rarely cost-justified for ${input.seats} developer${input.seats > 1 ? "s" : ""}. Pro at $${proPlan.pricePerSeat}/seat delivers identical AI features.`,
          monthlySavings: savings,
          confidence: "high",
        };
      }
    }
    // Hobby users entering $0 spend — keep
    if (input.plan === "hobby") return null;
  }

  // ── GitHub Copilot-specific rules ────────────────────────────────────────────
  if (input.tool === "github-copilot") {
    // Business at 1 seat → recommend Individual
    if (input.plan === "business" && input.seats <= 2) {
      const individualPlan = toolDef.plans.find((p) => p.id === "individual")!;
      const savings =
        (currentPlan.pricePerSeat - individualPlan.pricePerSeat) * input.seats;
      if (savings > 0) {
        return {
          recommendation: "downgrade",
          recommendedAction: `Downgrade to Copilot Individual — Business plan adds org-level policy controls that aren't needed for ${input.seats} developer${input.seats > 1 ? "s" : ""}. Save $${savings}/month.`,
          monthlySavings: savings,
          confidence: "high",
        };
      }
    }
    // Enterprise at <10 seats → recommend Business
    if (input.plan === "enterprise" && input.seats < 10) {
      const businessPlan = toolDef.plans.find((p) => p.id === "business")!;
      const savings =
        (currentPlan.pricePerSeat - businessPlan.pricePerSeat) * input.seats;
      if (savings > 0) {
        return {
          recommendation: "downgrade",
          recommendedAction: `Downgrade to Copilot Business — Enterprise adds SAML SSO and advanced security features not needed at ${input.seats} seats. Business at $${businessPlan.pricePerSeat}/seat covers your needs.`,
          monthlySavings: savings,
          confidence: "medium",
        };
      }
    }
  }

  // ── Claude-specific rules ────────────────────────────────────────────────────
  if (input.tool === "claude") {
    // Team plan for <5 people total → recommend Pro (individual)
    // Team tier has a 5-seat minimum. If team is smaller, Individual Pro is better.
    if (input.plan === "team" && teamSize < 5) {
      const proPlan = toolDef.plans.find((p) => p.id === "pro")!;
      const savings =
        input.monthlySpend - proPlan.pricePerSeat * teamSize;
      if (savings > 0) {
        return {
          recommendation: "downgrade",
          recommendedAction: `Switch to Claude Pro for each user individually — Team plan requires a minimum of 5 seats ($${currentPlan.pricePerSeat}/seat). For your team of ${teamSize}, individual Pro seats at $${proPlan.pricePerSeat}/seat will save you $${savings}/month.`,
          monthlySavings: savings,
          confidence: "high",
        };
      }
    }
    // Max plan for writing/research only → Pro is sufficient
    if (
      input.plan === "max" &&
      (useCase === "writing" || useCase === "research")
    ) {
      const proPlan = toolDef.plans.find((p) => p.id === "pro")!;
      const savings =
        (currentPlan.pricePerSeat - proPlan.pricePerSeat) * input.seats;
      if (savings > 0) {
        return {
          recommendation: "downgrade",
          recommendedAction: `Downgrade to Claude Pro — Max plan's extended context window and compute priority are designed for heavy coding/data workloads. For ${useCase} tasks, Pro is fully sufficient at $${proPlan.pricePerSeat}/seat.`,
          monthlySavings: savings,
          confidence: "medium",
        };
      }
    }
  }

  // ── ChatGPT-specific rules ───────────────────────────────────────────────────
  if (input.tool === "chatgpt") {
    // Team at ≤3 seats for research/writing → Plus is enough
    if (
      input.plan === "team" &&
      input.seats <= 3 &&
      (useCase === "writing" || useCase === "research")
    ) {
      const plusPlan = toolDef.plans.find((p) => p.id === "plus")!;
      const savings =
        input.monthlySpend - plusPlan.pricePerSeat * input.seats;
      if (savings > 0) {
        return {
          recommendation: "downgrade",
          recommendedAction: `Switch ${input.seats} users to ChatGPT Plus instead of Team — Team adds workspace admin features your small group doesn't need. Plus at $${plusPlan.pricePerSeat}/seat saves $${savings}/month.`,
          monthlySavings: savings,
          confidence: "high",
        };
      }
    }
    // Pro plan at $200/seat is only justified for extremely heavy users
    if (input.plan === "pro" && input.seats > 1) {
      const plusPlan = toolDef.plans.find((p) => p.id === "plus")!;
      const savings =
        (currentPlan.pricePerSeat - plusPlan.pricePerSeat) * (input.seats - 1);
      if (savings > 0) {
        return {
          recommendation: "optimize",
          recommendedAction: `Consider keeping ChatGPT Pro for your 1 heaviest user and downgrading the rest to Plus ($${plusPlan.pricePerSeat}/seat). Pro's o1 Pro mode is rarely needed by every team member.`,
          monthlySavings: savings,
          confidence: "medium",
        };
      }
    }
  }

  // ── Gemini-specific rules ────────────────────────────────────────────────────
  if (input.tool === "gemini") {
    // Business (Workspace) for coding → Cursor or Copilot is better value
    if (input.plan === "business" && useCase === "coding") {
      return {
        recommendation: "switch",
        recommendedAction: `Gemini's Workspace plan isn't optimized for coding workflows. Consider switching to Cursor Pro ($20/seat) or GitHub Copilot Business ($19/seat) for dedicated code completion and AI pair programming.`,
        monthlySavings: Math.max(
          0,
          input.monthlySpend - 20 * input.seats
        ),
        confidence: "medium",
      };
    }
  }

  // ── v0-specific rules ────────────────────────────────────────────────────────
  if (input.tool === "v0") {
    // Team plan for non-coding use case
    if (input.plan === "team" && useCase !== "coding") {
      const premiumPlan = toolDef.plans.find((p) => p.id === "premium")!;
      const savings =
        input.monthlySpend - premiumPlan.pricePerSeat * input.seats;
      if (savings > 0) {
        return {
          recommendation: "downgrade",
          recommendedAction: `v0 is primarily a UI generation tool. For ${useCase} work, downgrade to individual Premium plans ($${premiumPlan.pricePerSeat}/seat) instead of the Team tier.`,
          monthlySavings: savings,
          confidence: "low",
        };
      }
    }
  }

  // No actionable plan fit issue found
  return null;
}

/**
 * Check if switching to annual billing saves ≥ 10%
 */
export function checkAnnualBillingOpportunity(
  input: ToolInput
): number | undefined {
  const toolDef = getToolByName(input.tool);
  if (!toolDef) return undefined;

  const plan = toolDef.plans.find((p) => p.id === input.plan);
  if (!plan || !plan.annualDiscountPct || plan.annualDiscountPct < 10)
    return undefined;

  const annualSavings =
    input.monthlySpend * 12 * (plan.annualDiscountPct / 100);
  return Math.round(annualSavings / 12); // monthly equivalent savings
}
