/**
 * PRICING_DATA — Verified tool pricing as of 2026-05-07
 *
 * Every number here must be traceable to an official source.
 * See PRICING_DATA.md for URLs and verification dates.
 */

import type { ToolDefinition } from "@/types/audit";

export const TOOLS: ToolDefinition[] = [
  // ── Cursor ──────────────────────────────────────────────────────────────────
  // Source: https://www.cursor.com/pricing (verified 2026-05-07)
  {
    id: "cursor",
    name: "Cursor",
    category: "coding",
    credexAvailable: true,
    plans: [
      {
        id: "hobby",
        name: "Hobby",
        pricePerSeat: 0,
        annualDiscountPct: 0,
        bestFor: ["coding"],
      },
      {
        id: "pro",
        name: "Pro",
        pricePerSeat: 20,
        annualDiscountPct: 0,
        bestFor: ["coding"],
      },
      {
        id: "business",
        name: "Business",
        pricePerSeat: 40,
        annualDiscountPct: 0,
        bestFor: ["coding"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricePerSeat: 0, // negotiated — user enters actual spend
        isUsageBased: true,
        bestFor: ["coding"],
      },
    ],
  },

  // ── GitHub Copilot ───────────────────────────────────────────────────────────
  // Source: https://github.com/features/copilot#pricing (verified 2026-05-07)
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "coding",
    credexAvailable: false,
    plans: [
      {
        id: "individual",
        name: "Individual",
        pricePerSeat: 10,
        annualDiscountPct: 16.7, // $100/year vs $120/year
        bestFor: ["coding"],
      },
      {
        id: "business",
        name: "Business",
        pricePerSeat: 19,
        annualDiscountPct: 0,
        bestFor: ["coding"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricePerSeat: 39,
        annualDiscountPct: 0,
        bestFor: ["coding"],
      },
    ],
  },

  // ── Claude (Anthropic) ───────────────────────────────────────────────────────
  // Source: https://www.anthropic.com/pricing (verified 2026-05-07)
  {
    id: "claude",
    name: "Claude",
    category: "general",
    credexAvailable: true,
    plans: [
      {
        id: "free",
        name: "Free",
        pricePerSeat: 0,
        bestFor: ["writing", "research"],
      },
      {
        id: "pro",
        name: "Pro",
        pricePerSeat: 20,
        annualDiscountPct: 0,
        bestFor: ["writing", "research", "mixed"],
      },
      {
        id: "max",
        name: "Max",
        pricePerSeat: 100,
        annualDiscountPct: 0,
        bestFor: ["writing", "research", "data"],
      },
      {
        id: "team",
        name: "Team",
        pricePerSeat: 25,
        minSeats: 5,
        annualDiscountPct: 0,
        bestFor: ["writing", "mixed"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricePerSeat: 0,
        isUsageBased: true,
        bestFor: ["mixed"],
      },
    ],
  },

  // ── ChatGPT (OpenAI) ─────────────────────────────────────────────────────────
  // Source: https://openai.com/chatgpt/pricing (verified 2026-05-07)
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "general",
    credexAvailable: true,
    plans: [
      {
        id: "free",
        name: "Free",
        pricePerSeat: 0,
        bestFor: ["writing", "research"],
      },
      {
        id: "plus",
        name: "Plus",
        pricePerSeat: 20,
        annualDiscountPct: 0,
        bestFor: ["writing", "research", "mixed"],
      },
      {
        id: "pro",
        name: "Pro",
        pricePerSeat: 200,
        annualDiscountPct: 0,
        bestFor: ["research", "data"],
      },
      {
        id: "team",
        name: "Team",
        pricePerSeat: 30,
        minSeats: 2,
        annualDiscountPct: 16.7, // $25/seat/mo billed annually
        bestFor: ["writing", "mixed"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricePerSeat: 0,
        isUsageBased: true,
        bestFor: ["mixed"],
      },
    ],
  },

  // ── Anthropic API Direct ─────────────────────────────────────────────────────
  // Source: https://www.anthropic.com/api (verified 2026-05-07)
  {
    id: "anthropic-api",
    name: "Anthropic API",
    category: "api",
    credexAvailable: true,
    plans: [
      {
        id: "usage",
        name: "Usage-based",
        pricePerSeat: 0,
        isUsageBased: true,
        bestFor: ["coding", "writing", "data", "research", "mixed"],
      },
    ],
  },

  // ── OpenAI API Direct ────────────────────────────────────────────────────────
  // Source: https://openai.com/api/pricing (verified 2026-05-07)
  {
    id: "openai-api",
    name: "OpenAI API",
    category: "api",
    credexAvailable: true,
    plans: [
      {
        id: "usage",
        name: "Usage-based",
        pricePerSeat: 0,
        isUsageBased: true,
        bestFor: ["coding", "writing", "data", "research", "mixed"],
      },
    ],
  },

  // ── Gemini (Google) ──────────────────────────────────────────────────────────
  // Source: https://one.google.com/about/plans (verified 2026-05-07)
  {
    id: "gemini",
    name: "Gemini",
    category: "general",
    credexAvailable: false,
    plans: [
      {
        id: "free",
        name: "Free",
        pricePerSeat: 0,
        bestFor: ["writing", "research"],
      },
      {
        id: "advanced",
        name: "Advanced (Google One AI)",
        pricePerSeat: 19.99,
        annualDiscountPct: 0,
        bestFor: ["writing", "research", "mixed"],
      },
      {
        id: "business",
        name: "Business (Workspace)",
        pricePerSeat: 30,
        bestFor: ["mixed"],
      },
      {
        id: "api",
        name: "API (Gemini API)",
        pricePerSeat: 0,
        isUsageBased: true,
        bestFor: ["coding", "data", "mixed"],
      },
    ],
  },

  // ── v0 (Vercel) ──────────────────────────────────────────────────────────────
  // Source: https://v0.dev/pricing (verified 2026-05-07)
  {
    id: "v0",
    name: "v0",
    category: "coding",
    credexAvailable: false,
    plans: [
      {
        id: "free",
        name: "Free",
        pricePerSeat: 0,
        bestFor: ["coding"],
      },
      {
        id: "premium",
        name: "Premium",
        pricePerSeat: 20,
        annualDiscountPct: 0,
        bestFor: ["coding"],
      },
      {
        id: "team",
        name: "Team",
        pricePerSeat: 40,
        minSeats: 2,
        bestFor: ["coding"],
      },
    ],
  },

  // ── Windsurf (Codeium) ───────────────────────────────────────────────────────
  // Source: https://codeium.com/windsurf/pricing (verified 2026-05-07)
  {
    id: "windsurf",
    name: "Windsurf",
    category: "coding",
    credexAvailable: false,
    plans: [
      {
        id: "free",
        name: "Free",
        pricePerSeat: 0,
        bestFor: ["coding"],
      },
      {
        id: "pro",
        name: "Pro",
        pricePerSeat: 15,
        annualDiscountPct: 0,
        bestFor: ["coding"],
      },
      {
        id: "teams",
        name: "Teams",
        pricePerSeat: 35,
        minSeats: 2,
        bestFor: ["coding"],
      },
    ],
  },
];

export const TOOL_MAP = new Map(TOOLS.map((t) => [t.id, t]));

export function getToolByName(id: string): ToolDefinition | undefined {
  return TOOL_MAP.get(id as ToolDefinition["id"]);
}

export function getPlanByIds(
  toolId: string,
  planId: string
): import("@/types/audit").PlanDefinition | undefined {
  return TOOL_MAP.get(toolId as ToolDefinition["id"])?.plans.find(
    (p) => p.id === planId
  );
}
