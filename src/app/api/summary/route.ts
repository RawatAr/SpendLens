/**
 * API Route — /api/summary
 * Generates an AI summary for the audit result.
 * Protected by Upstash Redis rate limiting (10 req / 10 min per IP).
 */

import { NextRequest, NextResponse } from "next/server";
import { generateAuditSummary } from "@/lib/anthropic";
import type { AggregateAuditResult } from "@/types/audit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { auditResult } = body as { auditResult: AggregateAuditResult };

    if (!auditResult) {
      return NextResponse.json(
        { error: "Missing auditResult" },
        { status: 400 }
      );
    }

    // Rate limiting via Upstash Redis (Only run if valid credentials exist)
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (
      redisUrl && 
      redisUrl.startsWith("https") && 
      redisToken && 
      !redisToken.includes("your_")
    ) {
      const { Ratelimit } = await import("@upstash/ratelimit");
      const { Redis } = await import("@upstash/redis");

      const redis = new Redis({
        url: redisUrl,
        token: redisToken,
      });

      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "10 m"),
        analytics: true,
      });

      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "127.0.0.1";
      const { success } = await ratelimit.limit(`summary:${ip}`);

      if (!success) {
        return NextResponse.json(
          { error: "Too many requests. Please wait before trying again." },
          { status: 429 }
        );
      }
    }

    const summary = await generateAuditSummary(auditResult);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("[/api/summary] Error:", error);
    // Fallback to the intelligence engine's internal fallback logic on 500s
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
