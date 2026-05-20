# ROUND2_DEVLOG.md

Real-time log of 36-hour Round 2 sprint.
Start: 2026-05-20 10:00 AM IST
Deadline: 2026-05-21 10:00 PM IST

---

## 2026-05-20 10:00 — Start

Read assignment carefully. Plan first, build second.

Core requirements:
1. Persistent audit storage (input + pricing snapshot + email)
2. Pricing-change detection (`/api/detect-changes`)
3. Notification email (Resend, consolidated per user)
4. Diff view at `/audit/diff/[id]`

Existing stack: Next.js 16, Supabase + Drizzle ORM, Resend, Upstash Redis.
Already have: `audits` and `leads` tables. `runAudit()` is a pure sync function — perfect for re-runs.

Decision: Extend `audits` table with 6 new nullable columns (no breaking change).
Decision: Require email in the audit form (not just optional lead capture) so every stored audit has an email for notifications.
Decision: Use GitHub Actions for cron scheduling — Vercel Cron requires Pro plan.
Decision: Build in order — DB schema → store-audit → detect-changes → email → diff view → docs.

~30 min planning. Branched to `round-2-reaudit`.

---

## 2026-05-20 10:30 — DB Schema + Pricing Snapshot

Extending `audits` table schema in Drizzle. Adding:
- `inputStack` (jsonb) — raw AuditInput as submitted
- `pricingSnapshot` (jsonb) — full TOOLS[] at time of audit  
- `pricingHash` (text) — SHA-256 for fast change detection
- `userEmail` (text) — for notification emails
- `flaggedForReaudit` (boolean) — set when pricing changes
- `reauditEmailSentAt` (timestamp) — dedup guard
- `unsubscribed` (boolean) — one-click opt-out

Also creating `pricing_changes` table for the bonus market-changes page.

Writing `src/lib/pricing-snapshot.ts` — pure functions, no side effects.
`getPricingSnapshot()` returns TOOLS[], `hashPricingSnapshot()` does SHA-256,
`diffPricingSnapshots()` does old vs new comparison for email content.

---

## 2026-05-20 11:00 — Core libs and API routes

Wrote 4 new lib files in order:
1. `src/lib/pricing-snapshot.ts` — snapshot + hash + diff
2. `src/lib/detect-changes.ts` — core detection logic (pure, testable)
3. `src/lib/reaudit-email.ts` — consolidated email HTML builder
4. `src/actions/store-audit.ts` — server action to persist audit

Then API routes:
- `POST /api/detect-changes` — manual/cron trigger with Bearer auth + dryRun mode
- `GET /api/unsubscribe/[token]` — HMAC-verified one-click unsubscribe (bonus)

TypeScript clean on first pass. No errors.

---

## 2026-05-20 11:30 — Diff view UI

Built `src/components/results/DiffView.tsx` — side-by-side comparison component.
- Changed tools highlighted in amber
- Unchanged tools collapsed by default (toggle to show)
- Delta column per tool (TrendingUp/Down icons)
- Total savings delta hero at the top

Then `src/app/audit/diff/[id]/page.tsx` — loads stored audit, re-runs with current
pricing, renders DiffView. Graceful fallback if DB unavailable.

---

## 2026-05-20 11:45 — Wired storeAudit into ResultsPage + stale audit banner

Modified `ResultsPage.tsx`: `storeAudit()` called when user submits lead form.
Non-fatal — DB failure doesn't break UX.

Modified `src/app/audit/[id]/page.tsx`: added stale-audit banner (amber, with
link to diff page) when `flaggedForReaudit = true`.

---

## 2026-05-20 12:00 — DB migration blocker

Tried `drizzle-kit push` — times out. Local network blocks outbound Postgres (5432).
Tried Supabase pooler (6543) — also times out.
Workaround: generated SQL in `src/db/migrations/0001_round2_reaudit.sql` to run
directly in Supabase SQL Editor. Tables created there. Lost ~20 min.

---

## 2026-05-20 12:15 — GitHub Actions cron + docs

Wrote `.github/workflows/detect-changes.yml` — daily at 06:00 UTC, calls
`/api/detect-changes` with CRON_SECRET. Manual dispatch with dry_run option.

Wrote all 3 required docs:
- `ROUND2_PR.md` — ~600 words, all sections complete
- `ROUND2_DEVLOG.md` — this file
- `ROUND2_REFLECTION.md` — 3 specific trade-off answers

TypeScript clean. Next build completed successfully.

---

## 2026-05-20 12:35 — Final Wrap & Commit

All tasks from the implementation plan are complete.
- TS Check: Pass
- Next Build: Pass (with minor Edge runtime warnings, expected)
- DB Migration: Created raw SQL for Supabase SQL Editor.

Committing all files to `round-2-reaudit` branch.

[End of Round 2 Sprint]

