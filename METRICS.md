# METRICS.md

## North Star Metric
**Total Identified Annual Savings (TIAS)**
- *Why*: This is the ultimate "value" delivered by the tool. If TIAS is high, the tool is doing its job of surfacing waste. It also directly correlates with the potential value of leads for Credex.

## 3 Input Metrics
1. **Audit Completion Rate**: The % of visitors who start the form and finish the audit. This measures the UX friction of our intake portal.
2. **Lead Conversion Rate (Value-to-Lead)**: The % of users who enter their email *after* seeing a savings opportunity >$100. This measures the "Trust-to-Value" ratio.
3. **Share Rate**: The % of users who copy the public share link or download the PDF. This measures the "Viral Loop" and internal utility of the report.

## Instrumentation Plan
I would instrument the first 1,000 audits using **PostHog**:
- Track `form_step_completed` to find drop-off points.
- Track `savings_identified_tier` (Low, Medium, High) to see the quality of our traffic.
- Track `consultation_button_clicked` for high-savings users.

## Pivot Decision Trigger
If the **Audit Completion Rate** falls below 15% after 500 visitors, I would pivot the UI from a "terminal" style intake to a much shorter, 3-question "Quick Estimate" form to capture interest faster.
If the **Consultation Booking Rate** for "High Savings" users is <2%, I would pivot the messaging from "Book a call" to a more automated "Apply for credits" self-service portal.
