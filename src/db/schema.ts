/**
 * Database Schema — Drizzle ORM + Supabase Postgres
 *
 * Tables:
 * - audits: one row per completed audit (no PII)
 * - leads: one row per lead capture submission (links to audit)
 * - storedAudits: Round 2 extension — full audit snapshot for re-audit on pricing change
 * - pricingChanges: log of detected pricing changes (bonus: market-changes page)
 */

import {
  pgTable,
  text,
  uuid,
  numeric,
  timestamp,
  jsonb,
  boolean,
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

// ── Stored Audits Table (Round 2) ─────────────────────────────────────────────
// Full audit snapshot including raw input + pricing snapshot for re-audit.
// One row per completed audit where user provided email.
// The `id` matches the public share URL ID from the audits table.

export const storedAudits = pgTable("stored_audits", {
  id: text("id").primaryKey(),                        // same as audits.id / share URL
  userEmail: text("user_email").notNull(),            // for notification emails
  inputStack: jsonb("input_stack").notNull(),         // AuditInput — re-runnable
  outputResult: jsonb("output_result").notNull(),     // AggregateAuditResult snapshot
  pricingSnapshot: jsonb("pricing_snapshot").notNull(), // TOOLS[] at time of audit
  pricingHash: text("pricing_hash").notNull(),        // SHA-256(pricingSnapshot) for fast diff
  flaggedForReaudit: boolean("flagged_for_reaudit").notNull().default(false),
  reauditEmailSentAt: timestamp("reaudit_email_sent_at", { withTimezone: true }),
  unsubscribed: boolean("unsubscribed").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ── Pricing Changes Table (Round 2 — bonus market-changes page) ───────────────
// Log of every detected pricing change. Used for the public market-changes page.

export const pricingChanges = pgTable("pricing_changes", {
  id: uuid("id").primaryKey().defaultRandom(),
  detectedAt: timestamp("detected_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  toolId: text("tool_id").notNull(),
  toolName: text("tool_name").notNull(),
  planId: text("plan_id").notNull(),
  fieldChanged: text("field_changed").notNull(), // 'pricePerSeat' | 'plan_added' | 'plan_removed'
  oldValue: text("old_value"),
  newValue: text("new_value"),
  description: text("description").notNull(),
});

// ── Type Exports ──────────────────────────────────────────────────────────────

export type AuditRow = typeof audits.$inferSelect;
export type NewAuditRow = typeof audits.$inferInsert;
export type LeadRow = typeof leads.$inferSelect;
export type NewLeadRow = typeof leads.$inferInsert;
export type StoredAuditRow = typeof storedAudits.$inferSelect;
export type NewStoredAuditRow = typeof storedAudits.$inferInsert;
export type PricingChangeRow = typeof pricingChanges.$inferSelect;
export type NewPricingChangeRow = typeof pricingChanges.$inferInsert;
