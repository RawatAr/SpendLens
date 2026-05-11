/**
 * Audit Engine Tests
 * Run with: npm run test
 *
 * Covers: high-savings, optimal stack, API-only tools,
 * single-seat downgrade, cross-tool switch, annual billing
 */

import { describe, it, expect } from "vitest";
import { runAudit } from "../index";
import type { AuditInput } from "@/types/audit";

// ─── Test 1: High-savings scenario ───────────────────────────────────────────
describe("High-Savings Scenario", () => {
  it("identifies overspend and returns savingsTier = high when savings ≥ $500/month", () => {
    const input: AuditInput = {
      teamSize: 20,
      useCase: "coding",
      tools: [
        {
          id: "t1",
          tool: "cursor",
          plan: "business",
          monthlySpend: 800, // 20 seats × $40 — recommend Pro @ $20 → save $400
          seats: 20,
        },
        {
          id: "t2",
          tool: "github-copilot",
          plan: "enterprise",
          monthlySpend: 780, // 20 seats × $39 — recommend Business @ $19 → save $400
          seats: 20,
        },
        {
          id: "t3",
          tool: "chatgpt",
          plan: "team",
          monthlySpend: 600, // 20 seats × $30
          seats: 20,
        },
      ],
    };

    const result = runAudit(input);

    // cursor saves $400 + copilot saves $400 = $800 total → "high" tier
    expect(result.totalMonthlySavings).toBeGreaterThanOrEqual(500);
    expect(result.savingsTier).toBe("high");
    expect(result.totalAnnualSavings).toBeGreaterThan(6000);
    expect(result.tools).toHaveLength(3);
  });
});

// ─── Test 2: Optimal stack scenario ──────────────────────────────────────────
describe("Optimal Stack Scenario", () => {
  it("returns savingsTier = optimal when stack is already cost-efficient", () => {
    // Cursor Pro + Copilot Business (no annual discount on Business) — perfectly sized for 3-seat coding team
    const input: AuditInput = {
      teamSize: 3,
      useCase: "coding",
      tools: [
        {
          id: "t1",
          tool: "cursor",
          plan: "pro",
          monthlySpend: 60, // 3 × $20 — correctly priced, Pro has no annual discount
          seats: 3,
        },
        {
          id: "t2",
          tool: "github-copilot",
          plan: "business",
          monthlySpend: 57, // 3 × $19 — Business has no annual discount
          seats: 3,
        },
      ],
    };

    const result = runAudit(input);

    expect(result.savingsTier).toBe("optimal");
    expect(result.totalMonthlySavings).toBe(0);
    result.tools.forEach((t) => {
      // Plans are well-matched — no downgrade triggered
      expect(["keep", "optimize"]).toContain(t.recommendation);
    });
  });
});

// ─── Test 3: API-only tools ───────────────────────────────────────────────────
describe("API-Only Tools", () => {
  it("gives optimization tips instead of plan recommendations for API tools", () => {
    const input: AuditInput = {
      teamSize: 5,
      useCase: "data",
      tools: [
        {
          id: "t1",
          tool: "anthropic-api",
          plan: "usage",
          monthlySpend: 800,
          seats: 1,
        },
        {
          id: "t2",
          tool: "openai-api",
          plan: "usage",
          monthlySpend: 600,
          seats: 1,
        },
      ],
    };

    const result = runAudit(input);

    result.tools.forEach((t) => {
      expect(t.recommendation).toBe("optimize");
      expect(t.apiOptimizationTips).toBeDefined();
      expect(t.apiOptimizationTips!.length).toBeGreaterThan(0);
      expect(t.monthlySavings).toBe(0); // API tools don't get direct savings figures
    });

    expect(result.savingsTier).toBe("optimal");
  });
});

// ─── Test 4: Single-seat downgrade ───────────────────────────────────────────
describe("Single-Seat Downgrade", () => {
  it("recommends downgrading GitHub Copilot Business to Individual for 1 seat", () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: "coding",
      tools: [
        {
          id: "t1",
          tool: "github-copilot",
          plan: "business",
          monthlySpend: 19,
          seats: 1,
        },
      ],
    };

    const result = runAudit(input);
    const copilotResult = result.tools[0];

    expect(copilotResult.recommendation).toBe("downgrade");
    expect(copilotResult.monthlySavings).toBeGreaterThan(0);
    expect(copilotResult.monthlySavings).toBe(9); // $19 - $10 = $9
    expect(copilotResult.confidence).toBe("high");
  });
});

// ─── Test 5: Cross-tool switch recommendation ─────────────────────────────────
describe("Cross-Tool Switch Recommendation", () => {
  it("recommends switching from Cursor to Claude Pro for a writing-focused team", () => {
    const input: AuditInput = {
      teamSize: 5,
      useCase: "writing",
      tools: [
        {
          id: "t1",
          tool: "cursor",
          plan: "business", // Business plan for a writing team — clearly mismatched
          monthlySpend: 200, // 5 × $40
          seats: 5,
        },
      ],
    };

    const result = runAudit(input);
    const cursorResult = result.tools[0];

    // Cursor Business for writing → should recommend switch or downgrade
    expect(["switch", "downgrade"]).toContain(cursorResult.recommendation);
    expect(cursorResult.monthlySavings).toBeGreaterThan(0);
  });
});

// ─── Test 6: Claude Team at <5 seats ─────────────────────────────────────────
describe("Claude Team Under-Seat Threshold", () => {
  it("recommends Claude Pro for teams under the Team plan minimum threshold", () => {
    const input: AuditInput = {
      teamSize: 3,
      useCase: "writing",
      tools: [
        {
          id: "t1",
          tool: "claude",
          plan: "team",
          monthlySpend: 75, // 3 × $25
          seats: 3,
        },
      ],
    };

    const result = runAudit(input);
    const claudeResult = result.tools[0];

    expect(claudeResult.recommendation).toBe("downgrade");
    expect(claudeResult.monthlySavings).toBeGreaterThan(0); // Pro = $20×3=$60 vs $75
    expect(claudeResult.monthlySavings).toBe(15);
  });
});

// ─── Test 7: Aggregate totals are correct ────────────────────────────────────
describe("Aggregate Calculation Accuracy", () => {
  it("correctly sums totalMonthlyCurrent, totalMonthlySavings, totalMonthlyOptimized", () => {
    const input: AuditInput = {
      teamSize: 2,
      useCase: "coding",
      tools: [
        {
          id: "t1",
          tool: "cursor",
          plan: "pro",
          monthlySpend: 40,
          seats: 2,
        },
        {
          id: "t2",
          tool: "github-copilot",
          plan: "individual",
          monthlySpend: 20,
          seats: 2,
        },
      ],
    };

    const result = runAudit(input);

    expect(result.totalMonthlyCurrent).toBe(60);
    expect(result.totalMonthlyOptimized).toBeLessThanOrEqual(result.totalMonthlyCurrent);
    expect(result.totalMonthlySavings).toBe(
      result.totalMonthlyCurrent - result.totalMonthlyOptimized
    );
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
  });
});
