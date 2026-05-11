/**
 * API Route — /api/og
 * Generates a dynamic Open Graph image for shareable audit URLs.
 * Uses @vercel/og for edge-rendered image generation.
 */

import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const savings = searchParams.get("savings") ?? "0";
  const annualSavings = searchParams.get("annual") ?? "0";
  const tools = searchParams.get("tools") ?? "";
  const tier = searchParams.get("tier") ?? "medium";

  const toolList = tools
    .split(",")
    .filter(Boolean)
    .slice(0, 4)
    .join(" · ");

  const tierColor =
    tier === "high"
      ? "#10B981"
      : tier === "optimal"
      ? "#6366F1"
      : "#F59E0B";

  const tierLabel =
    tier === "high"
      ? "HIGH SAVINGS"
      : tier === "optimal"
      ? "ALREADY OPTIMAL"
      : tier === "medium"
      ? "MEDIUM SAVINGS"
      : "LOW SAVINGS";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* SpendLens Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#10B981",
              marginRight: "12px",
            }}
          />
          <span
            style={{ color: "#A1A1AA", fontSize: "18px", fontWeight: 500 }}
          >
            SpendLens · AI Spend Audit
          </span>
        </div>

        {/* Savings Number */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              color: "#10B981",
              fontSize: "80px",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            ${Number(savings).toLocaleString()}
          </span>
          <span
            style={{ color: "#71717A", fontSize: "28px", marginLeft: "12px" }}
          >
            /month saved
          </span>
        </div>

        {/* Annual */}
        <div
          style={{
            color: "#A1A1AA",
            fontSize: "22px",
            marginBottom: "32px",
          }}
        >
          ${Number(annualSavings).toLocaleString()}/year in potential savings
        </div>

        {/* Tier Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: tierColor + "22",
              border: `1px solid ${tierColor}44`,
              borderRadius: "6px",
              padding: "6px 14px",
              color: tierColor,
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {tierLabel}
          </div>
        </div>

        {/* Tools */}
        {toolList && (
          <div style={{ color: "#71717A", fontSize: "16px" }}>
            Tools audited: {toolList}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "60px",
            color: "#10B981",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          Audit your stack free at spendlens.io →
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
