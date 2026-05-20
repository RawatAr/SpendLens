/**
 * GET /api/unsubscribe/[token]
 *
 * One-click unsubscribe from re-audit pricing alerts.
 * Token is HMAC-SHA256(auditId:email, CRON_SECRET) — encoded as base64url.
 * Query param: ?audit=[auditId]
 *
 * On success: sets stored_audits.unsubscribed = true and renders confirmation.
 */

import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { db } from "@/db";
import { storedAudits } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

function verifyToken(auditId: string, email: string, token: string): boolean {
  const secret = process.env.CRON_SECRET ?? "spendlens-dev-secret";
  const expected = createHmac("sha256", secret)
    .update(`${auditId}:${email}`)
    .digest("base64url");
  return token === expected;
}

interface PageProps {
  params: Promise<{ token: string }>;
}

export async function GET(req: NextRequest, { params }: PageProps) {
  const { token } = await params;
  const auditId = req.nextUrl.searchParams.get("audit");

  if (!token || !auditId) {
    return new NextResponse(unsubscribePage("Invalid unsubscribe link.", false), {
      headers: { "Content-Type": "text/html" },
      status: 400,
    });
  }

  try {
    const [stored] = await db
      .select({ id: storedAudits.id, userEmail: storedAudits.userEmail, unsubscribed: storedAudits.unsubscribed })
      .from(storedAudits)
      .where(eq(storedAudits.id, auditId))
      .limit(1);

    if (!stored) {
      return new NextResponse(unsubscribePage("Audit not found.", false), {
        headers: { "Content-Type": "text/html" },
        status: 404,
      });
    }

    if (stored.unsubscribed) {
      return new NextResponse(unsubscribePage("You&apos;re already unsubscribed.", true), {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (!verifyToken(auditId, stored.userEmail, token)) {
      return new NextResponse(unsubscribePage("Invalid or expired unsubscribe link.", false), {
        headers: { "Content-Type": "text/html" },
        status: 400,
      });
    }

    await db
      .update(storedAudits)
      .set({ unsubscribed: true })
      .where(eq(storedAudits.id, auditId));

    return new NextResponse(unsubscribePage("You&apos;ve been unsubscribed from re-audit alerts.", true), {
      headers: { "Content-Type": "text/html" },
    });
  } catch (err) {
    console.error("[unsubscribe] Error:", err);
    return new NextResponse(unsubscribePage("Something went wrong. Please try again.", false), {
      headers: { "Content-Type": "text/html" },
      status: 500,
    });
  }
}

function unsubscribePage(message: string, success: boolean): string {
  const color = success ? "#10B981" : "#EF4444";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribe · SpendLens</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #FAFAFA; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { max-width: 400px; padding: 48px 32px; background: #111111; border: 1px solid #262626; border-radius: 16px; text-align: center; }
    .dot { width: 12px; height: 12px; border-radius: 50%; background: ${color}; margin: 0 auto 24px; }
    h1 { font-size: 20px; font-weight: 700; margin: 0 0 12px; }
    p { color: #A1A1AA; font-size: 14px; line-height: 1.6; margin: 0 0 24px; }
    a { color: #10B981; font-size: 13px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="dot"></div>
    <h1>${success ? "Done" : "Error"}</h1>
    <p>${message}</p>
    <a href="/">← Back to SpendLens</a>
  </div>
</body>
</html>`;
}
