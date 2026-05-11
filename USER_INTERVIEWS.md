# USER_INTERVIEWS.md

## Interview 1 — A.K., CTO of Seed-Stage FinTech
- **Role**: CTO / Co-founder
- **Company Stage**: Seed ($2M raised, 8 employees)
- **Quotes**: 
  - "I check the OpenAI bill every month and it's always higher than I expect, but I don't have time to see if we're on the wrong plan."
  - "We have 4 people on Cursor Business just because we wanted the SSO, but we probably don't actually need it yet."
- **Surprising Moment**: He didn't know that Claude Team plans have a 5-seat minimum even if you only have 3 people. He was paying for 5 seats while only using 3.
- **Design Impact**: I added a specific check for "Minimum Seat Requirements" in the audit engine to catch the Claude/ChatGPT Team plan waste.

## Interview 2 — L.M., Lead Engineer at Series A SaaS
- **Role**: Engineering Manager
- **Company Stage**: Series A (45 employees)
- **Quotes**:
  - "The shareable URL is the best part. I can just slack this to our Ops person and say 'look how much we're wasting'."
  - "I'm worried about the security of 'connecting' my accounts."
- **Surprising Moment**: He was much more interested in the "Shareable Link" than the actual PDF. He wanted a quick way to prove a point to management.
- **Design Impact**: I prioritized the "Unique Public URL" feature and added "Identifying details stripped" to make the links safe to share internally.

## Interview 3 — S.R., Solo Founder / Indie Hacker
- **Role**: Founder
- **Company Stage**: Bootstrapped / Pre-seed
- **Quotes**:
  - "As a solo founder, every $20/mo matters. I'm constantly switching between Pro and Free tiers."
  - "I want to know if I should use the API directly or keep the Pro subscription."
- **Surprising Moment**: He was using both ChatGPT Plus and Claude Pro simultaneously and felt "guilty" about it but didn't know which one to cut.
- **Design Impact**: I improved the "Use Case" logic to help users choose between tools if their workflows overlapped (e.g., suggesting Claude for heavy coding and ChatGPT for general research).
