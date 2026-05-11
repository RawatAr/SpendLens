/**
 * Anthropic API Client — AI Summary Generation
 *
 * Generates a ~100-word personalized audit summary.
 * Falls back to template-based summary on any failure.
 *
 * Model: claude-sonnet-4-20250514
 * Temperature: 0.3 (deterministic, business tone)
 * Max tokens: 250
 */

import Anthropic from "@anthropic-ai/sdk";
import type { AggregateAuditResult } from "@/types/audit";
import { generateFallbackSummary } from "./fallback-summary";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateAuditSummary(
  auditResult: AggregateAuditResult
): Promise<string> {
  try {
    const prompt = buildPrompt(auditResult);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 250,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return generateFallbackSummary(auditResult);
    }

    return content.text.trim();
  } catch (error) {
    // Silently fall back — never show an error to the user
    console.error("[SpendLens] Anthropic API error:", error);
    return generateFallbackSummary(auditResult);
  }
}

function buildPrompt(audit: AggregateAuditResult): string {
  const topSavings = [...audit.tools]
    .sort((a, b) => b.monthlySavings - a.monthlySavings)
    .slice(0, 3);

  const auditSummary = {
    totalMonthlyCurrent: audit.totalMonthlyCurrent,
    totalMonthlySavings: audit.totalMonthlySavings,
    totalAnnualSavings: audit.totalAnnualSavings,
    savingsTier: audit.savingsTier,
    teamSize: audit.teamSize,
    useCase: audit.useCase,
    topRecommendations: topSavings.map((t) => ({
      tool: t.toolDisplayName,
      action: t.recommendation,
      savings: t.monthlySavings,
      reason: t.recommendedAction,
    })),
  };

  return `You are an AI spend analyst. Given this audit data for a ${audit.teamSize}-person team focused on ${audit.useCase} tasks:

${JSON.stringify(auditSummary, null, 2)}

Write a ~100-word summary for the user explaining their key overspend areas, the top 1-2 recommendations, and the total annual savings opportunity.

Rules:
- Tone: direct, non-salesy, like a trusted CFO friend giving honest advice
- Start with "Your team is spending..." or "Based on your stack..."  
- Include the specific dollar amounts from the data
- End with the total annual savings opportunity
- Output plain text only — no markdown, no bullet points, no headers
- Exactly 80-120 words`;
}
