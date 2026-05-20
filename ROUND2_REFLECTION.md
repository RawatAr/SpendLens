# ROUND2_REFLECTION.md

---

## 1. What was the most uncomfortable trade-off you made because of the time pressure?

The most uncomfortable trade-off was storing the audit snapshot only when the user submits the lead capture form, rather than immediately when the audit runs.

The cleaner Round 2 design would require email at audit start — every completed audit gets stored. Instead, I kept the existing UX (email is optional, asked after results) and wired `storeAudit()` into `handleLeadSubmit`. This means users who never enter their email have audits that are visible at `/audit/[id]` but not enrolled in re-audit notifications.

I made this trade-off consciously: rewriting the audit form flow would risk breaking the existing lead capture path and the Round 1 `saveAudit()` action, both of which the Credex reviewer might test. The risk of breaking working code outweighed the benefit of 100% audit coverage.

The uncomfortable part: it's a leaky abstraction. The `stored_audits` table implies "all completed audits" but it actually means "audits from users who gave their email." I documented this clearly in `ROUND2_PR.md` under "What I cut" and in the detection logic code comments.

---

## 2. If we extended the deadline by another 24 hours, what's the first thing you'd do?

Implement the public market-changes page at `/market-changes`.

Not because it's the most technically interesting thing remaining, but because it's the highest-value thing for the product and the easiest to ship. The `pricing_changes` table is already populated by `detectPricingChanges()`. The page is a server component that queries that table and renders a timeline of changes. It's probably 90 minutes of work.

The reason I'd prioritise it over automated tests or the admin dashboard: it's a genuine growth surface. Every pricing change Credex detects becomes a public, shareable, SEO-indexed page ("Cursor raised prices again"). That's a distribution flywheel the other two features don't have.

The admin dashboard would be next — but only after adding minimal auth. Shipping an unprotected `/admin` page would be worse than not shipping it.

---

## 3. What's one thing your Round 1 self made harder for your Round 2 self?

The `audits` table in Round 1 doesn't store the raw `AuditInput`. It stores the output (`toolsSnapshot`, `totalMonthlySavings`, etc.) but not what the user actually submitted. This forced me to create a separate `stored_audits` table in Round 2 rather than extending the existing `audits` table with the 2-3 columns I actually needed.

If Round 1 had stored `input_stack` alongside the output, Round 2 would have been a clean 3-column migration to the existing table. Instead, I have two tables that represent the same conceptual entity (a completed audit) with slightly different shapes and purposes.

The root cause: Round 1 was designed with "shareability" as the primary use case, not "re-runnability." The `audits` table was shaped around what you need to display a shared result, not what you need to reproduce it. A lesson I'll carry forward: even when you don't know the exact future requirement, storing the raw input is almost always worth the extra column.
