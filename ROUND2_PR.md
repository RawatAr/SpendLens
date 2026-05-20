## What this PR does

Adds live re-audit on pricing change to SpendLens. When a user submits an audit and enters their email, the full audit input, result, and a pricing data snapshot are stored in Supabase. A `POST /api/detect-changes` endpoint (callable manually or on a cron schedule) scans stored audits, re-runs the audit engine with current pricing, and emails affected users a consolidated diff of what changed and why. Clicking through takes users to a new `/audit/diff/[id]` page showing their original vs updated recommendations side-by-side.

## Why

AI tool pricing is not stable. Cursor raised prices in 2024; Claude restructured tiers in 2025; Copilot added per-model pricing. A one-time audit that becomes stale silently is worse than no audit — users optimise their stack based on wrong data. This PR makes SpendLens a persistent, live system rather than a one-shot calculator. The primary user is someone who ran an audit 3 months ago, forgot about it, and is now overpaying based on outdated recommendations. The secondary user is the Credex reviewer triggering `POST /api/detect-changes` to verify the flow end-to-end.

## How it works

```
[User submits audit + email on results page]
         │
         ▼
[storeAudit() server action]
  stores: auditId, userEmail, inputStack (AuditInput JSON),
          outputResult (AggregateAuditResult JSON),
          pricingSnapshot (TOOLS[] JSON), SHA-256 hash of snapshot
         │
         ▼ (later — manual or cron)
[POST /api/detect-changes]
  1. Compute hash of current TOOLS[]
  2. SELECT stored audits WHERE pricing_hash != current_hash AND NOT unsubscribed
  3. For each: re-run runAudit(stored.inputStack) with current pricing
  4. Compare recommendations tool-by-tool (recommendation type + savings delta > $1)
  5. If any tool changed: flag audit, group by userEmail
  6. Send 1 consolidated Resend email per user
  7. UPDATE reaudit_email_sent_at, log diffs to pricing_changes table
         │
         ▼ (user clicks email link)
[GET /audit/diff/:id]
  - Loads stored audit from stored_audits table
  - Re-runs runAudit(inputStack) live (no cached result — always fresh)
  - Renders <DiffView> side-by-side: old vs new, delta per tool, total delta hero
```

New files: `src/lib/pricing-snapshot.ts`, `src/lib/detect-changes.ts`, `src/lib/reaudit-email.ts`, `src/actions/store-audit.ts`, `src/app/api/detect-changes/route.ts`, `src/app/api/unsubscribe/[token]/route.ts`, `src/app/audit/diff/[id]/page.tsx`, `src/components/results/DiffView.tsx`, `.github/workflows/detect-changes.yml`

Modified files: `src/db/schema.ts` (2 new tables), `src/components/results/ResultsPage.tsx` (wired storeAudit), `src/app/audit/[id]/page.tsx` (stale-audit banner)

## What I cut

- **Vercel Cron schedule**: Requires Pro plan. Used GitHub Actions daily schedule calling the endpoint instead. The endpoint is callable manually and by any scheduler — it's the right abstraction.
- **Admin dashboard** (bonus): Would need an auth layer to be safe. Without auth it'd expose audit counts to anyone. Didn't have time to implement even simple basic auth cleanly.
- **Public market-changes page** (bonus): The `pricing_changes` table is populated correctly. The page itself is a 30-minute build — cut to prioritise the diff view quality.
- **OAuth vendor seat verification**: Requires submitting apps to GitHub/Anthropic developer portals — multi-week process, outside 36h scope.
- **Automated tests for the diff view UI**: Tested manually; would use Playwright for end-to-end and Vitest for the detection logic. The `detectPricingChanges()` function is pure enough to unit-test trivially — just didn't get there.

## How to test it manually

1. Go to `https://spend-lens-rho.vercel.app/audit`, add any tool (e.g. Cursor Pro, $20/mo, 3 seats), complete the audit
2. Enter your email in the lead capture form on the results page — this triggers `storeAudit()` in the background
3. Trigger the detection endpoint:
   ```bash
   curl -X POST https://spend-lens-rho.vercel.app/api/detect-changes \
     -H "Authorization: Bearer $CRON_SECRET" \
     -H "Content-Type: application/json" \
     -d '{"dryRun": true}'
   ```
   Dry run returns affected users without sending emails.
4. To trigger an actual email, temporarily edit `src/data/tools.ts` and change Cursor Pro `pricePerSeat` from `20` to `25`, redeploy, then call the endpoint without `dryRun`.
5. Check your inbox — the email includes a "View Updated Audit →" button
6. Click through to `/audit/diff/[auditId]` — see the old vs new comparison
7. To test unsubscribe: click "Unsubscribe from re-audit alerts" link at the bottom of the notification email

## What's tested

- TypeScript: `npx tsc --noEmit` — clean, zero errors
- ESLint: passes with `eslint .`
- Manual end-to-end: audit submission → `storeAudit` → `detect-changes` → email → diff view (all tested locally and in staging)
- Skipped: automated unit tests for `detectPricingChanges()` and `diffPricingSnapshots()` — both are pure functions that would be trivial to test with Vitest; ran out of time. Would test: hash mismatches trigger flagging, consolidated email per user, `dryRun` returns affected without DB writes.

## Open questions / risks

- **Resend sandbox limitation**: Using `onboarding@resend.dev` (Resend sandbox). In production, notification emails require a verified sending domain. All notification emails will currently only deliver to verified Resend addresses. Documented in `.env.example` — needs `RESEND_DOMAIN` to fix.
- **Re-run fidelity**: The diff re-runs `runAudit()` with the stored `inputStack`. If the audit engine logic itself changes (not just pricing data), a stored audit might produce different results even with identical pricing. This is "correct" behaviour but could surprise users. A future fix: also snapshot the engine version.
- **DB scan at scale**: `detectPricingChanges()` does a full-table scan on `stored_audits`. At thousands of rows this is fine; at millions it needs pagination or an index on `pricing_hash`. Not a concern at current scale but worth noting.
