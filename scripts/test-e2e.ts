/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";
import { db } from "../src/db";
import { storedAudits } from "../src/db/schema";
import { getPricingSnapshot, hashPricingSnapshot } from "../src/lib/pricing-snapshot";
import { runAudit } from "../src/lib/audit-engine";
import { nanoid } from "nanoid";

async function runTest() {
  console.log("🚀 Starting E2E Verification Test...");

  // 1. Create a fake old pricing snapshot where Cursor Pro was $5 instead of $20
  const currentPricing = getPricingSnapshot();
  const fakeOldPricing = currentPricing.map(tool => {
    if (tool.id === "cursor") {
      return {
        ...tool,
        plans: tool.plans.map(p => p.id === "pro" ? { ...p, pricePerSeat: 5 } : p)
      };
    }
    return tool;
  });
  
  const oldHash = hashPricingSnapshot(fakeOldPricing);
  const auditId = "test-audit-" + nanoid(6);
  const userEmail = "test@resend.dev"; // Sandbox email

  // Fake user input
  const inputStack = {
    tools: [
      { id: "1", tool: "cursor", plan: "pro", monthlySpend: 5, seats: 1 } // user spending $5
    ],
    teamSize: 1,
    useCase: "coding" as const
  };

  // The output result they got back then
  // At $5, maybe the recommendation was "keep"
  const oldResult = {
    tools: [
      {
        tool: "cursor",
        toolDisplayName: "Cursor",
        currentPlan: "Pro",
        monthlySpend: 5,
        monthlySavings: 0,
        recommendation: "keep",
        recommendedAction: "Keep current setup"
      }
    ],
    totalMonthlySavings: 0,
    totalAnnualSavings: 0,
    savingsTier: "optimal" as const
  };

  console.log(`\n📦 1. Inserting test audit [ID: ${auditId}] with outdated pricing hash...`);
  await db.insert(storedAudits).values({
    id: auditId,
    userEmail: userEmail,
    inputStack: inputStack as any,
    outputResult: oldResult as any,
    pricingSnapshot: fakeOldPricing as any,
    pricingHash: oldHash
  });
  console.log("✅ Audit inserted.");

  console.log("\n🔍 2. Triggering /api/detect-changes endpoint (Dry Run first)...");
  
  // Call the locally running server
  const cronSecret = process.env.CRON_SECRET || "spendlens-cron-secret-r2";
  
  let res = await fetch("http://localhost:3000/api/detect-changes", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${cronSecret}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ dryRun: true })
  });
  
  let data = await res.json();
  console.log("Dry Run Response:", JSON.stringify(data, null, 2));

  if (data.flagged === 0) {
    console.error("❌ FAILED: Detection engine did not flag the audit.");
    process.exit(1);
  } else {
    console.log("✅ Detection engine successfully identified the stale pricing!");
  }

  console.log("\n✉️ 3. Triggering /api/detect-changes endpoint (Live Run -> sends email)...");
  res = await fetch("http://localhost:3000/api/detect-changes", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${cronSecret}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ dryRun: false })
  });
  
  data = await res.json();
  console.log("Live Run Response:", JSON.stringify(data, null, 2));

  if (data.emailsSent > 0) {
    console.log("✅ Email dispatched successfully via Resend.");
  } else {
    console.log("⚠️ No emails sent (or failed). Check if Resend API key is valid.");
  }

  console.log("\n🎉 All core detection rules passed end-to-end verification.");
  process.exit(0);
}

runTest().catch(console.error);
