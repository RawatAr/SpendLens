/**
 * Audit Engine — Cross-Tool Alternatives
 *
 * Checks if there's a substantially cheaper tool with comparable
 * capability for the stated use case.
 */

import type { ToolInput, UseCaseType } from "@/types/audit";

interface AlternativeResult {
  recommendation: "switch" | "optimize";
  recommendedAction: string;
  monthlySavings: number;
  confidence: "high" | "medium" | "low";
}

export function checkCheaperAlternative(
  input: ToolInput,
  useCase: UseCaseType,
  _teamSize: number
): AlternativeResult | null {
  // ── Cursor for non-coding teams ──────────────────────────────────────────────
  if (input.tool === "cursor" && input.plan !== "hobby") {
    if (useCase === "writing" || useCase === "research") {
      const claudeProCost = 20 * input.seats;
      const savings = input.monthlySpend - claudeProCost;
      if (savings > 50) {
        return {
          recommendation: "switch",
          recommendedAction: `Your team's primary use case is ${useCase}, but Cursor is a coding-focused IDE. Claude Pro ($20/seat) covers ${useCase} tasks at roughly half the cost, saving ~$${savings}/month.`,
          monthlySavings: savings,
          confidence: "medium",
        };
      }
    }
  }

  // ── GitHub Copilot Enterprise for small teams ────────────────────────────────
  if (input.tool === "github-copilot" && input.plan === "enterprise") {
    if (input.seats < 15) {
      const cursorProCost = 20 * input.seats;
      const savings = input.monthlySpend - cursorProCost;
      if (savings > 0) {
        return {
          recommendation: "switch",
          recommendedAction: `Copilot Enterprise is priced for large orgs needing custom model fine-tuning and GitHub Advanced Security. At ${input.seats} seats, Cursor Business ($40/seat) or Cursor Pro ($20/seat) likely deliver better ROI per developer.`,
          monthlySavings: savings,
          confidence: "medium",
        };
      }
    }
  }

  // ── ChatGPT Team/Pro for coding use case ─────────────────────────────────────
  if (input.tool === "chatgpt" && useCase === "coding") {
    if (input.plan === "team" || input.plan === "pro") {
      const cursorProCost = 20 * input.seats;
      const savings = input.monthlySpend - cursorProCost;
      if (savings > 30) {
        return {
          recommendation: "switch",
          recommendedAction: `For coding workflows, Cursor Pro ($20/seat) provides deeply integrated IDE assistance, autocomplete, and code generation — purpose-built for developers. ChatGPT's chat interface adds friction for coding tasks.`,
          monthlySavings: savings,
          confidence: "medium",
        };
      }
    }
  }

  // ── Gemini Ultra/Advanced for coding ────────────────────────────────────────
  if (input.tool === "gemini" && useCase === "coding") {
    if (input.plan === "advanced" || input.plan === "business") {
      const copilotCost = 10 * input.seats;
      const savings = input.monthlySpend - copilotCost;
      if (savings > 20) {
        return {
          recommendation: "switch",
          recommendedAction: `For coding, GitHub Copilot Individual ($10/seat) or Cursor Pro ($20/seat) integrate directly into your IDE and are purpose-built for code generation. Gemini Advanced is a general assistant.`,
          monthlySavings: savings,
          confidence: "medium",
        };
      }
    }
  }

  // ── v0 Team for non-UI/non-coding teams ─────────────────────────────────────
  if (input.tool === "v0" && (useCase === "writing" || useCase === "research" || useCase === "data")) {
    const claudeProCost = 20 * input.seats;
    const savings = input.monthlySpend - claudeProCost;
    if (savings > 30) {
      return {
        recommendation: "switch",
        recommendedAction: `v0 is specialized for UI/component generation. For ${useCase} tasks, Claude Pro ($20/seat) or ChatGPT Plus ($20/seat) offer better general-purpose AI capability at a lower cost.`,
        monthlySavings: savings,
        confidence: "low",
      };
    }
  }

  // ── Claude Max for coding ────────────────────────────────────────────────────
  if (input.tool === "claude" && input.plan === "max" && useCase === "coding") {
    const cursorBizCost = 40 * input.seats;
    const claudeProCost = 20 * input.seats;
    const savings = input.monthlySpend - cursorBizCost - claudeProCost;
    if (savings > 50) {
      return {
        recommendation: "optimize",
        recommendedAction: `For coding at ${input.seats} seats, consider Cursor Pro ($20/seat) for IDE integration + Claude Pro ($20/seat) for complex reasoning — total $${cursorBizCost + claudeProCost}/mo vs your current $${input.monthlySpend}/mo.`,
        monthlySavings: savings,
        confidence: "medium",
      } as AlternativeResult;
    }
  }

  return null;
}
