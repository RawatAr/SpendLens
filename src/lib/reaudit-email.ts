/**
 * Re-audit Email — Round 2
 *
 * Sends a consolidated notification email to a user when pricing changes
 * have invalidated one or more of their stored audits.
 *
 * Consolidated = one email per user even if multiple audits are affected.
 * Includes: what changed, how it affects each audit, and re-run links.
 */

import { Resend } from "resend";
import { createHmac } from "crypto";
import type { AffectedAudit } from "@/lib/detect-changes";

const resend = new Resend(process.env.RESEND_API_KEY);

function getUnsubscribeToken(auditId: string, email: string): string {
  const secret = process.env.CRON_SECRET ?? "spendlens-dev-secret";
  return createHmac("sha256", secret)
    .update(`${auditId}:${email}`)
    .digest("base64url");
}

function buildEmailHtml(
  userEmail: string,
  affectedAudits: AffectedAudit[],
  appUrl: string
): string {
  const totalOldSavings = affectedAudits.reduce(
    (s, a) => s + a.oldResult.totalMonthlySavings,
    0
  );
  const totalNewSavings = affectedAudits.reduce(
    (s, a) => s + a.newResult.totalMonthlySavings,
    0
  );
  const delta = totalNewSavings - totalOldSavings;
  const deltaLabel =
    delta > 0
      ? `+$${Math.abs(delta).toLocaleString()} more savings`
      : delta < 0
      ? `$${Math.abs(delta).toLocaleString()} less savings`
      : "No change in total savings";

  const auditSections = affectedAudits
    .map((audit) => {
      const unsubToken = getUnsubscribeToken(audit.auditId, userEmail);
      const unsubUrl = `${appUrl}/api/unsubscribe/${unsubToken}?audit=${audit.auditId}`;

      const changedRows = audit.changedTools
        .map(
          (tool) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #1f1f1f;font-size:13px;color:#FAFAFA;font-weight:500;">${tool.toolDisplayName}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #1f1f1f;font-size:12px;color:#A1A1AA;text-decoration:line-through;">${tool.oldRecommendation} · $${tool.oldMonthlySavings}/mo</td>
          <td style="padding:10px 12px;border-bottom:1px solid #1f1f1f;font-size:12px;color:#10B981;font-weight:600;">${tool.newRecommendation} · $${tool.newMonthlySavings}/mo</td>
        </tr>`
        )
        .join("");

      return `
      <div style="background:#111111;border:1px solid #262626;border-radius:12px;padding:24px;margin-bottom:20px;">
        <div style="font-size:11px;color:#71717A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Audit · ${audit.auditId}</div>
        <table style="width:100%;border-collapse:collapse;background:#0a0a0a;border-radius:8px;overflow:hidden;margin-bottom:16px;">
          <thead>
            <tr>
              <th style="padding:8px 12px;text-align:left;font-size:11px;color:#71717A;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #1f1f1f;">Tool</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;color:#71717A;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #1f1f1f;">Previous</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;color:#71717A;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #1f1f1f;">Updated</th>
            </tr>
          </thead>
          <tbody>${changedRows}</tbody>
        </table>
        <a href="${audit.rerunUrl}"
           style="display:inline-block;background:#10B981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin-bottom:12px;">
          View Updated Audit →
        </a>
        <div style="margin-top:8px;">
          <a href="${unsubUrl}" style="font-size:11px;color:#71717A;text-decoration:underline;">Unsubscribe from re-audit alerts</a>
        </div>
      </div>`;
    })
    .join("");

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#0a0a0a;color:#FAFAFA;">
    
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:32px;">
      <div style="width:8px;height:8px;border-radius:50%;background:#10B981;"></div>
      <span style="font-size:14px;font-weight:600;color:#FAFAFA;">SpendLens</span>
    </div>

    <div style="background:#111111;border:1px solid #262626;border-radius:8px;padding:6px 12px;display:inline-block;margin-bottom:24px;">
      <span style="font-size:10px;font-weight:700;color:#F59E0B;text-transform:uppercase;letter-spacing:0.1em;">⚡ Pricing Changed</span>
    </div>

    <h1 style="font-size:24px;font-weight:800;margin:0 0 8px;letter-spacing:-0.02em;">Your audit needs a refresh</h1>
    <p style="color:#A1A1AA;font-size:15px;line-height:1.6;margin:0 0 24px;">
      AI tool pricing has changed since you ran your audit. 
      ${affectedAudits.length === 1 ? "Your audit" : `${affectedAudits.length} of your audits`} 
      may now have different recommendations.
    </p>

    <div style="background:${delta >= 0 ? "rgb(16 185 129 / 0.08)" : "rgb(239 68 68 / 0.08)"};border:1px solid ${delta >= 0 ? "rgb(16 185 129 / 0.25)" : "rgb(239 68 68 / 0.25)"};border-radius:12px;padding:20px;margin-bottom:32px;text-align:center;">
      <div style="font-size:11px;color:#71717A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Impact on your savings</div>
      <div style="font-size:28px;font-weight:900;color:${delta >= 0 ? "#10B981" : "#EF4444"};">${deltaLabel}</div>
      <div style="font-size:12px;color:#71717A;margin-top:4px;">per month vs your previous audit</div>
    </div>

    <h2 style="font-size:14px;font-weight:700;color:#FAFAFA;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 16px;">What changed</h2>
    ${auditSections}

    <hr style="border:0;border-top:1px solid #1f1f1f;margin:32px 0;" />
    <p style="color:#52525B;font-size:11px;text-align:center;line-height:1.6;">
      SpendLens · Pricing-change alert<br/>
      You received this because you ran an audit at ${appUrl}
    </p>
  </div>`;
}

export interface SendReauditEmailResult {
  email: string;
  success: boolean;
  error?: string;
}

export async function sendReauditEmail(
  userEmail: string,
  affectedAudits: AffectedAudit[],
  appUrl: string
): Promise<SendReauditEmailResult> {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes("your_")) {
    console.warn("[sendReauditEmail] RESEND_API_KEY not configured");
    return { email: userEmail, success: false, error: "Email service not configured" };
  }

  const auditCount = affectedAudits.length;
  const subject =
    auditCount === 1
      ? `Your SpendLens audit is outdated — pricing changed`
      : `${auditCount} of your SpendLens audits need a refresh`;

  try {
    const { error } = await resend.emails.send({
      from: "SpendLens <onboarding@resend.dev>",
      to: userEmail,
      subject,
      html: buildEmailHtml(userEmail, affectedAudits, appUrl),
    });

    if (error) {
      console.error("[sendReauditEmail] Resend error:", error);
      return { email: userEmail, success: false, error: error.message };
    }

    return { email: userEmail, success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[sendReauditEmail] Unexpected error:", msg);
    return { email: userEmail, success: false, error: msg };
  }
}
