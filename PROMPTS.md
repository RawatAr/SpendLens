# PROMPTS.md

## Main Audit Synthesis Prompt
Used in: `src/lib/anthropic.ts`

### Current Prompt
```text
You are an AI spend analyst. Given this audit data for a {teamSize}-person team focused on {useCase} tasks:

{JSON_DATA}

Write a ~100-word summary for the user explaining their key overspend areas, the top 1-2 recommendations, and the total annual savings opportunity.

Rules:
- Tone: direct, non-salesy, like a trusted CFO friend giving honest advice
- Start with "Your team is spending..." or "Based on your stack..."  
- Include the specific dollar amounts from the data
- End with the total annual savings opportunity
- Output plain text only — no markdown, no bullet points, no headers
- Exactly 80-120 words
```

### Prompt Evolution & Decisions
1. **Initial Version**: I asked the LLM to "analyze the spend".
   - **Result**: It hallucinated its own pricing numbers instead of using my audit data.
   - **Fix**: I provided the full `auditSummary` as JSON and strictly told it to use *only* those numbers.
2. **Tone Control**: Founders hate being sold to. I explicitly added "trusted CFO friend" and "non-salesy" to ensure the advice feels impartial and high-trust.
3. **Strict Constraints**: I added the "plain text only" rule because the LLM kept adding bold text and bullet points, which broke the "Cinematic Observatory" aesthetic of the results page.
4. **Length Control**: By setting an exact word count (80-120), I ensured the layout remains stable and doesn't push the "Dispatch Report" card too far down the page.

### Fallback Strategy
If the Anthropic API fails (timeout or 429), the system falls back to `generateFallbackSummary` in `src/lib/fallback-summary.ts`. This template uses the same team/use-case data to construct a professional, albeit less "creative," summary so the user experience never breaks.
