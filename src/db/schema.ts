/**
 * Database Schema — Drizzle ORM + Supabase Postgres
 *
 * Tables:
 * - audits: one row per completed audit (no PII)
 * - leads: one row per lead capture submission (links to audit)
 */

import {
  pgTable,
  text,
  uuid,
  numeric,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// ── Audits Table ──────────────────────────────────────────────────────────────

export const audits = pgTable("audits", {
  id: text("id").primaryKey(), // nanoid — used in share URL
  toolsSnapshot: jsonb("tools_snapshot").notNull(), // ToolAuditResult[]
  savingsTier: text("savings_tier").notNull(), // 'high' | 'medium' | 'low' | 'optimal'
  totalMonthlySavings: numeric("total_monthly_savings", {
    precision: 10,
    scale: 2,
  }).notNull(),
  totalAnnualSavings: numeric("total_annual_savings", {
    precision: 10,
    scale: 2,
  }).notNull(),
  teamSize: numeric("team_size").notNull(),
  useCase: text("use_case").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ── Leads Table ───────────────────────────────────────────────────────────────

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  auditId: text("audit_id")
    .notNull()
    .references(() => audits.id),
  email: text("email").notNull(),
  companyName: text("company_name"),
  role: text("role"),
  monthlySavings: numeric("monthly_savings", { precision: 10, scale: 2 }),
  savingsTier: text("savings_tier").notNull(),
  ipHash: text("ip_hash").notNull(), // SHA-256 hash for abuse detection
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ── Type Exports ──────────────────────────────────────────────────────────────

export type AuditRow = typeof audits.$inferSelect;
export type NewAuditRow = typeof audits.$inferInsert;
export type LeadRow = typeof leads.$inferSelect;
export type NewLeadRow = typeof leads.$inferInsert;
