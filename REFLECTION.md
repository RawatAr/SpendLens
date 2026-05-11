# REFLECTION.md

## 1. The Hardest Bug
The hardest bug was a React Hook "size changed" error in the `IntelligenceLogs` component during a hot-reload. I initially hypothesized that the `tools` array was being modified in-place, but after debugging with React DevTools, I realized the issue was actually with the dependency array in a `useEffect`. I was passing an array that was being reconstructed on every render by a context provider that wasn't using `useCallback`. I fixed this by stabilizing the `CurrencyContext` functions with `useCallback` and `useMemo`, ensuring the reference equality of the audit data remained stable across the re-render cycle. This taught me that even simple "utility" contexts can cause cascading hook failures if not properly memoized.

## 2. Decision Reversed
Mid-week, I reversed my decision to use a multi-step "wizard" style form for the audit intake. I originally thought a wizard would feel more "premium," but after testing the flow, I realized it created too much friction. Startup founders want to see the "value" (the savings) as fast as possible. I switched back to a single, high-density "Intake Portal" that feels more like a terminal or a dashboard. This change allowed the user to see their "Live Intelligence Node" update in real-time as they added tools, which significantly improved the "Aha!" moment of the product.

## 3. Week 2 Roadmap
If I had a second week, I would build the "Benchmark Mode" mentioned in the bonus section. I’d aggregate anonymized data from all audits to show users how they compare to companies of a similar stage. For example: "Your AI spend per developer is $145/mo; the average for Seed-stage startups is $92/mo." This social benchmarking creates a powerful psychological trigger for optimization and makes the tool feel like a true "intelligence platform" rather than just a calculator. I would also implement a server-side PDF generator using `Puppeteer` to ensure the exported reports are pixel-perfect and branded.

## 4. Use of AI Tools
I used AI (Claude 3.5 Sonnet) extensively for three tasks: 
1. **Visual Inspiration**: I used it to brainstorm the "AI Observatory" aesthetic, describing components in code and asking for layout refinements. 
2. **Text Synthesis**: I used the Anthropic API directly for the executive summary feature. 
3. **Drafting Documentation**: AI helped me structure the complex `GTM.md` and `ECONOMICS.md` files based on my project data.
One specific time the AI was wrong: It suggested a pricing rule for Claude that was outdated (referencing "Claude 2" pricing). I caught this during my manual verification phase for `PRICING_DATA.md` and corrected the `rules.ts` file to match the official 2026 pricing page. I learned not to trust LLMs for current market data; always verify against the source.

## 5. Self-Rating
- **Discipline (9/10)**: I maintained a strict devlog and committed daily across the full 7-day window.
- **Code Quality (9/10)**: The audit engine is type-safe, modular, and easy to extend with new tools.
- **Design Sense (10/10)**: The "AI Observatory" aesthetic is unique, premium, and specifically tailored to the startup founder persona.
- **Problem Solving (9/10)**: I handled complex state synchronization and API fallbacks gracefully.
- **Entrepreneurial Thinking (10/10)**: Every feature, from the post-value lead capture to the shareable public URLs, was built with distribution and lead-gen in mind.
