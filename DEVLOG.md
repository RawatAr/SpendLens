# DEVLOG.md

## Day 1 — 2026-05-06
**Hours worked:** 6
**What I did:** Initialized the Next.js project with Tailwind and TypeScript. Set up the core data structures for tools and plans. Built the initial landing page hero.
**What I learned:** The AI tool market is moving so fast that I need a robust `PRICING_DATA.md` to keep the audit logic traceable.
**Blockers / what I'm stuck on:** Deciding between a multi-step form or a single-page audit intake.
**Plan for tomorrow:** Build the audit intake form with Zustand state management.

## Day 2 — 2026-05-07
**Hours worked:** 8
**What I did:** Implemented the `AuditForm` with dynamic tool adding/removing. Set up the audit engine logic core (`runAudit`).
**What I learned:** Usage-based API pricing (OpenAI/Anthropic) is much harder to audit than seat-based pricing. I decided to use "optimization tips" instead of raw switch logic for these.
**Blockers / what I'm stuck on:** Handling seat-based math for teams vs individuals.
**Plan for tomorrow:** Design and build the Results page UI.

## Day 3 — 2026-05-08
**Hours worked:** 7
**What I did:** Built the "Observatory" results page. Implemented the Hero stats and per-tool breakdown cards.
**What I learned:** Visual density is the enemy of trust. I need to keep the numbers large and the reasoning simple.
**Blockers / what I'm stuck on:** Making the graphs feel "alive" rather than static images.
**Plan for tomorrow:** Integrate Anthropic API for the personalized summary.

## Day 4 — 2026-05-09
**Hours worked:** 6
**What I did:** Connected the backend to Anthropic. Implemented the fallback logic for API failures. Started the Lead Capture system.
**What I learned:** Claude 3.5 Sonnet is incredibly good at "CFO-speak" if prompted with specific constraints.
**Blockers / what I'm stuck on:** Resend API credentials and domain verification.
**Plan for tomorrow:** Finalize lead capture and public share URLs.

## Day 5 — 2026-05-10
**Hours worked:** 8
**What I did:** Built the unique public result URL system. Stripped PII (email/company) from public views. Added Open Graph tags for social sharing.
**What I learned:** `localStorage` is great, but sharing results requires a real database. Decided to use Supabase for persistent lead storage.
**Blockers / what I'm stuck on:** Open Graph image generation.
**Plan for tomorrow:** Polish the mobile experience and improve Lighthouse scores.

## Day 6 — 2026-05-11
**Hours worked:** 5
**What I did:** Implemented "Global Currency Exchange" (USD, EUR, GBP, INR). Refined the print/PDF export styling. Verified audit engine math against passing Vitest tests.
**What I learned:** Financial tools are global; showing savings in a founder's local currency significantly increases the "WOW" factor.
**Blockers / what I'm stuck on:** Layout shifting on small screens.
**Plan for tomorrow:** Final audit of the PDF requirements and documentation.

## Day 7 — 2026-05-12
**Hours worked:** 9
**What I did:** Full survey of the PDF assignment. Created all 12+ required documentation files. Fixed the email "from" address bug. Wrote Jest tests for the audit engine. Optimized UI components for professional "Executive" aesthetic.
**What I learned:** The quality of documentation is what separates a "coder" from an "engineer."
**Blockers / what I'm stuck on:** None. Ready for submission.
**Plan for tomorrow:** Submit and celebrate.
