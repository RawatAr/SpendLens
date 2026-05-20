/**
 * Server Action — Submit Lead
 *
 * Validates email, checks honeypot, applies rate limiting,
 * stores lead in Supabase, and triggers Resend email.
 */

"use server";

import { createHash } from "crypto";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { LeadCaptureSchema } from "@/lib/schemas/audit-input";
import type { SavingsTier } from "@/types/audit";
import { Resend } from "resend";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

interface SubmitLeadInput {
  email: string;
  companyName?: string;
  role?: string;
  honeypot: string;
  auditId: string;
  monthlySavings: number;
  savingsTier: SavingsTier;
  annualSavings: number;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function submitLead(input: SubmitLeadInput): Promise<ActionResult> {
  // 1. Validate with Zod
  const parsed = LeadCaptureSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  // 2. Honeypot check (bot detection)
  if (input.honeypot && input.honeypot.length > 0) {
    // Silently succeed — don't alert bots
    return { success: true };
  }

  // 3. Get IP and hash it
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  // 4. Rate limiting via Upstash Redis (1 submission per IP per 10 min)
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    try {
      const { Ratelimit } = await import("@upstash/ratelimit");
      const { Redis } = await import("@upstash/redis");

      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });

      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(1, "10 m"),
      });

      const { success } = await ratelimit.limit(`lead:${ipHash}`);
      if (!success) {
        return {
          success: false,
          error: "You've already submitted recently. Please wait 10 minutes.",
        };
      }
    } catch {
      // Don't block submission if rate limiter is unavailable
      console.warn("[submitLead] Rate limiter unavailable, proceeding");
    }
  }

  // 5. Store lead in Supabase (only if DB is configured)
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("your_")) {
    try {
      await db.insert(leads).values({
        auditId: input.auditId,
        email: input.email,
        companyName: input.companyName,
        role: input.role,
        monthlySavings: String(input.monthlySavings),
        savingsTier: input.savingsTier,
        ipHash,
      });
    } catch (err) {
      console.error("[submitLead] DB insert failed:", err);
      // Don't fail the UX — proceed to email
    }
  }

  // 6. Send transactional email via Resend
  if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes("your_")) {
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://spend-lens-rho.vercel.app";
      const shareUrl = `${appUrl}/audit/${input.auditId}`;

      const isHighSavings = input.savingsTier === "high";

      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "SpendLens <onboarding@resend.dev>",
        to: input.email,
        subject: `Your AI Spend Audit — ${input.monthlySavings > 0 ? `$${input.monthlySavings.toLocaleString()}/month in potential savings` : "Your stack is optimal!"}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff; color: #1a1a1a; border: 1px solid #e5e7eb; border-radius: 16px;">
            <div style="margin-bottom: 32px;">
              <span style="background: #10B981; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">Audit Protocol Complete</span>
            </div>
            
            <h1 style="color: #000000; font-size: 32px; font-weight: 800; margin-bottom: 16px; letter-spacing: -0.02em;">SpendLens Intelligence Report</h1>
            <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">We've analyzed your AI infrastructure against market benchmarks. Here is your structural synthesis.</p>
            
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 16px; padding: 32px; margin-bottom: 32px; text-align: center;">
              <div style="font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Potential Annual Recovery</div>
              <div style="font-size: 48px; font-weight: 900; color: #10B981; letter-spacing: -0.04em;">$${input.annualSavings.toLocaleString()}</div>
              <div style="font-size: 14px; color: #9ca3af; margin-top: 8px;">($${input.monthlySavings.toLocaleString()} / month)</div>
            </div>
            
            <div style="margin-bottom: 40px;">
              <a href="${shareUrl}" style="display: block; background: #000000; color: #ffffff; padding: 18px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; text-align: center; font-size: 16px;">
                Access Full Document →
              </a>
            </div>
            
            ${isHighSavings ? `
            <div style="background: #ecfdf5; border: 1px solid #10B981; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
              <p style="color: #065f46; font-weight: 700; font-size: 16px; margin: 0 0 8px 0;">Credex Yield Opportunity</p>
              <p style="color: #047857; font-size: 14px; margin: 0; line-height: 1.5;">Our analysts have flagged your account for significant infrastructure recovery. Credex can help you capture these savings through discounted credits for Cursor, Claude, and ChatGPT Enterprise.</p>
            </div>
            ` : ""}
            
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin-bottom: 32px;" />
            
            <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; text-align: center;">
              SpendLens is an independent audit tool powered by Credex. <br/>
              © 2026 SpendLens · San Francisco, CA
            </p>
          </div>
        `,
      });

      if (emailError) {
        console.error("[submitLead] Resend API Error:", emailError);
        return { 
          success: false, 
          error: "Email delivery failed. This usually happens if you haven't verified your domain in Resend, or if you're using a Sandbox account to send to an unverified email." 
        };
      }
    } catch (err) {
      console.error("[submitLead] Unexpected Error:", err);
      return { success: false, error: "Failed to connect to email service." };
    }
  }

  return { success: true };
}
